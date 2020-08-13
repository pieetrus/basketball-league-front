import React from "react";
import { Table, Checkbox, Button, Icon } from "semantic-ui-react";
import { IPlayerShortInfo } from "../../app/models/matchDetailed";

interface IProps {
  players: IPlayerShortInfo[];
}

const SquadTable: React.FC<IProps> = ({ players }) => {
  return (
    <Table celled compact definition textAlign="center">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Playin?</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Postion</Table.HeaderCell>
          <Table.HeaderCell>Height</Table.HeaderCell>
          <Table.HeaderCell>Nr</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {players.map((player) => (
          <Table.Row key={player.id}>
            <Table.Cell collapsing>
              <Checkbox toggle />
            </Table.Cell>
            <Table.Cell>{player.name + " " + player.surname}</Table.Cell>
            <Table.Cell> {player.position}</Table.Cell>
            <Table.Cell>{player.height}</Table.Cell>
            <Table.Cell>{player.jerseyNr}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan="4">
            <Button
              floated="right"
              icon
              labelPosition="left"
              primary
              size="small"
            >
              <Icon name="user" /> Add new player
            </Button>
            {/* <Button size="small">Approve</Button>
                      <Button disabled size="small">
                        Approve All
                      </Button> */}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default SquadTable;
