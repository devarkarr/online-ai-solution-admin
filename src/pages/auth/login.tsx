import { Box, Flex, Image, Text } from "@mantine/core";
import Logo from "@/assets/logo.svg";
import LoginForm from "./components/LoginForm";
const Login = () => {
  return (
    <Box h="100vh" w="100vw" pos="relative">
      <Flex
        w="100%"
        h="100%"
        justify="center"
        align="center"
        pos="relative"
        style={{
          boxShadow: "var(--mantine-shadow-md)",
        }}
      >
        <Box
          p="xl"
          w={{
            md: "25%",
          }}
          style={{
            border: "1px solid ligth-dark(var(--mantine-color-gray-3))",
            borderRadius: "var(--mantine-spacing-xs)",
            backgroundColor:
              "light-dark(var(--mantine-color-white),var(--mantine-color-gray-9))",
          }}
        >
          <Flex gap="xs" justify="center">
            <Image src={Logo} w={150} />
          </Flex>
          <Flex justify="center" gap={8} mt="lg">
            <Text fz="lg" fw={500} pl="xs" c="var(--mantine-color-admin-5)">
              Login
            </Text>
          </Flex>
          <LoginForm />
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
