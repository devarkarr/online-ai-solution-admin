import {
  Button,
  Drawer,
  FileButton,
  Flex,
  Grid,
  Image,
  Text,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconUpload } from "@tabler/icons-react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { BlogPayload } from "@/store/server/blog/interface";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useCreateBlog } from "@/store/server/blog/mutation";

type Props = {
  opened: boolean;
  close: () => void;
};

const CreateBlogDrawer = ({ opened, close }: Props) => {
  const form = useForm({
    initialValues: {
      title: "",
      body: "",
      image: null,
    },

    validate: {
      title: isNotEmpty(),
      body: isNotEmpty(),
      image: isNotEmpty("Upload image"),
    },
  });

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link],
    content: form.values.body,
    onUpdate: ({ editor }) => {
      form.setFieldValue("body", editor.getHTML());
    },
  });

  const blogmutation = useCreateBlog();
  const onSubmit = (values: BlogPayload) => {
    blogmutation.mutate(values, {
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
          <Grid.Col>
            <TextInput
              label="Event Title"
              placeholder="Enter title"
              key={form.key("title")}
              {...form.getInputProps("title")}
            />
          </Grid.Col>
          <Grid.Col>
            <RichTextEditor editor={editor} {...form.getInputProps("content")}>
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                  <RichTextEditor.Subscript />
                  <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Undo />
                  <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>
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
            <Button type="submit" loading={blogmutation.isPending}>
              Save
            </Button>
          </Flex>
        </Grid>
      </form>
    </Drawer>
  );
};

export default CreateBlogDrawer;
