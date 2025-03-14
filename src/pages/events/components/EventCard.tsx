import ActionButton from "@/components/ActionButton";
import { EventType } from "@/store/server/events/interface";
import { useEventDelete } from "@/store/server/events/mutation";
import {
  Badge,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconTrash, IconUser } from "@tabler/icons-react";
import dayjs from "dayjs";
import ViewEventModal from "./ViewEventModal";

type Props = {
  smallScreen: boolean | undefined;
  event: EventType;
};

const EventCard = ({ smallScreen, event }: Props) => {
  const [opened, eventToggle] = useDisclosure();

  const eventDelete = useEventDelete();
  return (
    <>
      <Grid.Col span={smallScreen ? 12 : 4} key={event.id}>
        <Card
          onClick={eventToggle.open}
          shadow="xs"
          padding="md"
          radius="md"
          withBorder
        >
          <Card.Section>
            <Image src={event.files[0].path} height={160} alt="Norway" />
          </Card.Section>

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
            <Flex align="center" gap={4}>
              <IconUser size={16} />{" "}
              <Text fz="xs" c="gray.7">
                {event.organization}
              </Text>
            </Flex>
            <ScrollArea>
              <Text lineClamp={2} fz="xs" c="gray.7">
                {event.detail}
              </Text>
            </ScrollArea>
            <Flex justify="space-between">
              <Flex align="center" gap={4}>
                <IconCalendar size={18} />
                <Flex align="center" gap={4}>
                  <Text fz="xs">
                    {dayjs(event.startDate).format("MMM D, YYYY")}
                  </Text>
                  {"-"}
                  <Text fz="xs">
                    {dayjs(event.endDate).format("MMM D, YYYY")}
                  </Text>
                </Flex>
              </Flex>
              <ActionButton
                buttons={[
                  {
                    title: "Delete",
                    icon: <IconTrash size={20} />,
                    color: "var(--accent-danger)",
                    onClick: () => {
                      eventDelete.mutate(event.id);
                    },
                  },
                ]}
                position="top-end"
              />
            </Flex>
          </Stack>
        </Card>
      </Grid.Col>
      <ViewEventModal opened={opened} close={eventToggle.close} event={event} />
    </>
  );
};

export default EventCard;
