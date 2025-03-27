import { useEffect, useState } from "react";
import { Button, TextInput, TextInputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import showToastNoti from "@/utils/showToastNoti";
import classes from "./styles/SearchInput.module.css";

interface Props extends TextInputProps {
  filter?: string | null;
  setPayload?: React.Dispatch<
    React.SetStateAction<{
      search?: string | undefined;
      filter?: string | null | undefined;
      page: number;
      PAGE_SIZE: number;
    }>
  >;
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  withSearchKey?: boolean;
  activeSearchKey?: string;
}

export default function SearchInput(props: Props) {
  const {
    filter,
    setPayload,
    search = "",
    setSearch,
    withSearchKey,
    activeSearchKey,
    ...rest
  } = props;
  const [value, setValue] = useState("");

  useEffect(() => {
    if (withSearchKey && !activeSearchKey && setSearch) {
      setValue("");
      setSearch("");
    }
  }, [setValue, activeSearchKey, withSearchKey, setSearch]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (withSearchKey && !activeSearchKey) {
          showToastNoti("Please select a search key", "warning");
          return;
        }
        setPayload && setPayload((prev) => ({ ...prev, search, filter }));
        setSearch && setSearch(value);
      }}
    >
      <TextInput
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value.replace(/\+/g, ""));
        }}
        placeholder="Search..."
        aria-label="Search"
        size="md"
        radius="ms"
        miw={200}
        w={410}
        leftSection={<IconSearch size={16} />}
        classNames={{
          section: classes.rightSection,
          input: classes.input,
        }}
        rightSection={
          <Button
            type={"submit"}
            fw={600}
            h="100%"
            px="md"
            variant="subtle"
            className={classes.searchButton}
          >
            Search
          </Button>
        }
        rightSectionWidth={82}
        {...rest}
      />
    </form>
  );
}
