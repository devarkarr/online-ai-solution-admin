import { InQueryType } from "@/store/server/inbox/interface";
import {
  Avatar,
  Box,
  Flex,
  Paper,
  Text,
  useComputedColorScheme,
} from "@mantine/core";

type Props = {
  h?: string;
  data: InQueryType;
  setActiveId: (id: string) => void;
  open: () => void;
};

const InQueryCard = ({ h, data, setActiveId, open }: Props) => {
  const computedColorScheme = useComputedColorScheme("light");
  return (
    <Paper
      h={`${h ?? "calc(100% - 2.625rem - 1rem)"}`}
      radius="sm"
      shadow="xs"
      p="xs"
      bg={
        computedColorScheme === "light"
          ? "var(--mantine-color-white)"
          : "var(--mantine-color-dark-4)"
      }
    >
      <Flex
        onClick={() => {
          setActiveId(data.id);
          open();
        }}
        gap="xs"
      >
        <Avatar
          color="cyan"
          radius="xl"
          style={{
            textTransform: "uppercase",
          }}
        >
          {data.name.slice(0, 2)}
        </Avatar>
        <Box>
          <Flex align="center" gap="xs">
            <Text fw={600}>{data.name}</Text>
            <Text c="gray.6" fz="xs">
              {data.email}
            </Text>
          </Flex>
          <Text fz="xs" lineClamp={3} mt="xs" c="gray.7">
            {data.jobDetail}
          </Text>
        </Box>
      </Flex>
    </Paper>
  );
};

export default InQueryCard;
