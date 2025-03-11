import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AppHeader from "./AppHeader";
import AppNavbar from "./AppNavbar";
import { Outlet } from "react-router-dom";
import classes from "./styles/App.module.css"

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      classNames={{
        root: classes.root,
        main: classes.main,
      }}
      padding="md"
    >
      <AppShell.Header>
        <AppHeader opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppNavbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
