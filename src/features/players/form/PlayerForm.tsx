import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IPlayer } from "../../../app/models/player";
import { observer } from "mobx-react-lite";
import PlayerStore from "../../../app/stores/playerStore";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string;
}

const PlayerForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const playerStore = useContext(PlayerStore);

  const {
    createPlayer,
    editPlayer,
    submitting,
    player: initialFormState,
    loadPlayer,
    clearPlayer,
  } = playerStore;

  const [player, setPlayer] = useState<IPlayer>({
    id: 0,
    name: "",
    surname: "",
    position: "",
    birthdate: "",
    height: "",
  });

  useEffect(() => {
    if (match.params.id && player.id === 0) {
      let playerId = Number.parseInt(match.params.id);
      loadPlayer(playerId).then(
        () => initialFormState && setPlayer(initialFormState)
      );
    }
    return () => {
      clearPlayer();
    };
  }, [loadPlayer, clearPlayer, initialFormState, match.params.id, player.id]);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPlayer({
      ...player,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = () => {
    if (player.id === 0) {
      let newPlayer = {
        ...player,
      };
      createPlayer(newPlayer).then((id) => history.push(`/players/${id}`));
    } else {
      editPlayer(player).then(() => {
        history.push(`/players/${player.id}`);
      });
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form>
            <Form.Input
              onChange={handleInputChange}
              name="name"
              placeholder="Name"
              value={player.name}
            />
            <Form.Input
              onChange={handleInputChange}
              name="surname"
              rows={2}
              placeholder="Surname"
              value={player.surname}
            />
            <Form.Input
              onChange={handleInputChange}
              name="birthdate"
              type="date"
              placeholder="Birthdate"
              value={player.birthdate}
            />
            <Form.Input
              onChange={handleInputChange}
              name="position"
              placeholder="Position"
              value={player.position}
            />
            <Form.Input
              onChange={handleInputChange}
              name="height"
              placeholder="Height"
              value={player.height}
            />
            <Button
              onClick={handleSubmit}
              floated="right"
              positive
              type="submit"
              content="Submit"
              loading={submitting}
            />
            <Button
              onClick={() => history.push("/players")}
              floated="right"
              type="submit"
              content="Cancel"
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PlayerForm);
