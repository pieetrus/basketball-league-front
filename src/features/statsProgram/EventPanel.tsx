import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { GridColumn, Segment, Grid, GridRow, Button } from "semantic-ui-react";
import { ITeam } from "../../app/models/team";
import { ITimeout } from "../../app/models/timeout";
import { RootStoreContext } from "../../app/stores/rootStore";
import FoulModal from "./eventPanelModals/FoulModal";
import ShotModal from "./eventPanelModals/ShotModal";
import TurnoverModal from "./eventPanelModals/TurnoverModal";

const EventPanel: React.FC<{ isGuest: boolean }> = ({ isGuest }) => {
  const buttonStyle = { width: 150, height: 60, marginTop: 10 };
  const rootStore = useContext(RootStoreContext);
  const {
    playerChosen,
    createTimeout,
    match,
    quater,
    setPlayerChosen2,
    setPlayerChosen3,
  } = rootStore.statsStore;
  const { openModal, setModalSize } = rootStore.modalStore;

  const handleTimeoutSubmit = () => {
    let team: ITeam;
    if (isGuest) team = match?.teamGuest!;
    else team = match?.teamHome!;

    let model: ITimeout = {
      matchId: match?.id!,
      seconds: document.getElementById("seconds-left")?.innerHTML!,
      minutes: document.getElementById("minutes-left")?.innerHTML!,
      quater: quater,
      flagged: false,
      isGuest,
      teamId: team.id!,
    };
    createTimeout(model).then(() => toast.success("Timeout for " + team.name));
  };

  return (
    <Segment>
      <Grid centered>
        <GridColumn width={11}>
          <GridRow centered verticalAlign="middle">
            <Button
              content="Made"
              inverted
              style={buttonStyle}
              color="green"
              onClick={() => {
                if (playerChosen) {
                  setModalSize("large");
                  openModal(<ShotModal shotMade={true} isGuest={isGuest} />);
                  setPlayerChosen2(undefined, false);
                  setPlayerChosen3(undefined, false);
                } else {
                  toast.info("First choose player");
                }
              }}
              // disabled={playerChosen === undefined}
            />
          </GridRow>
          <GridRow centered verticalAlign="middle">
            <Button
              content="Missed"
              inverted
              style={buttonStyle}
              color="red"
              onClick={() => {
                if (playerChosen) {
                  setModalSize("large");
                  openModal(<ShotModal shotMade={false} isGuest={isGuest} />);
                  setPlayerChosen2(undefined, false);
                  setPlayerChosen3(undefined, false);
                } else {
                  toast.info("First choose player");
                }
              }}
              // disabled={playerChosen === undefined}
            />
          </GridRow>
          <GridRow centered verticalAlign="middle">
            <Button
              content="Foul"
              inverted
              style={buttonStyle}
              color="purple"
              onClick={() => {
                if (playerChosen) {
                  setModalSize("large");
                  openModal(<FoulModal isGuest={isGuest} />);
                  setPlayerChosen2(undefined, false);
                  setPlayerChosen3(undefined, false);
                } else {
                  toast.info("First choose player");
                }
              }}
              // disabled={playerChosen === undefined}
            />
          </GridRow>
          <GridRow centered verticalAlign="middle">
            <Button
              content="Turnover"
              inverted
              style={buttonStyle}
              color="blue"
              onClick={() => {
                if (playerChosen) {
                  openModal(<TurnoverModal isGuest={isGuest} />);
                  setPlayerChosen2(undefined, false);
                  setPlayerChosen3(undefined, false);
                } else {
                  toast.info("First choose player");
                }
              }}
              // disabled={playerChosen === undefined}
            />
          </GridRow>
          <GridRow centered verticalAlign="middle">
            <Button
              content="Timeout"
              inverted
              style={buttonStyle}
              color="orange"
              onClick={() => {
                handleTimeoutSubmit();
              }}
            />
          </GridRow>
        </GridColumn>
      </Grid>
    </Segment>
  );
};

export default observer(EventPanel);
