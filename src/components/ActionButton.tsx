import { ActionIcon, Menu, MenuProps } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";

interface Props extends MenuProps {
  buttons: {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
    color: string;
  }[];
}

const ActionButton = ({ buttons, ...rest }: Props) => {
  return (
    <Menu shadow="sm" width="auto" {...rest}>
      <Menu.Target>
        <ActionIcon variant="transparent">
          <IconDotsVertical size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {buttons.map(({ title, icon, onClick, color }) => (
          <Menu.Item
            key={title}
            leftSection={icon}
            color={color}
            onClick={onClick}
          >
            {title}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ActionButton;
