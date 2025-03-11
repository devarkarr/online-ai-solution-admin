import { Box, DEFAULT_THEME, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconAlertHexagon,
  IconComet,
  IconHelpHexagon,
  IconInfoCircle,
} from "@tabler/icons-react";

type status = "success" | "error" | "info" | "warning" | undefined;

const showToastNoti = (title: string, status: status = "info") => {
  const theme = DEFAULT_THEME;
  let toastColor = "var(--accent-info)";
  let icon = IconInfoCircle;
  if (status === "success") {
    toastColor = "var(--accent-success)";
    icon = IconComet;
  } else if (status === "error") {
    toastColor = "var(--accent-danger)";
    icon = IconHelpHexagon;
  } else if (status === "warning") {
    toastColor = "var(--accent-warning)";
    icon = IconAlertHexagon;
  }

  notifications.show({
    title: title,
    message: "",
    autoClose: 3000,
    icon: <Box component={icon} color="#fff" />,
    styles: {
      root: {
        borderRadius: theme.radius.md,
        padding: rem(12),
        background: toastColor,
        border: toastColor,
      },
      title: {
        fontSize: rem(14),
        textAlign: "center",
        color: theme.white,
        fontWeight: 700,
        lineHeight: 1.75,
      },
      icon: {
        background: toastColor,
      },
      closeButton: {
        color: theme.white,
        background: "transparent",
      },
    },
    style: { width: "auto" },
  });
};

export default showToastNoti;
