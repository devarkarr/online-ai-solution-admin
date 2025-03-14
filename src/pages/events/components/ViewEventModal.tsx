import { EventType } from "@/store/server/events/interface";
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
import { IconCalendar, IconUser } from "@tabler/icons-react";
import dayjs from "dayjs";

type Props = {
  opened: boolean;
  close: () => void;
  event: EventType;
};

const ViewEventModal = ({ opened, close, event }: Props) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={event.name}
      centered
      size="lg"
    >
      <Image src={event.files[0].path} height={250} alt="Norway" />

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={600}>{event.name}</Text>
        <Badge
          color={
            event.status == "ONGOING"
              ? "var(--color-admin)"
              : event.status == "UPCOMING"
              ? "var(--accent-info)"
              : "var(--accent-danger)"
          }
        >
          {event.status}
        </Badge>
      </Group>
      <Stack gap={4}>
        <Flex justify="space-between">
          <Flex align="center" gap={4}>
            <IconUser size={16} />{" "}
            <Text fz="xs" c="gray.7">
              {event.organization}
            </Text>
          </Flex>
          <Flex align="center" gap={4}>
            <IconCalendar size={18} />
            <Flex align="center" gap={4}>
              <Text fz="xs">
                {dayjs(event.startDate).format("MMM D, YYYY")}
              </Text>
              {"-"}
              <Text fz="xs">{dayjs(event.endDate).format("MMM D, YYYY")}</Text>
            </Flex>
          </Flex>
        </Flex>
        <ScrollArea>
          <Text fz="xs" c="gray.7">
            {event.detail}
          </Text>
        </ScrollArea>
      </Stack>
    </Modal>
  );
};

export default ViewEventModal;
