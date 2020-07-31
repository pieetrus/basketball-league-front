import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import PlayerDashboard from "../../features/players/dashboard/PlayerDashboard";
import { observer } from "mobx-react-lite";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import PlayerForm from "../../features/players/form/PlayerForm";
import PlayerDetails from "../../features/players/details/PlayerDetails";
import "mobx-react-lite/batchingForReactDom";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import LoginForm from "../../features/user/LoginForm";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/players" component={PlayerDashboard} />
                <Route path="/players/:id" component={PlayerDetails} />
                <Route
                  key={location.key}
                  path={["/createPlayer", "/manage/:id"]}
                  component={PlayerForm}
                />
                <Route path="/login" component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
};

export default withRouter(observer(App));
