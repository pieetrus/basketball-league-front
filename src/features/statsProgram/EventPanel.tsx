import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { GridColumn, Segment, Grid, GridRow, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";

const EventPanel = () => {
  const buttonStyle = { width: 150, height: 60, marginTop: 10 };
  const rootStore = useContext(RootStoreContext);
  const { playerChosen } = rootStore.statsStore;
  const { openModal } = rootStore.modalStore;
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
                if (playerChosen) openModal(<p>{playerChosen.name}</p>);
              }}
              disabled={playerChosen === undefined}
            />
          </GridRow>
          <GridRow centered verticalAlign="middle">
            <Button
              content="Missed"
              inverted
              style={buttonStyle}
              color="red"
              onClick={() => {
                if (playerChosen) openModal(<p>{playerChosen.name}</p>);
              }}
              disabled={playerChosen === undefined}
            />
          </GridRow>
          <GridRow centered verticalAlign="middle">
            <Button
              content="Foul"
              inverted
              style={buttonStyle}
              color="purple"
              onClick={() => {
                if (playerChosen) openModal(<p>{playerChosen.name}</p>);
              }}
              disabled={playerChosen === undefined}
            />
          </GridRow>
          <GridRow centered verticalAlign="middle">
            <Button
              content="Turnover"
              inverted
              style={buttonStyle}
              color="blue"
              onClick={() => {
                if (playerChosen) openModal(<p>{playerChosen.name}</p>);
              }}
              disabled={playerChosen === undefined}
            />
          </GridRow>
          <GridRow centered verticalAlign="middle">
            <Button
              content="Timeout"
              inverted
              style={buttonStyle}
              color="orange"
              onClick={() => {
                openModal(<p>Timeout modal</p>);
              }}
            />
          </GridRow>
        </GridColumn>
      </Grid>
    </Segment>
  );
};

export default observer(EventPanel);
