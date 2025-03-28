import { BlogType } from "@/store/server/blog/interface";
import {
  Badge,
  Flex,
  Group,
  Image,
  Modal,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";

type Props = {
  opened: boolean;
  close: () => void;
  blog: BlogType;
};

const ViewBlogModal = ({ opened, close, blog }: Props) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={blog.title}
      centered
      size="lg"
    >
      <Image
        src={blog?.files.length ? blog?.files[0]?.path : ""}
        height={250}
        alt="Norway"
      />

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={600}>{blog.title}</Text>
        <Badge
          color={blog.isDeleted ? "var(--accent-danger)" : "var(--color-admin)"}
        >
          {blog.isDeleted ? "Deleted" : "Not Deleted"}
        </Badge>
      </Group>
      <Stack gap={4}>
        <Flex justify="space-between">
          <Flex align="center" gap={4}>
            <IconCalendar size={18} />
            <Flex align="center" gap={4}>
              <Text fz="xs">{dayjs(blog.createdAt).format("MMM D, YYYY")}</Text>
            </Flex>
          </Flex>
        </Flex>
        <ScrollArea>
          <Text
            fz="xs"
            c="gray.7"
            dangerouslySetInnerHTML={{ __html: blog.body }}
          ></Text>
        </ScrollArea>
      </Stack>
    </Modal>
  );
};

export default ViewBlogModal;
