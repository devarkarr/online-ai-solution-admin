import { useEffect, useRef, useState } from "react";
import { usePrevious } from "@mantine/hooks";
import dayjs from "dayjs";
import useQueryParams from "./useQueryParams";

type DefaultDate = Array<Date | null> | undefined;

interface UseDatePicker {
  page?: number;
  setPage?: (p: number) => void;
  defaultDate?: DefaultDate;
  disableParam?: boolean;
}

export default function useDatePicker({
  page,
  setPage,
  defaultDate,
  disableParam = false,
}: UseDatePicker) {
  const [queryParams, setQueryParams] = useQueryParams();

  const initDate = getInitialDate(queryParams, defaultDate);
  const [date, setDate] = useState<DefaultDate>(initDate);

  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    if (disableParam) return;

    const startDate = dates.startDate;
    const endDate = dates.endDate;

    if (startDate !== "" && endDate !== "") {
      setQueryParams({ startDate, endDate });
      return;
    }

    setQueryParams({ startDate: "none", endDate: "none" });
  }, [disableParam, dates.startDate, dates.endDate, setQueryParams]);

  useEffect(() => {
    if (!date) return;

    if (
      date.length === 1 ||
      (date.length === 2 && date[0] !== null && date[1] === null)
    ) {
      setDates({
        startDate: dayjs(date[0]).format("YYYY-MM-DD"),
        endDate: dayjs(date[0]).format("YYYY-MM-DD"),
      });
      return;
    }

    if (date.length === 2 && date[1] !== null) {
      setDates({
        startDate: dayjs(date[0]).format("YYYY-MM-DD"),
        endDate: dayjs(date[1]).format("YYYY-MM-DD"),
      });
      return;
    }

    if (
      date.length === 0 ||
      (date.length === 2 && date[0] === null && date[1] === null)
    ) {
      setDates({
        startDate: "",
        endDate: "",
      });
      return;
    }
  }, [date]);

  const initPage = useRef(page);
  const previous = usePrevious(date);
  useEffect(() => {
    if (!setPage) return;

    const isDateSelected =
      (!previous || previous?.length === 0) && date?.length === 1;
    const isDateRangeSelected = previous?.length === 1 && date?.length === 2;
    const isDateSelectedAfterDateRange =
      !previous?.includes(null) && date?.includes(null);

    if (isDateSelected) {
      initPage.current = page;
    }

    if (isDateSelected || isDateRangeSelected || isDateSelectedAfterDateRange) {
      setPage(1);
    }

    // if no date is selected
    if (previous && previous?.length > 0 && date?.length === 0) {
      setPage(initPage.current ?? 1);
    }
  }, [previous, date, setPage, page]);

  // Date Filter payload
  const dateFilter =
    dates.startDate !== "" && dates.endDate !== ""
      ? `&startDate=${dates.startDate}&endDate=${dates.endDate}`
      : null;

  return {
    date,
    setDate,
    dateFilter,
  };
}

/** Retrieve initial date when component mounted */
const getInitialDate = (
  currentParams: { [k: string]: string },
  defaultDate?: DefaultDate
) => {
  const startDate = currentParams["startDate"] ?? "";
  const endDate = currentParams["endDate"] ?? "";

  if (startDate && endDate && startDate === "none" && endDate === "none") {
    return [];
  }

  if (startDate && endDate && startDate === endDate) {
    return [new Date(startDate), null];
  }

  if (startDate !== "" && endDate !== "") {
    return [
      new Date(currentParams["startDate"]),
      new Date(currentParams["endDate"]),
    ];
  }

  return defaultDate;
};
