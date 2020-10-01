import React, { Fragment } from "react";
import { Image, Header } from "semantic-ui-react";
import { IPlayer } from "../../../app/models/player";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const PlayerDetailedHeader: React.FC<{ player: IPlayer }> = ({ player }) => {
  return (
    <Fragment>
      <Header size="huge">{player.name + " " + player.surname}</Header>
      <Image
        src={`/assets/user-icon.png`}
        style={activityImageStyle}
        size="medium"
        floated="right"
      />
    </Fragment>
  );
};

export default PlayerDetailedHeader;
