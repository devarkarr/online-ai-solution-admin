import {
  IconAdjustments,
  IconCalendarStats,
  IconInbox,
  IconTicket,
} from "@tabler/icons-react";

export const navLinks = [
  { label: "In Query", icon: IconInbox, link: "in-query" },
  { label: "Event", icon: IconTicket, link: "event" },
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
