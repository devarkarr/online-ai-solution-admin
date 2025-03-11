import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSunLow } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./styles/ThemeSwitch.module.css";

export default function ThemeSwitch() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() => {
        setColorScheme(computedColorScheme === "light" ? "dark" : "light");
      }}
      variant="default"
      size="md"
      radius="md"
      aria-label="Toggle color scheme"
    >
      <IconSunLow className={cx(classes.icon, classes.light)} />
      <IconMoonStars className={cx(classes.icon, classes.dark)} />
    </ActionIcon>
  );
}
