import { Box, Button, Flex, Image, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import ViewShowCaseModal from "./ViewShowCaseModal";
import { useDisclosure } from "@mantine/hooks";

type Props = {
  bg: string;
  border: string;
  img: string;
};

const ShowCaseCard = ({ bg, border, img }: Props) => {
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
          <Text fz="xl">Website Design for SCFC Canada</Text>
          <Text mt="md" fz="sm" c="gray.7">
            Born out of a vision, a single-minded objective that puts service
            before anything else, Swift Clearance and Forwarding Corp. surging
            forth to deliver the best services in the shipping and logistics
            scenario. Its meteoric rise stems out of a solid foundation. The
            management boasts of over 20 years of rich and varied experience in
            the shipping and freight forwarding industry.
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
        img={img}
      />
    </>
  );
};

export default ShowCaseCard;
