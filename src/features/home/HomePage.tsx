import React, { useContext } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
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
            <Button as={Link} to="/login" size="huge" inverted>
              Go to players!
            </Button>
          </>
        ) : (
          <>
            <Header as="h2" inverted content="Welcome to DALK" />
            <Button as={Link} to="/login" size="huge" inverted>
              Login
            </Button>
            <Button as={Link} to="/register" size="huge" inverted>
              Register
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
