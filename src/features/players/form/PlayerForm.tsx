import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IPlayer } from "../../../app/models/player";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  player: IPlayer;
  createPlayer: (player: IPlayer) => void;
  editPlayer: (player: IPlayer) => void;
}

const PlayerForm: React.FC<IProps> = ({
  setEditMode,
  player: initialFormState,
  createPlayer,
  editPlayer,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: 0,
        name: "",
        surname: "",
        position: "",
        birthdate: "",
        height: "",
      };
    }
  };

  const [player, setPlayer] = useState<IPlayer>(initializeForm);

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
      createPlayer(newPlayer);
    } else {
      editPlayer(player);
    }
  };

  return (
    <Segment clearing>
      <Form>
        <Form.Input
          onChange={handleInputChange}
          name="name"
          placeholder="Name"
          value={player.name}
        />
        <Form.TextArea
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
        />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="submit"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default PlayerForm;
