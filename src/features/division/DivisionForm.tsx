import React, { useContext } from "react";
import { Form, Button, Header } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { combineValidators, isRequired } from "revalidate";
import { observer } from "mobx-react-lite";
import { IDivision } from "../../app/models/division";

const validate = combineValidators({
  name: isRequired({ message: "Name is required" }),
  shortName: isRequired({ message: "ShortName is required" }),
  level: isRequired({ message: "Level is required" }),
});

const DivisionForm: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { createDivision, submitting } = rootStore.divisionStore;
  const { closeModal } = rootStore.modalStore;

  const handleFinalFormSubmit = (values: any) => {
    const { ...division } = values;
    let newDivision: IDivision = {
      ...division,
    };
    createDivision(newDivision).then(closeModal);
  };
  return (
    <FinalForm
      validate={validate}
      onSubmit={handleFinalFormSubmit}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form>
          <Header textAlign="center" color="teal">
            Create division
          </Header>
          <Field name="name" placeholder="Name" component={TextInput} />
          <Field
            name="shortName"
            placeholder="Short Name"
            component={TextInput}
          />
          <Field name="level" placeholder="Level" component={TextInput} />
          <Button
            onClick={() => handleSubmit()}
            disabled={invalid || pristine}
            floated="right"
            positive
            type="submit"
            content="Submit"
            loading={submitting}
            style={{ marginBottom: 10 }}
          />
        </Form>
      )}
    />
  );
};

export default observer(DivisionForm);
