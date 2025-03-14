import ImgOne from "@/assets/gallery/gallery-one.svg";
import ImgTwo from "@/assets/gallery/gallery-two.svg";
import ImgThree from "@/assets/gallery/gallery-three.svg";
import ContentLayout from "@/layouts/ContentLayout";
import { Stack } from "@mantine/core";
import ShowCaseCard from "./components/ShowCaseCard";

const ShowCase = () => {
  return (
    <>
      <ContentLayout>
        <Stack>
          {datas.map((data, i) => (
            <ShowCaseCard key={i} {...data} />
          ))}
        </Stack>
      </ContentLayout>
    </>
  );
};

export default ShowCase;

const datas = [
  {
    img: ImgOne,
    bg: "#F1F2FF",
    border: "#E7DAED",
  },
  {
    img: ImgTwo,
    bg: "#F0FFF7",
    border: "#E7DAED",
  },
  {
    img: ImgThree,
    bg: "#FFF4F4",
    border: "#E7DAED",
  },
];
