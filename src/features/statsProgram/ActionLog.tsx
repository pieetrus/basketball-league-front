import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import { toJS } from "mobx";
import ShotLog from "./actionLogComponents/ShotLog";
import FoulLog from "./actionLogComponents/FoulLog";
import TimeoutLog from "./actionLogComponents/TimeoutLog";
import TurnoverLog from "./actionLogComponents/TurnoverLog";
import FreeThrowsLog from "./actionLogComponents/FreeThrowsLog";

const ActionLog = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadingIncidents, getIncidents } = rootStore.statsProgramStore;

  if (loadingIncidents)
    return (
      <Segment>
        <LoadingComponent content="Loading incidents" />
      </Segment>
    );
  return (
    <Segment>
      <Segment>
        <Header content="Action log" color="teal" textAlign="center" />
      </Segment>
      {getIncidents && (
        <Segment style={{ overflow: "auto", maxHeight: 450 }}>
          {toJS(getIncidents).map((incident) => (
            <Fragment key={incident.id}>
              {incident.incidentType === 1 && incident.foul?.freeThrows && (
                <Fragment key={incident.id}>
                  <FreeThrowsLog incident={incident} />
                  <FoulLog incident={incident} />
                </Fragment>
              )}
              {incident.incidentType === 1 && !incident.foul?.freeThrows && (
                <Fragment key={incident.id}>
                  <FoulLog incident={incident} />
                </Fragment>
              )}
              {incident.incidentType === 3 && (
                <ShotLog incident={incident} key={incident.id} />
              )}
              {incident.incidentType === 4 && (
                <TurnoverLog incident={incident} key={incident.id} />
              )}
              {incident.incidentType === 6 && (
                <TimeoutLog incident={incident} key={incident.id} />
              )}
            </Fragment>
          ))}
        </Segment>
      )}
    </Segment>
  );
};

export default observer(ActionLog);
