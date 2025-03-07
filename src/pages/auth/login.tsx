import { BackgroundImage, Box, Flex, Image, Text } from "@mantine/core";
import Logo from "@/assets/logo.svg";
import LoginForm from "./components/LoginForm";
const Login = () => {
  return (
    <Box h="100vh" w="100vw" pos="relative">
      <BackgroundImage
        src="https://i.pinimg.com/736x/47/79/f2/4779f200d02304a65221cb55d66780e9.jpg"
        style={{
          filter: "contrast(100%) blur(8px)",
        }}
        pos="absolute"
        w="100%"
        h="100%"
      ></BackgroundImage>
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
          bg="white"
          w={{
            md: "25%",
          }}
          style={{
            borderRadius: "var(--mantine-spacing-xs)",
          }}
        >
          <Flex gap="xs" justify="center">
            <Image src={Logo} />
            <Text fz="lg" fw={600} c="var(--mantine-color-admin-3)">
              Ai Solution
            </Text>
          </Flex>
          <Flex justify="center" gap={8} mt="lg">
            <Text fz="lg" fw={500}>
              Ai Solution
            </Text>
            <Text
              fz="lg"
              fw={500}
              style={{
                borderLeft: "1px solid var(--mantine-color-gray-5)",
              }}
              pl="xs"
              c="var(--mantine-color-admin-3)"
            >
              Admin Portal
            </Text>
          </Flex>
          <LoginForm />
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
