import React from "react";
import { GridColumn, Segment, Grid, GridRow, Button } from "semantic-ui-react";

const EventPanel = () => {
  const buttonStyle = { width: 150, height: 60, marginTop: 10 };

  return (
    <Segment>
      <Grid centered>
        <GridColumn width={11}>
          <GridRow centered verticalAlign="middle">
            <Button content="Made" inverted style={buttonStyle} color="green" />
          </GridRow>
          <GridRow centered verticalAlign="middle">
            <Button content="Missed" inverted style={buttonStyle} color="red" />
          </GridRow>
          <GridRow centered verticalAlign="middle">
            <Button
              content="Foul"
              inverted
              style={buttonStyle}
              color="purple"
            />
          </GridRow>
          <GridRow centered verticalAlign="middle">
            <Button
              content="Turnover"
              inverted
              style={buttonStyle}
              color="blue"
            />
          </GridRow>
          <GridRow centered verticalAlign="middle">
            <Button
              content="Timeout"
              inverted
              style={buttonStyle}
              color="orange"
            />
          </GridRow>
        </GridColumn>
      </Grid>
    </Segment>
  );
};

export default EventPanel;
