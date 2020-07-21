import React from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const HomePage = () => {
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
        <Header as="h2" inverted content="Welcome to DALK" />
        <Button as={Link} to="/players" size="huge" inverted>
          ENTER
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePage;
