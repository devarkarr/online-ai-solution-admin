import ContentLayout from "@/layouts/ContentLayout";
import { useGetEvents } from "@/store/server/events/queries";
import { Avatar, Badge, Button, Flex, Loader, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import CreateEventDrawer from "./components/CreateEventDrawer";
import { DataTable } from "mantine-datatable";
import ActionButton from "@/components/ActionButton";
import usePage from "@/hooks/usePage";
import dayjs from "dayjs";
import ViewEventModal from "./components/ViewEventModal";
import { Suspense, useState } from "react";
import { EventType } from "@/store/server/events/interface";
import ConfirmModal from "@/components/ConfirmModal";
import { useEventDelete } from "@/store/server/events/mutation";

const PAGE_SIZE = 10;
const Event = () => {
  const [opened, eventToggle] = useDisclosure();
  const [modalOpened, modalToggle] = useDisclosure();
  const [confirmOpened, confirmToggle] = useDisclosure();
  const [currentEvent, setCurrentEvent] = useState<EventType | null>(null);
  const [deleteId, setDeleteId] = useState("");

  const [page, setPage] = usePage();

  const {
    data: getEvents,
    isPending,
    isError,
  } = useGetEvents({
    page,
    PAGE_SIZE,
  });

  const eventDelete = useEventDelete();

  return (
    <>
      <Flex justify="end" mb="xs">
        <Button
          size="xs"
          onClick={eventToggle.open}
          leftSection={<IconPlus size={18} />}
        >
          New Event
        </Button>
      </Flex>
      <ContentLayout>
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
              accessor: "image",
              title: "Image",
              render: ({ files }) => (
                <Avatar src={files[0].path} alt="" size="md" />
              ),
            },
            {
              accessor: "name",
              title: "Event Name",
              render: ({ name }) => (
                <Text fw={600} lh={1.5}>
                  {name || "-"}
                </Text>
              ),
            },
            {
              accessor: "organization",
              title: "Organization",
              render: ({ organization }) => (
                <Text lh={1.5}>{organization || "-"}</Text>
              ),
            },
            {
              accessor: "startDate",
              title: "Start Date",
              render: ({ startDate }) => (
                <>
                  <Text>{dayjs(startDate).format("DD-MM-YYYY")}</Text>
                </>
              ),
            },
            {
              accessor: "endDate",
              title: "End Date",
              render: ({ endDate }) => (
                <>
                  <Text>{dayjs(endDate).format("DD-MM-YYYY")}</Text>
                </>
              ),
            },
            {
              accessor: "status",
              textAlign: "center",
              titleClassName: "table-header",
              render: ({ status }) => (
                <Badge
                  color={
                    status == "ONGOING"
                      ? "var(--accent-online)"
                      : status === "UPCOMING"
                      ? "var(--accent-warning)"
                      : "var(--accent-danger)"
                  }
                >
                  {status}
                </Badge>
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
                          setCurrentEvent(data);
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
          records={getEvents?.data || []}
          // Pagination
          totalRecords={getEvents?.total || 0}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p: number) => setPage(p)}
        />
      </ContentLayout>

      <Suspense fallback={<Loader />}>
        {currentEvent?.id && (
          <ViewEventModal
            opened={modalOpened}
            close={modalToggle.close}
            event={currentEvent}
          />
        )}
      </Suspense>

      <Suspense fallback={<Loader />}>
        {deleteId && (
          <ConfirmModal
            loading={eventDelete.isPending}
            opened={confirmOpened}
            onClose={confirmToggle.close}
            title="Delete this event"
            onSubmit={() => {
              eventDelete.mutate(deleteId);
              confirmToggle.close();
            }}
          />
        )}
      </Suspense>

      <CreateEventDrawer opened={opened} close={eventToggle.close} />
    </>
  );
};

export default Event;
