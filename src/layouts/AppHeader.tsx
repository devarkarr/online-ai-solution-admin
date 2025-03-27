import { Burger, Container, Flex, Image, UnstyledButton } from "@mantine/core";
import Logo from "@/assets/logo.svg";
import classes from "./styles/AppHeader.module.css";
import { useNavigate } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

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
            <Image src={Logo} w={100} />
          </UnstyledButton>
        </Flex>

        <Flex gap="xs" align="center">
          <ThemeSwitch />
        </Flex>
      </Flex>
    </Container>
  );
};

export default AppHeader;
