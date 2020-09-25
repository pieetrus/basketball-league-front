import React, { useContext } from "react";
import { Segment, Item, Button } from "semantic-ui-react";
import { IMatchDetailed } from "../../app/models/matchDetailed";
import { RootStoreContext } from "../../app/stores/rootStore";
import ChooseJerseysAndSquad from "./ChooseJerseysAndSquad";
import { observer } from "mobx-react-lite";

interface IProps {
  match: IMatchDetailed;
}

const MatchItem: React.FC<IProps> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { openModal, setModalSize } = rootStore.modalStore;
  const {
    setSelectedMatch,
    deleteMatch,
    submitting,
    target,
  } = rootStore.matchStore;

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
      {match.started && (
        <Segment secondary textAlign="center">
          {match.teamHomePts + " : " + match.teamGuestPts}{" "}
        </Segment>
      )}
      <Segment secondary>
        {match.startDate?.toString().split("T")[0]}{" "}
        {match.startDate?.toString().split("T")[1]}
      </Segment>
      <Segment secondary>
        <Button
          content="Go to match"
          onClick={() => {
            setSelectedMatch(match.id!).then(() => {
              openModal(<ChooseJerseysAndSquad />);
              setModalSize("large");
            });
          }}
          disabled={match.ended}
        />
        {match.ended && (
          <Button
            content="See stats"
            onClick={() => {
              console.log("wil be soon");
            }}
            primary
            style={{ marginLeft: 60 }}
          />
        )}
        <Button
          content="Delete match"
          onClick={(e) => {
            deleteMatch(e, match.id!);
          }}
          color="red"
          name={match.id}
          floated="right"
          loading={target === match.id && submitting}
          disabled={match.started}
        />
      </Segment>
    </Segment.Group>
  );
};

export default observer(MatchItem);
