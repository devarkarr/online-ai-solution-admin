import { Paper, useComputedColorScheme } from "@mantine/core";

interface ContentLayoutProps {
  children?: React.ReactNode;
  h?: string;
}

export default function ContentLayout({ children, h }: ContentLayoutProps) {
  const computedColorScheme = useComputedColorScheme("light");
  return (
    <Paper
      h={`${h ?? "calc(100% - 2.625rem - 1rem)"}`}
      radius="sm"
      shadow="xs"
      p="xs"
      bg={
        computedColorScheme === "light"
          ? "var(--mantine-color-white)"
          : "var(--mantine-color-dark-4)"
      }
    >
      {children}
    </Paper>
  );
}
