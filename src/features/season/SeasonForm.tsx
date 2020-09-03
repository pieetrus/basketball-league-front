import React, { useContext, Fragment } from "react";
import { Form, Button, Header, Checkbox, Grid } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import TextInput from "../../app/common/form/TextInput";
import DateInput from "../../app/common/form/DateInput";
import { ISeason } from "../../app/models/season";
import { toast } from "react-toastify";
import LoadingComponent from "../../app/layout/LoadingComponent";

interface IProps {
  season?: ISeason;
}

const SeasonForm: React.FC<IProps> = ({ season }) => {
  const rootStore = useContext(RootStoreContext);

  const {
    saving,
    createSeason,
    editSeason,
    loadSeasons,
    loadingInitial,
  } = rootStore.seasonStore;
  const { divisionsByLevel } = rootStore.divisionStore;
  const { closeModal } = rootStore.modalStore;

  const handleFinalFormSubmit = (values: any) => {
    const { ...season } = values;
    let divisionsId = getSelectedDivisions();
    let newSeason: ISeason = {
      ...season,
      divisionsId,
    };
    if (season.id) {
      editSeason(newSeason).then(() => {
        toast.info(`Season succesfully edited`);
        closeModal();
      });
    } else {
      createSeason(newSeason).then(() => {
        toast.success(`Season succesfully created`);
        loadSeasons().then(() => closeModal());
      });
    }
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
      initialValues={season}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form style={{ position: "relative" }}>
          {season && (
            <Header textAlign="center" color="teal">
              Edit season {season.name}
            </Header>
          )}
          {!season && (
            <Header textAlign="center" color="teal">
              Create season
            </Header>
          )}
          <Field
            name="name"
            placeholder="Name"
            component={TextInput}
            value={season?.name}
          />
          <Field
            name="startDate"
            placeholder="Start Date"
            component={DateInput}
            value={new Date(season?.startDate!)}
            date={true}
          />
          <Field
            name="endDate"
            placeholder="End Date"
            value={new Date(season?.endDate!)}
            component={DateInput}
            date={true}
          />
          <Form.Group style={{ textAlign: "center" }}>
            <Grid className="segment centered">
              <Header content="Select divisions" style={{ marginTop: 10 }} />
              {divisionsByLevel.map((division) => (
                <Fragment key={division.id}>
                  <Checkbox
                    label={division.name}
                    name={division.id?.toString()}
                    id={division.id}
                    defaultChecked={
                      season?.divisions.filter((el) => {
                        return el.id === division.id;
                      }).length! > 0
                    }
                    style={{ marginTop: 10 }}
                  />
                  <br />
                </Fragment>
              ))}
            </Grid>
          </Form.Group>

          {season && (
            <Button
              onClick={() => handleSubmit()}
              disabled={invalid || pristine}
              floated="right"
              positive
              type="submit"
              content="Save changes"
              style={{ marginBottom: 10 }}
              loading={saving}
            />
          )}
          {!season && (
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
          )}
        </Form>
      )}
    />
  );
};

export default observer(SeasonForm);
