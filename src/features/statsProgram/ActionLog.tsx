import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Segment } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../app/stores/rootStore";
import { toJS } from "mobx";
import ShotLog from "./actionLogComponents/ShotLog";

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
    <Segment style={{ overflow: "auto", maxHeight: 450 }}>
      {getIncidents &&
        toJS(getIncidents).map(
          (incident) =>
            incident.incidentType === 3 && (
              <ShotLog incident={incident} key={incident.id} />
            )
        )}
    </Segment>
  );
};

export default observer(ActionLog);
