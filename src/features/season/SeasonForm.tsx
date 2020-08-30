import React, { useContext, Fragment } from "react";
import { Form, Button, Header, Segment, Checkbox } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import TextInput from "../../app/common/form/TextInput";
import DateInput from "../../app/common/form/DateInput";
import { ISeason } from "../../app/models/season";
import { toast } from "react-toastify";
import LoadingComponent from "../../app/layout/LoadingComponent";

const SeasonForm: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const {
    saving,
    createSeason,
    loadSeasons,
    loadingInitial,
  } = rootStore.seasonStore;
  const { divisionsByName } = rootStore.divisionStore;
  const { closeModal } = rootStore.modalStore;

  const handleFinalFormSubmit = (values: any) => {
    const { ...season } = values;
    let divisionsId = getSelectedDivisions();
    let newSeason: ISeason = {
      ...season,
      divisionsId,
    };
    createSeason(newSeason).then(() => {
      toast.success(`Season succesfully created`);
      loadSeasons().then(() => closeModal());
    });
    console.log(values);
  };

  const getSelectedDivisions = () => {
    let checkboxes = [];
    let selectedDivisions = [];
    let inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type === "checkbox") {
        checkboxes.push(inputs[i]);
        if (inputs[i].checked) {
          selectedDivisions.push(Number.parseInt(inputs[i].id));
        }
      }
    }
    return selectedDivisions;
  };

  if (loadingInitial) return <LoadingComponent content="Loading ..." />;

  return (
    <FinalForm
      onSubmit={handleFinalFormSubmit}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form style={{ position: "relative" }}>
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
          <Form.Group style={{ textAlign: "left" }}>
            <Segment>
              <Header content="Select divisions for this season" />
              {divisionsByName.map((division) => (
                <Fragment key={division.id}>
                  <Checkbox
                    label={division.name}
                    name={division.id?.toString()}
                    id={division.id}
                  />
                  <br />
                </Fragment>
              ))}
            </Segment>
          </Form.Group>

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
