import React from "react";
import { Divider, Grid, Item, ItemGroup, Segment } from "semantic-ui-react";

const ActionLog = () => {
  return (
    <Segment>
      <Segment>
        <ItemGroup divided>
          <Item>
            <Item.Content>
              <Grid>
                <Grid.Column width={14}>Q1 9:46 0-6</Grid.Column>
                <Grid.Column width={2}>
                  <i
                    className="trash icon"
                    color="red"
                    style={{ fontSize: 20, cursor: "pointer" }}
                  ></i>
                </Grid.Column>
              </Grid>
              <Divider />
              <Item.Meta>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3} verticalAlign="middle">
                      <Segment inverted color="blue" content="3PM" />
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Segment content="12. Jakub Pietrus" />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={3} verticalAlign="middle">
                      <Segment inverted color="blue" content="AST" />
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Segment content="7. Radosław Lis" />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Item.Meta>
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
    </Segment>
  );
};

export default ActionLog;
