import React, { Fragment, useContext, useEffect } from "react";
import { Segment, Tab, Button } from "semantic-ui-react";
import ManagerNavBar from "../nav/ManagerNavBar";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import DivisionForm from "./DivisionForm";

const DivisionDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    divisionsByLevel: divisionsByName,
    loadDivisions,
    loadingInitial,
    deleteDivision,
    submitting,
  } = rootStore.divisionStore;

  const { openModal } = rootStore.modalStore;

  useEffect(() => {
    loadDivisions();
  }, [loadDivisions]);

  const panes: any[] = [];

  divisionsByName.map((division) =>
    panes.push({
      menuItem: division.name,
      render: () => (
        <Tab.Pane>
          <Segment textAlign="center">
            <Button
              content="Delete division"
              color="red"
              onClick={(e) => deleteDivision(e, division.id!)}
              loading={submitting}
            />
          </Segment>
        </Tab.Pane>
      ),
    })
  );

  if (loadingInitial)
    return <LoadingComponent content="Loading divisions..." />;

  return (
    <Fragment>
      <ManagerNavBar />
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition="right"
        panes={panes}
      />
      <Segment textAlign="center">
        <Button
          content="Create Division"
          color="green"
          size="large"
          onClick={() => openModal(<DivisionForm />)}
        />
      </Segment>
    </Fragment>
  );
};
export default observer(DivisionDashboard);
