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
  Stack,
  Text,
} from "@mantine/core";
import { IconCalendar, IconPlus, IconUser } from "@tabler/icons-react";
import dayjs from "dayjs";

const Event = () => {
  const { data: getEvents } = useGetEvents();
  console.log(getEvents);
  return (
    <>
      <ContentLayout>
        <Flex justify="end">
          <Button size="xs" leftSection={<IconPlus size={18} />}>
            New Event
          </Button>
        </Flex>
        <Grid>
          {getEvents?.map((event) => (
            <Grid.Col span={4} key={event.id}>
              <Card shadow="xs" padding="md" radius="md" withBorder>
                <Card.Section>
                  <Image src={event.files[0].path} height={160} alt="Norway" />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={600}>Norway Fjord Adventures</Text>
                  <Badge color="pink">{event.status}</Badge>
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
                  <Flex>
                    <IconCalendar size={18} />
                    <Flex>
                      <Text>
                        {dayjs(event.startDate).format("MMM D, YYYY")}
                      </Text>
                      <Text>{dayjs(event.endDate).format("MMM D, YYYY")}</Text>
                    </Flex>
                  </Flex>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </ContentLayout>
    </>
  );
};

export default Event;
