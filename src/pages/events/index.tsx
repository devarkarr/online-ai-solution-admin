import ContentLayout from "@/layouts/ContentLayout";
import { useGetEvents } from "@/store/server/events/queries";
import {
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconCalendar, IconPlus, IconUser } from "@tabler/icons-react";
import dayjs from "dayjs";
import CreateEventModal from "./components/CreateEventModal";

const Event = () => {
  const smallScreen = useMediaQuery("(max-width: 48em)");
  const [opened, eventToggle] = useDisclosure();

  const { data: getEvents, isPending, isError } = useGetEvents();
  return (
    <>
      <ContentLayout>
        <Flex justify="end">
          <Button
            size="xs"
            onClick={eventToggle.open}
            leftSection={<IconPlus size={18} />}
          >
            New Event
          </Button>
        </Flex>
        <Grid mt="lg">
          {isPending ||
            (isError &&
              new Array(6)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    height={250}
                    mt={6}
                    width="70%"
                    radius="sm"
                  />
                )))}
          {getEvents?.map((event) => (
            <Grid.Col span={smallScreen ? 12 : 4} key={event.id}>
              <Card shadow="xs" padding="md" radius="md" withBorder>
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
                    <Text fz="xs" c="gray.7">
                      {event.detail}
                    </Text>
                  </ScrollArea>
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
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </ContentLayout>
      <CreateEventModal opened={opened} close={eventToggle.close} />
    </>
  );
};

export default Event;
