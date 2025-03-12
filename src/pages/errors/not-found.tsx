import { Button, Container, Flex, Group, Text, Title } from "@mantine/core";
import classes from "./styles/error.module.css";
import { useNavigate } from "react-router-dom";
import { IconError404 } from "@tabler/icons-react";

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => navigate("/");
  const goBack = () => navigate(-1);

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Flex justify="center">
          <IconError404 size={250} />
        </Flex>
        <div className={classes.content}>
          <Title className={classes.title}>Page Not Found</Title>
          <Text size="lg" className={classes.description}>
            Oops! It seems we've encountered a celestial anomaly. Page you are
            trying to open does not exist. You may have mistyped the address, or
            the page has been moved to another URL.
          </Text>
          <Group justify="center">
            <Button onClick={goHome} size="md" radius="md">
              Back to Home
            </Button>
            <Button onClick={goBack} size="md" radius="md" variant="outline">
              Go Back
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
