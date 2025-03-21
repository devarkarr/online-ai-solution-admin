import { Image, Modal, Text } from "@mantine/core";

type Props = {
  opened: boolean;
  close: () => void;
  img: string;
  title: string;
  des: string;
};

const ViewShowCaseModal = ({ opened, close, img, title, des }: Props) => {
  return (
    <Modal opened={opened} onClose={close} title={title} centered size="lg">
      <Image src={img} height={350} alt="Norway" />
      <Text mt="lg" fz="sm" c="gray.7">
        {des}
      </Text>
    </Modal>
  );
};

export default ViewShowCaseModal;
