import React, { useContext } from "react";
import { Item } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import TeamListItem from "./TeamListItem";

const TeamList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { teamsByName } = rootStore.teamStore;

  return (
    <>
      <Item.Group divided style={{ marginTop: "50px" }}>
        {teamsByName.map((team) => (
          <TeamListItem key={team.id} team={team} />
        ))}
      </Item.Group>
    </>
  );
};

export default observer(TeamList);
