import { useGetInQueries } from "@/store/server/inbox/queries";
import { Suspense, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import InQueryModal from "./components/InQueryModal";
import { InQueryType } from "@/store/server/inbox/interface";
import ContentLayout from "@/layouts/ContentLayout";
import {
  Badge,
  Box,
  Button,
  Flex,
  Loader,
  Select,
  Text,
  Tooltip,
} from "@mantine/core";
import classes from "./styles/Inquery.module.css";
import useDatePicker from "@/hooks/useDatePicker";
import usePage from "@/hooks/usePage";
import { DataTable } from "mantine-datatable";
import ActionButton from "@/components/ActionButton";
import { IconEye, IconShare2, IconTrash } from "@tabler/icons-react";
import DatePicker from "@/components/DatePicker";
import SearchInput from "@/components/SearchInput";
import useSearch from "@/hooks/useSearch";
import {
  useExportInqueryExcel,
  useInQueriesDelete,
  useInQueriesSeen,
} from "@/store/server/inbox/mutation";
import ConfirmModal from "@/components/ConfirmModal";

const PAGE_SIZE = 10;

const Filters = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Seen",
    value: "seen",
  },
  {
    label: "Un Seen",
    value: "unSeen",
  },
];
const InQuery = () => {
  const [activeId, setActiveId] = useState("");
  const [opened, modalToggle] = useDisclosure();
  const [deleteId, setDeleteId] = useState("");
  const [confirmOpened, confirmToggle] = useDisclosure();

  const [currentFilter, setCurrentFilter] = useState("all");

  const [page, setPage] = usePage();

  const { search, setSearch, setFilteredPayload, debouncedSearch } = useSearch({
    page,
    setPage,
    PAGE_SIZE,
  });

  const { date, setDate, dateFilter } = useDatePicker({
    page,
    setPage,
    defaultDate: [new Date(), null],
  });

  const { data, isPending, isError } = useGetInQueries({
    page,
    PAGE_SIZE,
    dateFilter,
    type: currentFilter,
    search: debouncedSearch,
  });

  const inquriesDelete = useInQueriesDelete();
  const inquriesSeen = useInQueriesSeen();
  const exportInquries = useExportInqueryExcel();
  return (
    <>
      <Box className={classes.wrapper}>
        <Flex align="center" gap={10} className={classes.container}>
          <DatePicker value={date} setValue={setDate} />

          <Select
            size="md"
            checkIconPosition="right"
            data={Filters}
            placeholder="Pick Type"
            defaultValue="all"
            onChange={(value) => setCurrentFilter(value!)}
          />
          <SearchInput
            setPayload={setFilteredPayload}
            search={search}
            setSearch={setSearch}
            placeholder="Search by country"
          />
          <Button
            type="submit"
            variant="filled"
            color="var(--color-admin)"
            miw={120}
            size="compact-xl"
            loading={exportInquries.isPending}
            radius="sm"
            fz={14}
            rightSection={<IconShare2 />}
            onClick={() => {
              exportInquries.mutate({
                page,
                PAGE_SIZE,
                dateFilter,
                type: currentFilter,
                search: debouncedSearch,
              });
            }}
          >
            Export
          </Button>
        </Flex>
      </Box>
      <ContentLayout h="80vh">
        <DataTable
          withRowBorders={false}
          verticalSpacing="xs"
          horizontalSpacing="sm"
          fetching={isPending || isError}
          styles={{
            header: {
              border: "0",
              borderRadius: "50%",
            },
            footer: {
              borderRadius: "50%",
            },
          }}
          columns={[
            {
              accessor: "name",
              title: "Username",
              render: ({ name }) => (
                <Text fw={600} lh={1.5}>
                  {name || "-"}
                </Text>
              ),
            },

            {
              accessor: "email",
              title: "Email",
              render: ({ email }) => <Text lh={1.5}>{email || "-"}</Text>,
            },
            {
              accessor: "phone",
              title: "Phone",
              render: ({ phone }) => <Text lh={1.5}>{phone || "-"}</Text>,
            },

            {
              accessor: "country",
              title: "Country",
              render: ({ country }) => <Text lh={1.5}>{country || "-"}</Text>,
            },
            {
              accessor: "jobTitle",
              title: "Job Title",
              render: ({ jobTitle }) => (
                <Tooltip
                  label={jobTitle}
                  bg="var(--color-admin)"
                  c="white"
                  position="top-start"
                >
                  <Text lh={1.5} truncate="end">
                    {jobTitle || "-"}
                  </Text>
                </Tooltip>
              ),
            },

            {
              accessor: "jobDetail",
              title: "Job Detail",
              render: ({ jobDetail }) => (
                <Tooltip
                  label={jobDetail}
                  bg="var(--color-admin)"
                  c="white"
                  position="top-start"
                >
                  <Text lh={1.5} truncate="end">
                    {jobDetail || "-"}
                  </Text>
                </Tooltip>
              ),
            },

            {
              accessor: "status",
              textAlign: "center",
              titleClassName: "table-header",
              render: ({ seen }) =>
                seen ? (
                  <Badge color="var(--color-admin)">Seen</Badge>
                ) : (
                  <Badge color="var(--accent-danger)">Unseen</Badge>
                ),
            },
            {
              accessor: "action",
              title: "",
              textAlign: "center",
              width: "8%",
              cellsStyle: () => ({ padding: 0 }),
              render: (data) => {
                return (
                  <ActionButton
                    buttons={[
                      {
                        title: "View Details",
                        icon: <IconEye size={20} />,
                        color: "var(--color-admin)",
                        onClick() {
                          setActiveId(data.id);
                          inquriesSeen.mutate(data.id);
                          modalToggle.open();
                        },
                      },
                      {
                        title: "Delete",
                        icon: <IconTrash size={20} />,
                        color: "var(--accent-danger)",
                        onClick() {
                          setDeleteId(data.id);
                          confirmToggle.open();
                        },
                      },
                    ]}
                    position="bottom-end"
                  />
                );
              },
            },
          ]}
          records={data?.data || []}
          // Pagination
          totalRecords={data?.total || 0}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p: number) => setPage(p)}
        />
      </ContentLayout>
      {activeId && (
        <InQueryModal
          data={data?.data?.find((d) => d.id == activeId) as InQueryType}
          opened={opened}
          close={modalToggle.close}
        />
      )}

      <Suspense fallback={<Loader />}>
        {deleteId && (
          <ConfirmModal
            loading={inquriesDelete.isPending}
            opened={confirmOpened}
            onClose={confirmToggle.close}
            title="Delete this inquirie"
            desc="You are about to delete this inquirie. This action cannot be undone."
            onSubmit={() => {
              inquriesDelete.mutate(deleteId);
              confirmToggle.close();
            }}
          />
        )}
      </Suspense>
    </>
  );
};

export default InQuery;
