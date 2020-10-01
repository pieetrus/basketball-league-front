import React, { Fragment, useContext, useEffect } from "react";
import { Segment, Header, Form, Button, List } from "semantic-ui-react";
import { ISeason } from "../../app/models/season";
import { IDivision } from "../../app/models/division";
import { RootStoreContext } from "../../app/stores/rootStore";
import { ITeamSeason } from "../../app/models/teamSeason";
import { toast } from "react-toastify";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Field, Form as FinalForm } from "react-final-form";
import SelectInput from "../../app/common/form/SelectInput";
import { combineValidators, isRequired } from "revalidate";
import { observer } from "mobx-react-lite";
import PlayerSeasonManager from "./PlayerSeasonManager";

interface IProps {
  season: ISeason;
  division: IDivision;
}

const validate = combineValidators({
  teamId: isRequired({ message: "Team is required" }),
});

const TeamSeasonManager: React.FC<IProps> = ({ season, division }) => {
  const rootStore = useContext(RootStoreContext);

  const {
    createTeamSeason,
    optionsExludingSelected: options,
    submitting,
    loadTeams,
    loadingInitial: loadingTeams,
    loadTeamsSeasonDto: loadTeamsSeason,
    loadingInitialSeason,
    teamsSeasonDtoByName: teamsSeasonByName,
    deleteTeamSeason,
    target,
  } = rootStore.teamStore;

  const { openModal } = rootStore.modalStore;

  const { setPredicate } = rootStore.playerStore;

  const handleFinalFormSubmit = (values: any) => {
    const { ...teamSeason } = values;
    let newTeamSeason: ITeamSeason = {
      ...teamSeason,
      seasonId: season.id,
      divisionId: division.id,
    };
    createTeamSeason(newTeamSeason).then(() => {
      toast.success(`Team succesfully assigned for ${season.name} season`);
    });
  };

  useEffect(() => {
    loadTeamsSeason();
    loadTeams();
  }, [loadTeams, loadTeamsSeason]);

  if (loadingTeams || loadingInitialSeason)
    return <LoadingComponent content="Loading" />;

  return (
    <Fragment>
      <Segment>
        <Header
          content={"Already assigned"}
          color="teal"
          size="small"
          textAlign="center"
        />
        {teamsSeasonByName.length !== 0 && (
          <List>
            {teamsSeasonByName.map((team) => (
              <List.Item key={team.id}>
                {team.name}
                <Button
                  content="Manage players"
                  size="tiny"
                  style={{ marginLeft: 20 }}
                  onClick={() => {
                    openModal(
                      <PlayerSeasonManager
                        team={team}
                        season={season}
                        division={division}
                      />
                    );
                    setPredicate("seasonId", season.id?.toString(), true);
                    setPredicate("divisionId", division.id?.toString());
                    setPredicate("teamId", team.id?.toString());
                  }}
                />
                <Button
                  name={team.id}
                  content="Remove"
                  color="red"
                  size="tiny"
                  style={{ float: "right" }}
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => deleteTeamSeason(e, team.id!)}
                  loading={submitting && target === team.id}
                />
              </List.Item>
            ))}
          </List>
        )}
      </Segment>
      <Header
        content={
          `Assign teams for season (` +
          season.name +
          `) and division (` +
          division.name +
          `)`
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
                name="teamId"
                placeholder="Team"
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

export default observer(TeamSeasonManager);
