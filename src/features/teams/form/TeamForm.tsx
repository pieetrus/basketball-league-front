import React, { useState, useContext, useEffect, Fragment } from "react";
import {
  Segment,
  Form,
  Button,
  Grid,
  GridColumn,
  Image,
  Header,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import { combineValidators, isRequired } from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ManagerNavBar from "../../nav/ManagerNavBar";
import PhotoUploadWidget from "../../../app/common/photoUpload/PhotoUploadWidget";
import { TeamFormValues, ITeam } from "../../../app/models/team";

const validate = combineValidators({
  name: isRequired({ message: "Name is required" }),
  shortName: isRequired({ message: "ShortName is required" }),
});

interface DetailParams {
  id: string;
}

const TeamForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);

  const { createTeam, editTeam, submitting, loadTeam } = rootStore.teamStore;

  const { uploadLogo, uploadingLogo } = rootStore.teamStore;

  const [team, setTeam] = useState(new TeamFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      let teamId = Number.parseInt(match.params.id);
      loadTeam(teamId)
        .then((team) => setTeam(new TeamFormValues(team)))
        .finally(() => setLoading(false));
    }
  }, [loadTeam, match.params.id]);

  const handleUploadImage = (photo: Blob) => {
    uploadLogo(photo, team.id!);
    history.push(`/teams/${team.id}`);
  };

  const handleFinalFormSubmit = (values: any) => {
    const { ...team } = values;
    if (!team.id) {
      let newTeam: ITeam = {
        ...team,
      };
      createTeam(newTeam).then((id) => history.push(`/teams/${id}`));
    } else {
      editTeam(team).then(() => {
        history.push(`/teams/${team.id}`);
      });
    }
  };

  return (
    <Fragment>
      <ManagerNavBar />

      <Grid>
        <Grid.Column width={6}>
          <Segment clearing>
            <FinalForm
              validate={validate}
              initialValues={team}
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form loading={loading}>
                  <Field
                    name="name"
                    placeholder="Name"
                    value={team.name}
                    component={TextInput}
                  />
                  <Field
                    name="shortName"
                    placeholder="Short Name"
                    value={team.shortName}
                    component={TextInput}
                  />
                  <Button
                    onClick={() => handleSubmit()}
                    disabled={loading || invalid || pristine}
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                    loading={submitting}
                  />
                  <Button
                    onClick={
                      team.id
                        ? () => history.push(`/teams/${team.id}`)
                        : () => history.push("/teams")
                    }
                    disabled={loading}
                    floated="right"
                    type="submit"
                    content="Cancel"
                  />
                </Form>
              )}
            />
          </Segment>
        </Grid.Column>
        <GridColumn width={10}>
          <Segment>
            <Header textAlign="center">Upload new logo</Header>
            {team.logoUrl && (
              <p style={{ color: "#ffa300", textAlign: "center" }}>
                This will delete and replace your current logo
              </p>
            )}
            <PhotoUploadWidget
              uploadPhoto={handleUploadImage}
              loading={uploadingLogo}
            />
          </Segment>
        </GridColumn>
      </Grid>
      {team.logoUrl && (
        <Image
          src={team.logoUrl}
          size="medium"
          style={{ left: 350, top: 60, position: "relative" }}
          avatar={true}
        />
      )}
    </Fragment>
  );
};

export default observer(TeamForm);
