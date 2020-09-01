import React, { Fragment, useContext, useEffect } from "react";
import { ISeason } from "../../app/models/season";
import { IDivision } from "../../app/models/division";
import { combineValidators, isRequired } from "revalidate";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Segment, Header, Button, Form, List, Icon } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import SelectInput from "../../app/common/form/SelectInput";
import { ITeam } from "../../app/models/team";
import { observer } from "mobx-react-lite";

interface IProps {
  season: ISeason;
  division: IDivision;
  team: ITeam;
}

const validate = combineValidators({
  teamId: isRequired({ message: "Team is required" }),
});

const PlayerSeasonManager: React.FC<IProps> = ({ season, division, team }) => {
  const rootStore = useContext(RootStoreContext);

  const {
    submitting,
    loadTeams,
    loadingInitial: loadingTeams,
    loadTeamsSeason,
    loadingInitialSeason,
  } = rootStore.teamStore;

  const {
    loadPlayers,
    loadPlayersSeason,
    loadingInitial: loadingPlayers,
    optionsExludingSelected: options,
    playersSeason,
  } = rootStore.playerStore;

  const handleFinalFormSubmit = (values: any) => {
    // const { ...teamSeason } = values;
    // let newTeamSeason: ITeamSeason = {
    //   ...teamSeason,
    //   seasonId: season.id,
    //   divisionId: division.id,
    // };
    // createTeamSeason(newTeamSeason).then(() => {
    //   toast.success(`Team succesfully assigned for ${season.name} season`);
    //   closeModal();
    // });
    console.log(values);
  };

  useEffect(() => {
    loadTeamsSeason();
    loadTeams();
    loadPlayers();
    loadPlayersSeason();
  }, [loadTeams, loadTeamsSeason, loadPlayers, loadPlayersSeason]);

  if (loadingTeams || loadingInitialSeason || loadingPlayers)
    return <LoadingComponent content="Loading" />;

  return (
    <Fragment>
      <Segment>
        <Header
          content={"Assigned players"}
          color="teal"
          size="small"
          textAlign="center"
        />
        <List>
          {playersSeason.map((player) => (
            <List.Item key={player.id}>
              {player.name + " " + player.surname}
              <Icon
                name="delete"
                color="red"
                size="big"
                style={{ float: "right" }}
                // onClick={(
                //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                // ) => deleteTeamSeason(e, team.id!)}
              />
            </List.Item>
          ))}
        </List>
      </Segment>
      <Header
        content={
          `Assign players in ` + team.name + ` for season ` + season.name
        }
        color="teal"
        size="small"
        textAlign="center"
      />
      <Segment>
        <FinalForm
          validate={validate}
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit, invalid, pristine }) => (
            <Form>
              <Field
                name="playerId"
                placeholder="Player"
                component={SelectInput}
                options={options}
              />
              <Button
                onClick={() => handleSubmit()}
                disabled={invalid || pristine}
                floated="right"
                positive
                type="submit"
                content="Assign"
                style={{ marginBottom: 10 }}
                loading={submitting}
              />
            </Form>
          )}
        />
      </Segment>
    </Fragment>
  );
};

export default observer(PlayerSeasonManager);
