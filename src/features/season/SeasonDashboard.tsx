import React, { Fragment } from "react";
import { Segment } from "semantic-ui-react";
import ManagerNavBar from "../nav/ManagerNavBar";

const SeasonDashboard = () => {
  return (
    <Fragment>
      <ManagerNavBar />
      <Segment>
        <p>Season dashboard</p>
      </Segment>
    </Fragment>
  );
};

export default SeasonDashboard;
