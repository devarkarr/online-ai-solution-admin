import ContentLayout from "@/layouts/ContentLayout";
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Loader,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import CreateBlogDrawer from "./components/CreateBlogDrawer";
import { DataTable } from "mantine-datatable";
import ActionButton from "@/components/ActionButton";
import usePage from "@/hooks/usePage";
import ViewBlogModal from "./components/ViewBlogModal";
import { Suspense, useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";
import { useGetBlogs } from "@/store/server/blog/queries";
import { BlogType } from "@/store/server/blog/interface";
import { useBlogDelete } from "@/store/server/blog/mutation";
import dayjs from "dayjs";

const PAGE_SIZE = 10;
const Blog = () => {
  const [opened, blogToggle] = useDisclosure();
  const [modalOpened, modalToggle] = useDisclosure();
  const [confirmOpened, confirmToggle] = useDisclosure();
  const [currentBlog, setCurrentBlog] = useState<BlogType | null>(null);
  const [deleteId, setDeleteId] = useState("");

  const [page, setPage] = usePage();

  const {
    data: getBlogs,
    isPending,
    isError,
  } = useGetBlogs({
    page,
    PAGE_SIZE,
  });

  const blogDelete = useBlogDelete();

  return (
    <>
      <Flex justify="end" mb="xs">
        <Button
          size="xs"
          onClick={blogToggle.open}
          leftSection={<IconPlus size={18} />}
        >
          New Blog
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
              accessor: "title",
              title: "Blog Title",
              render: ({ title }) => (
                <Tooltip
                  label={title}
                  position="top-start"
                  offset={5}
                  bg="var(--color-admin)"
                  c="white"
                >
                  <Text fw={600} lh={1.5} truncate="end">
                    {title || "-"}
                  </Text>
                </Tooltip>
              ),
            },
            {
              accessor: "isDeleted",
              title: "Is Deleted",
              render: ({ isDeleted }) => (
                <Badge color={isDeleted ? "var(--accent-danger)" : ""}>
                  {isDeleted ? "Deleted" : "Not Deleted"}
                </Badge>
              ),
            },
            {
              accessor: "createdAt",
              title: "Created Date",
              render: ({ createdAt }) => (
                <>
                  <Text>{dayjs(createdAt).format("DD-MM-YYYY")}</Text>
                </>
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
                          setCurrentBlog(data);
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
          records={getBlogs?.data || []}
          // Pagination
          totalRecords={getBlogs?.total || 0}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p: number) => setPage(p)}
        />
      </ContentLayout>

      <Suspense fallback={<Loader />}>
        {currentBlog?.id && (
          <ViewBlogModal
            opened={modalOpened}
            close={modalToggle.close}
            blog={currentBlog}
          />
        )}
      </Suspense>

      <Suspense fallback={<Loader />}>
        {deleteId && (
          <ConfirmModal
            loading={blogDelete.isPending}
            opened={confirmOpened}
            onClose={confirmToggle.close}
            title="Delete this blog"
            onSubmit={() => {
              blogDelete.mutate(deleteId);
              confirmToggle.close();
            }}
          />
        )}
      </Suspense>

      <CreateBlogDrawer opened={opened} close={blogToggle.close} />
    </>
  );
};

export default Blog;
