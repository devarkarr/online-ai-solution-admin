import {
  Button,
  FileButton,
  Flex,
  Grid,
  Image,
  Modal,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import { IconUpload } from "@tabler/icons-react";

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
      startDate: new Date(),
      endDate: new Date(),
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

  return (
    <Modal opened={opened} onClose={close} title="New Event" centered size="lg">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
              {...form.getInputProps("startDate")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DatePickerInput
              label="End Date"
              key={form.key("endDate")}
              {...form.getInputProps("endDate")}
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
                  mih={250}
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
            <Button type="submit">Save</Button>
          </Flex>
        </Grid>
      </form>
    </Modal>
  );
};

export default CreateEventModal;
