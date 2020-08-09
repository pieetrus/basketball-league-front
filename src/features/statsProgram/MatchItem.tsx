import React from "react";
import {
  Segment,
  Item,
  Button,
  ItemDescription,
  ItemExtra,
  ItemMeta,
} from "semantic-ui-react";
import { IMatch } from "../../app/models/match";
import { IMatchDetailed } from "../../app/models/matchDetailed";

interface IProps {
  match: IMatchDetailed;
}

const MatchItem: React.FC<IProps> = ({ match }) => {
  return (
    <Segment.Group horizontal>
      <Segment>
        <Item>
          <Item.Content>
            <Item.Header>
              {match.teamHome} - {match.teamGuest}
            </Item.Header>
            <Item.Description>{match.division}</Item.Description>
          </Item.Content>
        </Item>
      </Segment>
      <Segment secondary>
        {match.startDate?.toString().split("T")[0]}{" "}
        {match.startDate?.toString().split("T")[1]}
      </Segment>
      <Segment secondary>
        <Button content="Go to match" />
      </Segment>
    </Segment.Group>
  );
};

export default MatchItem;
