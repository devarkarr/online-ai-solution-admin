import { LoginPayload } from "@/store/server/auth/interface";
import { useLogin } from "@/store/server/auth/mutation";
import { Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandSamsungpass, IconUser } from "@tabler/icons-react";

const LoginForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const login = useLogin();
  const onSubmit = (values: LoginPayload) => {
    login.mutate(values);
  };
  return (
    <Stack
      mt="lg"
      component="form"
      //@ts-ignore
      onSubmit={form.onSubmit((values) => onSubmit(values))}
    >
      <TextInput
        label="Email"
        placeholder="your@email.com"
        leftSection={<IconUser size={18} />}
        key={form.key("email")}
        {...form.getInputProps("email")}
      />

      <PasswordInput
        label="Password"
        placeholder="********"
        leftSection={<IconBrandSamsungpass size={18} />}
        key={form.key("password")}
        {...form.getInputProps("password")}
      />
      <Button type="submit">LOGIN</Button>
      <Text fz="sm" c="gray.7" ta="center">
        Forgot password?
      </Text>
    </Stack>
  );
};

export default LoginForm;
