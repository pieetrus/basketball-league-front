import React, { useContext, useEffect } from "react";
import { Form, Button, Header, Segment } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import { RootStoreContext } from "../../app/stores/rootStore";
import { combineValidators, isRequired } from "revalidate";
import { observer } from "mobx-react-lite";
import { ITeamSeason } from "../../app/models/teamSeason";
import SelectInput from "../../app/common/form/SelectInput";
import { ISeason } from "../../app/models/season";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { toast } from "react-toastify";

const validate = combineValidators({
  divisionId: isRequired({ message: "Division is required" }),
  teamId: isRequired({ message: "Team is required" }),
});

interface IProps {
  season: ISeason;
}

const TeamSeasonForm: React.FC<IProps> = ({ season }) => {
  const rootStore = useContext(RootStoreContext);

  const {
    createTeamSeason,
    options: teamOptions,
    submitting,
    loadTeams,
    loadingInitial: loadingTeams,
  } = rootStore.teamStore;
  const {
    options: divisionOptions,
    loadDivisions,
    loadingInitial: loadingDivisions,
  } = rootStore.divisionStore;

  const { closeModal } = rootStore.modalStore;

  const handleFinalFormSubmit = (values: any) => {
    const { ...teamSeason } = values;
    let newTeamSeason: ITeamSeason = {
      ...teamSeason,
      seasonId: season.id,
    };
    createTeamSeason(newTeamSeason).then(() => {
      toast.success(`Team succesfully assigned for ${season.name} season`);
      closeModal();
    });
  };

  useEffect(() => {
    loadTeams();
    loadDivisions();
  }, [loadTeams, loadDivisions]);

  if (loadingDivisions || loadingTeams)
    return (
      <Segment>
        <LoadingComponent content="Loading" />
      </Segment>
    );

  return (
    <FinalForm
      validate={validate}
      onSubmit={handleFinalFormSubmit}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form>
          <Header textAlign="center" color="teal">
            Assigned team for {season.name} season
          </Header>
          <Field
            name="divisionId"
            placeholder="Division"
            component={SelectInput}
            options={divisionOptions}
          />
          <Field
            name="teamId"
            placeholder="Team"
            component={SelectInput}
            options={teamOptions}
          />
          <Button
            onClick={() => handleSubmit()}
            disabled={invalid || pristine}
            floated="right"
            positive
            type="submit"
            content="Submit"
            style={{ marginBottom: 10 }}
            loading={submitting}
          />
        </Form>
      )}
    />
  );
};

export default observer(TeamSeasonForm);
