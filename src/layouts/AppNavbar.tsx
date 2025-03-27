import {
  Box,
  Button,
  Collapse,
  Group,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { IconChevronRight, IconLogout2 } from "@tabler/icons-react";
import { useState } from "react";
import classes from "./styles/AppNavbar.module.css";
import { navLinks } from "@/assets/navLinks";
import { Link } from "react-router-dom";
import useCurrentNav from "@/hooks/useCurrentNav";
import cx from "clsx";
import useStore from "@/client-store/useStore";

interface Props {}

const AppNavbar = ({}: Props) => {
  const { resetAuth } = useStore();

  const links = navLinks.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <>
      <Stack gap={3}>{links}</Stack>
      <Button
        onClick={() => resetAuth()}
        w="100%"
        mt="auto"
        justify="start"
        leftSection={<IconLogout2 />}
        bg="var(--accent-danger)"
      >
        Logout
      </Button>
    </>
  );
};

const LinksGroup = ({
  icon: Icon,
  label,
  link,
  initiallyOpened = false,
  links,
}: {
  icon: React.FC<any>;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}) => {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened);
  const { currentNav } = useCurrentNav();

  const items = (hasLinks ? links : []).map((link) => (
    <Link
      key={link.label}
      to={link.link}
      style={{
        textDecoration: "none",
      }}
    >
      <Text
        className={cx(classes.link, {
          [classes.activeLink]: currentNav?.link == link.link,
        })}
      >
        {link.label}
      </Text>
    </Link>
  ));

  return (
    <>
      {!hasLinks && link ? (
        <Link
          to={link}
          style={{
            textDecoration: "none",
          }}
        >
          <UnstyledButton className={classes.control}>
            <Group
              className={cx(classes.main_link, {
                [classes.activeLink]: currentNav?.link == link,
              })}
              gap={0}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <ThemeIcon variant="transparent" size={30}>
                  <Icon size={18} />
                </ThemeIcon>
                <Box ml="md">{label}</Box>
              </Box>
            </Group>
          </UnstyledButton>
        </Link>
      ) : (
        <UnstyledButton
          onClick={() => setOpened((o) => !o)}
          className={classes.control}
        >
          <Group className={classes.main_link} gap={0}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon variant="light" size={30}>
                <Icon size={18} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>

            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{ transform: opened ? "rotate(-90deg)" : "none" }}
            />
          </Group>
        </UnstyledButton>
      )}

      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
};
export default AppNavbar;
