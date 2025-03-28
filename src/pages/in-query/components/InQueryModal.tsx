import { InQueryType } from "@/store/server/inbox/interface";
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Modal,
  ScrollArea,
  Text,
} from "@mantine/core";

type Props = {
  opened: boolean;
  close: () => void;
  data: InQueryType;
};

const InQueryModal = ({ opened, close, data }: Props) => {
  return (
    <Modal
      size="md"
      opened={opened}
      onClose={close}
      title="User Profile"
      p="lg"
    >
      <Flex align="center">
        <Avatar size="xl" />
        <Box>
          <Text fz="xl" fw={600}>
            {data?.name}
          </Text>
          <Text fz="sm" c="gray.6">
            Username
          </Text>
        </Box>
      </Flex>
      <Box mt="md">
        <Text c="gray.6" fw={600}>
          PERSONAL INFORMATION
        </Text>
        <Grid
          mt="md"
          pb="xl"
          style={{
            borderBottom: "1px solid var(--mantine-color-gray-3)",
          }}
        >
          <Grid.Col span={6}>
            <Text fz="sm">Email:</Text>
            <Text fz="sm">{data?.email}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fz="sm">Phone:</Text>
            <Text fz="sm">{data?.phone}</Text>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fz="sm">Country:</Text>
            <Text fz="sm">{data?.country}</Text>
          </Grid.Col>
        </Grid>
      </Box>
      <Box mt="md">
        <Text c="gray.6" fw={600}>
          PROFESSIONAL INFORMATION
        </Text>
        <Grid
          mt="md"
          pb="xl"
          style={{
            borderBottom: "1px solid var(--mantine-color-gray-3)",
          }}
        >
          <Grid.Col span={6}>
            <Text fz="sm">Company:</Text>
            <Text fz="sm">{data?.companyName}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text fz="sm">Job:</Text>
            <Text fz="sm">{data?.jobTitle}</Text>
          </Grid.Col>
        </Grid>
      </Box>
      <Text mt="lg" c="gray.6" fw={600}>
        JOB DETAILS
      </Text>

      <ScrollArea h={150} mt="sm">
        <Text fz="sm">{data?.jobDetail}</Text>
      </ScrollArea>
    </Modal>
  );
};

export default InQueryModal;
