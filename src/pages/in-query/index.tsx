import { useGetInQueries } from "@/store/server/inbox/queries";
import InQueryCard from "./components/InQueryCard";
import { LoadingOverlay, Stack } from "@mantine/core";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import InQueryModal from "./components/InQueryModal";
import { InQueryType } from "@/store/server/inbox/interface";

const InQuery = () => {
  const [activeId, setActiveId] = useState("");
  const [opened, modalToggle] = useDisclosure();

  const { data, isPending, isError } = useGetInQueries();
  return (
    <>
      <Stack gap="xs">
        {isPending ||
          (isError && (
            <LoadingOverlay
              visible={isPending || isError}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
            />
          ))}
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
