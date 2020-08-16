import React, { useContext } from "react";
import { Form, Button, Header } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { ISeason } from "../../app/models/season";
import { toast } from "react-toastify";
import TextInput from "../../app/common/form/TextInput";
import DateInput from "../../app/common/form/DateInput";

const SeasonForm: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { saving, createSeason } = rootStore.seasonStore;

  const { closeModal } = rootStore.modalStore;

  const handleFinalFormSubmit = (values: any) => {
    const { ...season } = values;
    let newSeason: ISeason = {
      ...season,
    };
    createSeason(newSeason).then(() => {
      toast.success(`Season succesfully created`);
      closeModal();
    });
  };

  return (
    <FinalForm
      onSubmit={handleFinalFormSubmit}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form>
          <Header textAlign="center" color="teal">
            Create season
          </Header>
          <Field name="name" placeholder="Name" component={TextInput} />
          <Field
            name="startDate"
            placeholder="Start Date"
            component={DateInput}
            date={true}
          />
          <Field
            name="endDate"
            placeholder="End Date"
            component={DateInput}
            date={true}
          />
          <Button
            onClick={() => handleSubmit()}
            disabled={invalid || pristine}
            floated="right"
            positive
            type="submit"
            content="Submit"
            style={{ marginBottom: 10 }}
            loading={saving}
          />
        </Form>
      )}
    />
  );
};

export default observer(SeasonForm);
