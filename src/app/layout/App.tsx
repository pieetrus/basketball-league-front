import React, { useContext, useEffect } from "react";
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
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";
import ManagerDashboard from "../../features/manager/ManagerDashboard";
import TeamDashboard from "../../features/teams/dashboard/TeamDashboard";
import TeamForm from "../../features/teams/form/TeamForm";
import TeamDetails from "../../features/teams/details/TeamDetails";
import SeasonDashboard from "../../features/season/SeasonDashboard";
import DivisionDashboard from "../../features/division/DivisionDashboard";
import StatsProgramDashboard from "../../features/statsProgram/StatsProgramDashboard";
import MatchManagerDashboard from "../../features/matchManager/MatchManagerDashboard";
import StatsDashboard from "../../features/stats/StatsDashboard";
import ScheduleDashoard from "../../features/schedule/ScheduleDashoard";
import MatchDashboard from "../../features/match/MatchDashboard";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingComponent content="Loading app" />;

  return (
    <>
      <ModalContainer />
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
                <Route exact path="/teams" component={TeamDashboard} />
                <Route path="/players/:id" component={PlayerDetails} />
                <Route path="/teams/:id" component={TeamDetails} />
                <Route
                  key={location.key}
                  path={["/manager/createPlayer", "/manager/player/:id"]}
                  component={PlayerForm}
                />
                <Route
                  key={location.key}
                  path={["/manager/createTeam", "/manager/team/:id"]}
                  component={TeamForm}
                />
                <Route path="/profile/:username" component={ProfilePage} />
                <Route path="/login" component={LoginForm} />
                <Route path="/matchManager" component={MatchManagerDashboard} />
                <Route path="/statsProgram" component={StatsProgramDashboard} />
                <Route
                  path="/statsProgram:id"
                  component={StatsProgramDashboard}
                />
                <Route exact path="/manager" component={ManagerDashboard} />
                <Route path="/manager/season" component={SeasonDashboard} />
                <Route path="/manager/division" component={DivisionDashboard} />
                {/* <Route path="/test" component={FoulModal} /> */}
                <Route path="/match/:id" component={MatchDashboard} />
                <Route path="/stats" component={StatsDashboard} />
                <Route path="/schedule" component={ScheduleDashoard} />
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
