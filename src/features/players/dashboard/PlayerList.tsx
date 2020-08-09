import React, { useContext } from "react";
import { Item } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PlayerListItem from "./PlayerListItem";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PlayerDashboardHeader from "./PlayerDashboardHeader";

const ActivityList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { playersBySurname } = rootStore.playerStore;

  return (
    <>
      <PlayerDashboardHeader />
      <Item.Group divided style={{ marginTop: "50px" }}>
        {playersBySurname.map(([group, players]) =>
          players.map((player) => (
            <PlayerListItem key={player.id} player={player} />
          ))
        )}
      </Item.Group>
    </>
  );
};

export default observer(ActivityList);
