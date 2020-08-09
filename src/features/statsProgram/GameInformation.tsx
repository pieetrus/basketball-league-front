import React, { useContext, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Button, Header, Form } from "semantic-ui-react";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import { RootStoreContext } from "../../app/stores/rootStore";
import DateInput from "../../app/common/form/DateInput";
import SelectInput from "../../app/common/form/SelectInput";
import ChoseTeamInformation from "./ChoseTeamInformation";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";

const GameInformation = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  const { loadingInitial, options } = rootStore.divisionStore;

  const handleFinalFormSubmit = (values: any) => {
    openModal(
      <ChoseTeamInformation
        startDate={values.startDate}
        divisionId={values.divisionId}
      />
    );
  };

  if (loadingInitial) return <LoadingComponent content="Loading..." />;

  return (
    <FinalForm
      onSubmit={(values) => handleFinalFormSubmit(values)}
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
            content="Game Information"
            color="teal"
            textAlign="center"
          />
          <Field
            name="startDate"
            placeholder="Date of match"
            date={true}
            time={true}
            component={DateInput}
          />
          <Field
            name="divisionId"
            placeholder="Division"
            component={SelectInput}
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
            content="Next"
          />
        </Form>
      )}
    />
  );
};

export default observer(GameInformation);
