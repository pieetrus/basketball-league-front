import React from "react";
import { Item } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ITeam } from "../../../app/models/team";

const TeamListItem: React.FC<{ team: ITeam }> = ({ team }) => {
  return (
    <>
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Image
              style={{ marginRight: "30px" }}
              size="tiny"
              circular
              src={team.logoUrl ?? "../assets/user-icon2.png"}
            />
            <Item.Content
              style={{
                fontSize: "20px",
                color: "black",
              }}
              as={Link}
              to={`/teams/${team.id}`}
            >
              {team.name} {team.shortName}
            </Item.Content>
          </Item.Content>
        </Item>
      </Item.Group>
    </>
  );
};

export default observer(TeamListItem);
