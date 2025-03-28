import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useNav from "./useNav";
import { Icon, IconProps } from "@tabler/icons-react";

interface CurrentNav {
  link: string;
  label: string;
  icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
}

export default function useCurrentNav() {
  const { pathname } = useLocation();
  const [currentNav, setCurrentNav] = useState<CurrentNav | null>(null);

  const { navLinks } = useNav();

  useEffect(() => {
    const pathArray = pathname.split("/");

    let current = navLinks.find((nav) => {
      return pathArray.includes(nav.link);
    });

    setCurrentNav(current!);
  }, [pathname, navLinks]);

  return { currentNav };
}
