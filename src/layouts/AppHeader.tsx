import {
  Burger,
  Container,
  Flex,
  Image,
  Text,
  UnstyledButton,
} from "@mantine/core";
import Logo from "@/assets/logo.svg";
import classes from "./styles/AppHeader.module.css";
import { useNavigate } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import UserProfile from "./UserProfile";
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

        <Flex gap="xs" align="center">
          <ThemeSwitch />
          <UserProfile />
        </Flex>
      </Flex>
    </Container>
  );
};

export default AppHeader;
