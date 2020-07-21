import React from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { IPlayer } from "../../../app/models/player";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const PlayerDetailedHeader: React.FC<{ player: IPlayer }> = ({ player }) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src={`/assets/user-icon.png`} fluid style={activityImageStyle} />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={player.name + " " + player.surname}
                  style={{ color: "white" }}
                />
                <p>{player.birthdate.split("T")[0]}</p>
                <p>{player.position}</p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Join Activity</Button>
        <Button>Cancel attendance</Button>
        <Button color="orange" floated="right">
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default PlayerDetailedHeader;
