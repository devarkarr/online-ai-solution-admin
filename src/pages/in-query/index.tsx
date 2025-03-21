import {
  useGetInQueries,
  useGetInQueriesTotal,
} from "@/store/server/inbox/queries";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import InQueryModal from "./components/InQueryModal";
import { InQueryType } from "@/store/server/inbox/interface";
import ContentLayout from "@/layouts/ContentLayout";
import { Badge, Box, Flex, Tabs, Text } from "@mantine/core";
import classes from "./styles/Inquery.module.css";
import useDatePicker from "@/hooks/useDatePicker";
import usePage from "@/hooks/usePage";
import { DataTable } from "mantine-datatable";
import ActionButton from "@/components/ActionButton";
import { IconEye, IconEyeOff, IconMenu4, IconTrash } from "@tabler/icons-react";
import DatePicker from "@/components/DatePicker";
import SearchInput from "@/components/SearchInput";
import useSearch from "@/hooks/useSearch";
import {
  useInQueriesDelete,
  useInQueriesSeen,
} from "@/store/server/inbox/mutation";

const PAGE_SIZE = 10;
const InQuery = () => {
  const [activeId, setActiveId] = useState("");
  const [opened, modalToggle] = useDisclosure();

  const [currentTab, setCurrentTab] = useState("all");

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
    type: currentTab,
    search: debouncedSearch,
  });

  const { data: statusTotal } = useGetInQueriesTotal({
    dateFilter,
  });

  const inquriesDelete = useInQueriesDelete();
  const inquriesSeen = useInQueriesSeen();

  return (
    <>
      <Box className={classes.wrapper}>
        <Flex align="center" gap={10} className={classes.container}>
          <Tabs variant="unstyled" defaultValue="all" classNames={classes}>
            <Tabs.List>
              <Tabs.Tab
                value="all"
                onClick={() => {
                  setActiveId("");
                  setCurrentTab("all");
                }}
                leftSection={<IconMenu4 size={12} />}
              >
                All
                <Badge
                  style={{
                    transform: "translate(10px, -7px)",
                    backgroundColor: "var(--color-admin)",
                    color: "var(--color-white)",
                  }}
                >
                  {statusTotal?.total}
                </Badge>
              </Tabs.Tab>

              <Tabs.Tab
                value="seen"
                onClick={() => {
                  setActiveId("");
                  setCurrentTab("seen");
                }}
                leftSection={<IconEye size={12} />}
              >
                Seen
                <Badge
                  style={{
                    transform: "translate(10px, -7px)",
                    backgroundColor: "var(--color-admin)",
                    color: "var(--color-white)",
                  }}
                >
                  {statusTotal?.seen}
                </Badge>
              </Tabs.Tab>
              <Tabs.Tab
                value="unSeen"
                onClick={() => {
                  setActiveId("");
                  setCurrentTab("unSeen");
                }}
                leftSection={<IconEyeOff size={12} />}
              >
                Unseen
                <Badge
                  style={{
                    transform: "translate(10px, -7px)",
                    backgroundColor: "var(--color-admin)",
                    color: "var(--color-white)",
                  }}
                >
                  {statusTotal?.unSeen}
                </Badge>
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <SearchInput
            setPayload={setFilteredPayload}
            search={search}
            setSearch={setSearch}
            placeholder="Search by country"
          />

          <DatePicker value={date} setValue={setDate} />
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
              accessor: "country",
              title: "Country",
              render: ({ country }) => <Text lh={1.5}>{country || "-"}</Text>,
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
              accessor: "jobTitle",
              title: "Job Title",
              render: ({ jobTitle }) => <Text lh={1.5}>{jobTitle || "-"}</Text>,
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
                          inquriesDelete.mutate(data.id);
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
    </>
  );
};

export default InQuery;
