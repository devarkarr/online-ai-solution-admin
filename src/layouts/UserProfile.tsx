import useStore from "@/client-store/useStore";
import { ActionIcon, Button, Menu } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";

const UserProfile = () => {
  const { resetAuth } = useStore();
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon
          variant="transparent"
          radius="md"
          style={{
            border: "1px solid var(--mantine-color-gray-4)",
          }}
        >
          <IconUser size={23} color="var(--mantine-color-gray-8)" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item p={0}>
          <Button
            onClick={() => resetAuth()}
            size="sm"
            variant="light"
            color="var(--accent-danger)"
          >
            Log out
          </Button>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserProfile;
