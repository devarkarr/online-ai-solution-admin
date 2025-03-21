import { Indicator, Styles } from "@mantine/core"
import {
  DatePickerInput,
  DatePickerInputFactory,
  DatesRangeValue,
} from "@mantine/dates"
import { IconCalendarFilled } from "@tabler/icons-react"
import dayjs from "dayjs"
import classes from "./styles/DatePicker.module.css"

interface DatePickerProps {
  value: Array<Date | null> | undefined
  setValue: (value: Date[] | DatesRangeValue) => void
  styles?: Styles<DatePickerInputFactory>
  iconSize?: number
  /**
   * Expend the maximum select date range
   */
  expendMaxDate?: number
}

export default function DatePicker({
  value,
  setValue,
  styles,
  iconSize = 24,
  expendMaxDate = 0,
}: DatePickerProps) {
  return (
    <DatePickerInput
      type={`${
        value?.length === 2 && value[1] !== null ? "range" : "multiple"
      }`}
      leftSection={
        <IconCalendarFilled
          size={iconSize}
          style={{
            color: "var(--color-fary)",
          }}
        />
      }
      aria-label="Pick date"
      placeholder="Pick date"
      value={(() => {
        if (value && value.length > 1 && value[1] === null) {
          return [value[0]] as Date[]
        }
        return value as Date[]
      })()}
      styles={styles}
      // size="xs"
      onChange={setValue}
      radius="md"
      miw="max-content"
      maxDate={new Date(dayjs(new Date()).add(expendMaxDate, "day").toDate())}
      classNames={{ input: classes.input }}
      maw={400}
      renderDay={(date) => {
        const day = date.getDate()
        const today = dayjs().date()

        const month = date.getMonth() + 1
        const thisMonth = dayjs().month() + 1

        const year = date.getFullYear()
        const thisYear = dayjs().year()

        const thisDay = `${day}-${month}-${year}`
        const thisDate = `${today}-${thisMonth}-${thisYear}`

        return (
          <Indicator
            size={6}
            color="dark"
            offset={-2}
            disabled={thisDay !== thisDate}
          >
            <div>{day}</div>
          </Indicator>
        )
      }}
    />
  )
}
