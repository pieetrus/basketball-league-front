import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import { toJS } from "mobx";
import ShotLog from "./actionLogComponents/ShotLog";
import FoulLog from "./actionLogComponents/FoulLog";

const ActionLog = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadingIncidents, getIncidents } = rootStore.statsStore;

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
              {incident.incidentType === 3 && (
                <ShotLog incident={incident} key={incident.id} />
              )}
              {incident.incidentType === 1 && (
                <FoulLog incident={incident} key={incident.id} />
              )}
            </Fragment>
          ))}
        </Segment>
      )}
    </Segment>
  );
};

export default observer(ActionLog);
