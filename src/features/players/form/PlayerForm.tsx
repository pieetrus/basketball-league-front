import React, { useState, useContext, useEffect, Fragment } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IPlayer, PlayerFormValues } from "../../../app/models/player";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import { position } from "../../../app/common/options/positionOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineValidators, isRequired } from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ManagerNavBar from "../../nav/ManagerNavBar";

const validate = combineValidators({
  name: isRequired({ message: "Name is required" }),
  surname: isRequired({ message: "Surname is required" }),
  position: isRequired({ message: "Position is required" }),
  height: isRequired({ message: "Height is required" }),
});

interface DetailParams {
  id: string;
}

const PlayerForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);

  const {
    createPlayer,
    editPlayer,
    submitting,
    loadPlayer,
  } = rootStore.playerStore;

  const [player, setPlayer] = useState(new PlayerFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      let playerId = Number.parseInt(match.params.id);
      loadPlayer(playerId)
        .then((player) => setPlayer(new PlayerFormValues(player)))
        .finally(() => setLoading(false));
    }
  }, [loadPlayer, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...player } = values;
    if (!player.id) {
      let newPlayer: IPlayer = {
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
    <Fragment>
      <ManagerNavBar />
      <Grid>
        <Grid.Column width={10}>
          <Segment clearing>
            <FinalForm
              validate={validate}
              initialValues={player}
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form loading={loading}>
                  <Field
                    name="name"
                    placeholder="Name"
                    value={player.name}
                    component={TextInput}
                  />
                  <Field
                    name="surname"
                    placeholder="Surname"
                    value={player.surname}
                    component={TextArea}
                    rows={2}
                  />
                  <Field
                    name="birthdate"
                    placeholder="Birthdate"
                    value={player.birthdate!}
                    date={true}
                    component={DateInput}
                  />
                  <Field
                    name="position"
                    placeholder="Position"
                    value={player.position}
                    component={SelectInput}
                    options={position}
                  />
                  <Field
                    name="height"
                    placeholder="Height"
                    value={player.height}
                    component={TextInput}
                  />
                  <Button
                    onClick={() => handleSubmit()}
                    disabled={loading || invalid || pristine}
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                    loading={submitting}
                  />
                  <Button
                    onClick={
                      player.id
                        ? () => history.push(`/players/${player.id}`)
                        : () => history.push("/players")
                    }
                    disabled={loading}
                    floated="right"
                    type="submit"
                    content="Cancel"
                  />
                </Form>
              )}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(PlayerForm);
