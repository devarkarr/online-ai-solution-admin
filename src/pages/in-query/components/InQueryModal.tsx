import { InQueryType } from "@/store/server/inbox/interface";
import { Box, Flex, Grid, Modal, ScrollArea, Text } from "@mantine/core";
import {
  IconBriefcase,
  IconBuilding,
  IconLocation,
  IconMail,
  IconPhone,
  IconStar,
  IconUser,
} from "@tabler/icons-react";

type Props = {
  opened: boolean;
  close: () => void;
  data: InQueryType;
};

const InQueryModal = ({ opened, close, data }: Props) => {
  return (
    <Modal
      size="lg"
      opened={opened}
      onClose={close}
      title="User Profile"
      p="lg"
    >
      <Flex gap={3} align="center">
        <Text fz="sm">User ID:</Text>
        <Text fz="sm" c="gray.6">
          {data.id}
        </Text>
      </Flex>
      <Box mt="md">
        <Text>Information</Text>
        <Grid
          mt="md"
          pb="xl"
          style={{
            borderBottom: "1px solid var(--mantine-color-gray-3)",
          }}
        >
          <Grid.Col span={6}>
            <Flex gap={5} align="center">
              <IconUser size={17} />
              <Flex gap={5} align="center">
                <Text fz="sm">Name:</Text>
                <Text fz="sm">{data.name}</Text>
              </Flex>
            </Flex>
          </Grid.Col>
          <Grid.Col span={6}>
            <Flex gap={5} align="center">
              <IconMail size={17} />
              <Flex gap={5} align="center">
                <Text fz="sm">Email:</Text>
                <Text fz="sm">{data.email}</Text>
              </Flex>
            </Flex>
          </Grid.Col>

          <Grid.Col span={6}>
            <Flex gap={5} align="center">
              <IconPhone size={17} />
              <Flex gap={5} align="center">
                <Text fz="sm">Phone:</Text>
                <Text fz="sm">{data.phone}</Text>
              </Flex>
            </Flex>
          </Grid.Col>

          <Grid.Col span={6}>
            <Flex gap={5} align="center">
              <IconLocation size={17} />
              <Flex gap={5} align="center">
                <Text fz="sm">Country:</Text>
                <Text fz="sm">{data.country}</Text>
              </Flex>
            </Flex>
          </Grid.Col>
        </Grid>
      </Box>
      <Box mt="md">
        <Text>Professional Information</Text>
        <Grid
          mt="md"
          pb="xl"
          style={{
            borderBottom: "1px solid var(--mantine-color-gray-3)",
          }}
        >
          <Grid.Col span={6}>
            <Flex gap={5} align="center">
              <IconBuilding size={17} />
              <Flex gap={5} align="center">
                <Text fz="sm">Company:</Text>
                <Text fz="sm">{data.companyName}</Text>
              </Flex>
            </Flex>
          </Grid.Col>
          <Grid.Col span={6}>
            <Flex gap={5} align="center">
              <IconBriefcase size={17} />
              <Flex gap={5} align="center">
                <Text fz="sm">Job:</Text>
                <Text fz="sm">{data.jobTitle}</Text>
              </Flex>
            </Flex>
          </Grid.Col>

          <Grid.Col span={6}>
            <Flex gap={5} align="center">
              <IconStar size={17} />
              <Flex gap={5} align="center">
                <Text fz="sm">Rating:</Text>
                <Text fz="sm">{data.rating}</Text>
              </Flex>
            </Flex>
          </Grid.Col>
        </Grid>
      </Box>
      <Text mt="lg">Job Details</Text>
      <Box
        p="xs"
        style={{
          border: "1px solid var(--mantine-color-gray-3)",
          borderRadius: "var(--mantine-radius-sm)",
        }}
        mt="xs"
      >
        <ScrollArea h={150}>
          <Text fz="xs">{data.jobDetail}</Text>
        </ScrollArea>
      </Box>
    </Modal>
  );
};

export default InQueryModal;
