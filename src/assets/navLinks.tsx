import { IconCalendarStats, IconInbox, IconTicket } from "@tabler/icons-react";

export const navLinks = [
  { label: "Inquiries", icon: IconInbox, link: "in-quiries" },
  { label: "Event", icon: IconTicket, link: "event" },
  {
    label: "Projects",
    icon: IconCalendarStats,
    links: [
      { label: "Show Case", link: "/show-case" },
    ],
  },
];
