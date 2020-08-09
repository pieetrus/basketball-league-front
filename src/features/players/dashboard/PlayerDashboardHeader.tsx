import React, { useContext } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

const PlayerDashboardHeader = () => {
  const rootStore = useContext(RootStoreContext);
  const { setPredicate } = rootStore.playerStore;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // 30 bytes
  return (
    <>
      {letters.map((letter) => (
        <Label
          key={letter}
          size="tiny"
          color="blue"
          onClick={() => setPredicate("surnameLetter", letter)}
          style={{ cursor: "pointer" }}
        >
          {letter}
        </Label>
      ))}
    </>
  );
};

export default observer(PlayerDashboardHeader);
