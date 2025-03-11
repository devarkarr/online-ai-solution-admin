import {
  IconAdjustments,
  IconCalendarStats,
  IconInbox,
} from "@tabler/icons-react";

export const navLinks = [
  { label: "In Query", icon: IconInbox, link: "in-query" },
  {
    label: "Projects",
    icon: IconCalendarStats,
    links: [
      { label: "Ecommerce App", link: "ecommerce-app" },
      { label: "Ecommerce Website", link: "ecommerce-website" },
      { label: "Taxi App", link: "taxi-app" },
    ],
  },
  { label: "Settings", icon: IconAdjustments, link: "settings" },
];
