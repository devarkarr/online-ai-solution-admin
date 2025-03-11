import { useGetInQueries } from "@/store/server/inbox/queries";
import InQueryCard from "./components/InQueryCard";
import { Stack } from "@mantine/core";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import InQueryModal from "./components/InQueryModal";
import { InQueryType } from "@/store/server/inbox/interface";

const InQuery = () => {
  const [activeId, setActiveId] = useState("");
  const [opened, modalToggle] = useDisclosure();

  const { data } = useGetInQueries();
  return (
    <>
      <Stack gap="xs">
        {data?.map((inquery) => (
          <InQueryCard
            setActiveId={(id: string) => setActiveId(id)}
            data={inquery}
            open={modalToggle.open}
            key={inquery.id}
          />
        ))}
      </Stack>
      {activeId && (
        <InQueryModal
          data={data?.find((d) => d.id == activeId) as InQueryType}
          opened={opened}
          close={modalToggle.close}
        />
      )}
    </>
  );
};

export default InQuery;
