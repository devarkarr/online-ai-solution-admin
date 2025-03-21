import { Box, Button, Flex, Image, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import ViewShowCaseModal from "./ViewShowCaseModal";
import { useDisclosure } from "@mantine/hooks";

type Props = {
  bg: string;
  border: string;
  img: string;
  title: string;
  des: string;
};

const ShowCaseCard = ({ bg, border, img, title, des }: Props) => {
  const [opened, showCaseToggle] = useDisclosure();
  return (
    <>
      <Flex
        gap="sm"
        bg={bg}
        style={{
          border: `1px solid ${border}`,
          borderRadius: "var(--mantine-radius-md)",
        }}
      >
        <Image w="40%" fit="cover" src={img} alt={img} />
        <Box p="sm">
          <Text fz="xl">{title}</Text>
          <Text mt="md" fz="sm" c="gray.7">
            {des}
          </Text>
          <Button
            onClick={showCaseToggle.open}
            mt="xl"
            rightSection={<IconArrowRight size={17} />}
            size="xs"
          >
            <Text fz="xs">Read more</Text>
          </Button>
        </Box>
      </Flex>
      <ViewShowCaseModal
        opened={opened}
        close={showCaseToggle.close}
        title={title}
        des={des}
        img={img}
      />
    </>
  );
};

export default ShowCaseCard;
