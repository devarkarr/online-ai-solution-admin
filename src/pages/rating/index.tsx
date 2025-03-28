import ContentLayout from "@/layouts/ContentLayout";
import { Text, Tooltip } from "@mantine/core";
import usePage from "@/hooks/usePage";
import { DataTable } from "mantine-datatable";
import { useGetRatings } from "@/store/server/rating/queries";
import dayjs from "dayjs";

const PAGE_SIZE = 10;
const Rating = () => {
  const [page, setPage] = usePage();

  const { data, isPending, isError } = useGetRatings({
    page,
    PAGE_SIZE,
  });

  return (
    <>
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
              accessor: "ratedBy",
              title: "Rated By",
              render: ({ ratedBy }) => (
                <Text fw={600} lh={1.5}>
                  {ratedBy || "-"}
                </Text>
              ),
            },
            {
              accessor: "rate",
              title: "Rate",
              render: ({ rate }) => <Text lh={1.5}>{rate || "-"}</Text>,
            },
            {
              accessor: "feedback",
              title: "feedback",
              render: ({ feedback }) => (
                <Tooltip
                  label={feedback}
                  bg="var(--color-admin)"
                  c="white"
                  position="top-start"
                >
                  <Text lh={1.5} truncate="end">
                    {feedback || "-"}
                  </Text>
                </Tooltip>
              ),
            },
            {
              accessor: "date",
              title: "Date",
              render: ({ createdAt }) => (
                <>
                  <Text lh={1.5}>
                    {dayjs(createdAt).format("DD-MM-YYYY") || "-"}
                  </Text>
                  <Text fz="sm" c="gray.6" lh={1.5}>
                    {dayjs(createdAt).format("h:mm A") || "-"}
                  </Text>
                </>
              ),
            },
          ]}
          records={data?.data || []}
          totalRecords={data?.total || 0}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p: number) => setPage(p)}
        />
      </ContentLayout>
    </>
  );
};

export default Rating;
