import {
  Button,
  Drawer,
  FileButton,
  Flex,
  Grid,
  Image,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import { IconUpload } from "@tabler/icons-react";
import { useEventMutation } from "@/store/server/events/mutation";
import { EventPayload } from "@/store/server/events/interface";
import dayjs from "dayjs";

type Props = {
  opened: boolean;
  close: () => void;
};

const CreateEventModal = ({ opened, close }: Props) => {
  const form = useForm({
    initialValues: {
      name: "",
      detail: "",
      organization: "",
      image: null,
      startDate: "",
      endDate: "",
    },

    validate: {
      name: isNotEmpty("Enter event name"),
      organization: isNotEmpty("Enter organization name"),
      detail: isNotEmpty("Enter event detail"),
      image: isNotEmpty("Upload image"),
      startDate: isNotEmpty("Select start date"),
      endDate: isNotEmpty("Select end date"),
    },
  });

  const eventMutation = useEventMutation();
  const onSubmit = (values: EventPayload) => {
    eventMutation.mutate(values, {
      onSuccess: (data) => {
        if (data._metadata.statusCode === 201) {
          form.reset();
          close();
        }
      },
    });
  };
  return (
    <Drawer
      opened={opened}
      onClose={close}
      position="right"
      size="lg"
      title="New Event"
    >
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              label="Event Name"
              placeholder="Enter event name"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Event Organiztion"
              placeholder="Enter organization"
              key={form.key("organization")}
              {...form.getInputProps("organization")}
            />
          </Grid.Col>
          <Grid.Col>
            <Textarea
              rows={5}
              label="Event Description"
              placeholder="Enter event description"
              key={form.key("detail")}
              {...form.getInputProps("detail")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DatePickerInput
              label="Start Date"
              key={form.key("startDate")}
              onChange={(e) =>
                form.setFieldValue("startDate", dayjs(e).format("YYYY-MM-DD"))
              }
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DatePickerInput
              label="End Date"
              key={form.key("endDate")}
              onChange={(e) =>
                form.setFieldValue("endDate", dayjs(e).format("YYYY-MM-DD"))
              }
            />
          </Grid.Col>
          <Grid.Col>
            <FileButton
              key={form.key("image")}
              {...form.getInputProps("image")}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Flex
                  {...props}
                  justify="center"
                  h={250}
                  bg={
                    form.errors.image
                      ? "var(--mantine-color-red-1)"
                      : "var(--mantine-color-gray-1)"
                  }
                  style={{
                    borderRadius: "var(--mantine-radius-sm)",
                    border: `1px solid ${
                      form.errors.image
                        ? "var(--accent-danger)"
                        : "var(--mantine-color-gray-4)"
                    }`,
                    borderStyle: "dashed",
                  }}
                >
                  {form.getValues().image ? (
                    <Image
                      fit="contain"
                      src={URL.createObjectURL(form.getValues().image!)}
                    />
                  ) : (
                    <Flex
                      direction="column"
                      w="100%"
                      justify="center"
                      gap={4}
                      align="center"
                      bg={
                        "light-dark(var(--mantine-color-white),var(--mantine-color-gray-9))"
                      }
                    >
                      <IconUpload
                        size={37}
                        color="var(--mantine-color-gray-7)"
                      />
                      <Text>Upload Image</Text>
                    </Flex>
                  )}
                </Flex>
              )}
            </FileButton>
          </Grid.Col>

          <Flex w="100%" justify="flex-end" gap="xs" mt="xs" px="xs">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" loading={eventMutation.isPending}>
              Save
            </Button>
          </Flex>
        </Grid>
      </form>
    </Drawer>
  );
};

export default CreateEventModal;
