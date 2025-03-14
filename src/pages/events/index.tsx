import ContentLayout from "@/layouts/ContentLayout";
import { useGetEvents } from "@/store/server/events/queries";
import { Button, Flex, Grid, Skeleton } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import CreateEventModal from "./components/CreateEventModal";
import EventCard from "./components/EventCard";

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
            <EventCard key={event.id} smallScreen={smallScreen} event={event} />
          ))}
        </Grid>
      </ContentLayout>
      <CreateEventModal opened={opened} close={eventToggle.close} />
    </>
  );
};

export default Event;
