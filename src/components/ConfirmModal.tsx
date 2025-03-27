import {
  Box,
  Button,
  Flex,
  Group,
  Modal,
  ModalProps,
  Text,
} from "@mantine/core";

interface ConfirmModalProps extends ModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  onSubmit: () => void;
  loading: boolean;
}

const ConfirmModal = ({
  loading,
  opened,
  onClose,
  title,
  onSubmit,
}: ConfirmModalProps) => {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Box>
        <Flex>
          <Text>
            You are about to delete this event. This action cannot be undone.
          </Text>
        </Flex>
        <Group justify="end">
          <Button size="xs" variant="light">
            Cancel
          </Button>
          <Button
            loading={loading}
            onClick={onSubmit}
            size="xs"
            bg="var(--accent-danger)"
          >
            Submit
          </Button>
        </Group>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
