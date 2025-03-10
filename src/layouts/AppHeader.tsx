import {
  ActionIcon,
  Burger,
  Container,
  Flex,
  Image,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";
import Logo from "@/assets/logo.svg";
import classes from "./styles/AppHeader.module.css";
import { useNavigate } from "react-router-dom";
import { IconWorld } from "@tabler/icons-react";
type Props = {
  opened: boolean;
  toggle: () => void;
};

const AppHeader = ({ opened, toggle }: Props) => {
  const navigate = useNavigate();
  return (
    <Container fluid h={60}>
      <Flex className={classes.containerFlex}>
        <Flex gap="xs">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <UnstyledButton onClick={() => navigate("/")}>
            <Flex gap={5}>
              <Image src={Logo} h="50%" />
              <Text fz="lg" fw={500} c="var(--mantine-color-admin-5)">
                Ai Solution
              </Text>
            </Flex>
          </UnstyledButton>
        </Flex>

        <Flex>
          <Menu shadow="md" width={120}>
            <Menu.Target>
              <ActionIcon variant="transparent">
                <IconWorld />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item>Myanmar</Menu.Item>
              <Menu.Item>English</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Flex>
    </Container>
  );
};

export default AppHeader;
