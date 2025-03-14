import { Image, Modal, Text } from "@mantine/core";

type Props = {
  opened: boolean;
  close: () => void;
  img: string;
};

const ViewShowCaseModal = ({ opened, close, img }: Props) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Website Design for SCFC Canada"
      centered
      size="lg"
    >
      <Image src={img} height={350} alt="Norway" />
      <Text mt="lg" fz="sm" c="gray.7">
        Born out of a vision, a single-minded objective that puts service before
        anything else, Swift Clearance and Forwarding Corp. surging forth to
        deliver the best services in the shipping and logistics scenario. Its
        meteoric rise stems out of a solid foundation. The management boasts of
        over 20 years of rich and varied experience in the shipping and freight
        forwarding industry.
      </Text>
    </Modal>
  );
};

export default ViewShowCaseModal;
