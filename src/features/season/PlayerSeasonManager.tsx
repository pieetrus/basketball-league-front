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
import { IPlayerSeason } from "../../app/models/playerSeason";
import { toast } from "react-toastify";
import { IPlayer } from "../../app/models/player";

interface IProps {
  season: ISeason;
  division: IDivision;
  team: ITeam;
}

const validate = combineValidators({
  playerId: isRequired({ message: "Player is required" }),
});

const PlayerSeasonManager: React.FC<IProps> = ({ season, division, team }) => {
  const rootStore = useContext(RootStoreContext);

  const {
    loadTeams,
    loadingInitial: loadingTeams,
    loadTeamsSeason,
    loadingInitialSeason,
  } = rootStore.teamStore;

  const {
    submitting,
    loadPlayers,
    loadPlayersSeason,
    loadingInitial: loadingPlayers,
    optionsExludingSelected: options,
    playersSeason,
    createPlayerSeason,
    deletePlayerSeason,
    target,
  } = rootStore.playerStore;

  const { closeModal } = rootStore.modalStore;

  const handleFinalFormSubmit = (values: any) => {
    const { ...playerSeason } = values;
    let newPlayerSeason: IPlayerSeason = {
      ...playerSeason,
      seasonId: season.id,
      divisionId: division.id,
      teamId: team.id,
    };
    console.log(newPlayerSeason);
    createPlayerSeason(newPlayerSeason).then(() => {
      toast.success(
        `Player succesfully assigned for ${team.name}, for ${season.name} season`
      );
      // closeModal();
    });
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
          {playersSeason.map((player: IPlayerSeason) => (
            <List.Item key={player.id}>
              {player.name + " " + player.surname}
              <Button
                name={player.id}
                content="Delete"
                color="red"
                size="tiny"
                style={{ float: "right" }}
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  deletePlayerSeason(e, player.id!)
                }
                loading={submitting && target === player.id}
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
