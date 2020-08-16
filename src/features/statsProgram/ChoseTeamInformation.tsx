import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Header, Form, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import SelectInput from "../../app/common/form/SelectInput";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { IMatch } from "../../app/models/match";
import { history } from "../..";

interface IProps {
  startDate: number;
  divisionId: number;
}

const ChoseTeamInformation: React.FC<IProps> = ({ startDate, divisionId }) => {
  const rootStore = useContext(RootStoreContext);
  const { options, loadingInitial } = rootStore.teamStore;
  const { createMatch } = rootStore.matchStore;

  const handleFinalFormSubmit = (values: any) => {
    const { ...match } = values;
    let newMatch: IMatch = {
      ...match,
      startDate,
      divisionId,
    };
    console.log(newMatch);
    createMatch(newMatch).then((id) => history.push(`/statsProgram/`));
  };

  if (loadingInitial) return <LoadingComponent content="Loading..." />;

  return (
    <FinalForm
      onSubmit={(values: IMatch) => handleFinalFormSubmit(values)}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Chose teams"
            color="teal"
            textAlign="center"
          />
          <Field
            name="teamHomeId"
            component={SelectInput}
            placeholder="Team 1"
            options={options}
          />
          <Field
            name="teamGuestId"
            component={SelectInput}
            placeholder="Team 2"
            options={options}
          />

          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
              text="Invalid email or password"
            />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="teal"
            fluid
            content="Add Match"
          />
        </Form>
      )}
    />
  );
};

export default observer(ChoseTeamInformation);
