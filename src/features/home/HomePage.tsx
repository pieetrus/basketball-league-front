import React, { useContext } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";
import { observer } from "mobx-react-lite";

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal, setDefaultModalSize } = rootStore.modalStore;

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo-dalk.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          DALK
        </Header>
        {isLoggedIn && user ? (
          <>
            <Header
              as="h2"
              inverted
              content={`Welcome back ${user.displayName}`}
            />
            <Button as={Link} to="/news" size="huge" inverted>
              Go to news!
            </Button>
          </>
        ) : (
          <>
            <Header as="h2" inverted content="Welcome to DALK" />
            <Button
              onClick={() => {
                openModal(<LoginForm />);
                setDefaultModalSize();
              }}
              size="huge"
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => {
                openModal(<RegisterForm />);
                setDefaultModalSize();
              }}
              size="huge"
              inverted
            >
              Register
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
};

export default observer(HomePage);
