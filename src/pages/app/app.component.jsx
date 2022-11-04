import React, { useState, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import Burger from '../../components/burger/burger.component';
import Menu from '../../components/menu/menu.component';

import SideNav from '../../components/side-nav/side-nav.component';
import Spinner from '../../components/spinner/spinner.component';

import './app.styles.scss';

const TimeTracker = lazy(() =>
  import('../app-pages/timetracker/timetracker.component'),
);

const Dashboard = lazy(() =>
  import('../app-pages/dashboard/dashboard.component'),
);

const Report = lazy(() =>
  import('../app-pages/report/report.component'),
);

const Projects = lazy(() =>
  import('../app-pages/projects/projects.component'),
);

const Team = lazy(() => import('../app-pages/teams/teams.component'));

const Clients = lazy(() =>
  import('../app-pages/clients/clients.component'),
);

const Categories = lazy(() =>
  import('../app-pages/categories/categories.component'),
);

const Workspaces = lazy(() =>
  import('../app-pages/workspaces/workspaces.component'),
);

const WorkspaceSettings = lazy(() =>
  import(
    '../app-pages/workspace-settings/workspace-settings.component'
  ),
);

const OperatingExpenses = lazy(() =>
  import(
    '../app-pages/operating-expenses/operating-expenses.component'
  ),
);

const MaterialExpenses = lazy(() =>
  import(
    '../app-pages/material-expenses/material-expenses.component'
  ),
);

const ChargesAquisition = lazy(() =>
  import(
    '../app-pages/charges-aquisition/charges-aquisition.component'
  ),
);

const CAReport = lazy(() =>
  import('../app-pages/ca-report/report.component'),
);

const App = ({ match }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex' }}>
      <SideNav />

      <div>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} />
      </div>
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route
            exact
            path={`${match.path}`}
            component={TimeTracker}
          />
          <Route
            exact
            path={`${match.path}/dashboard`}
            component={Dashboard}
          />
          <Route
            exact
            path={`${match.path}/report`}
            component={Report}
          />
          <Route
            exact
            path={`${match.path}/projects`}
            component={Projects}
          />
          <Route exact path={`${match.path}/team`} component={Team} />
          <Route
            exact
            path={`${match.path}/clients`}
            component={Clients}
          />
          <Route
            exact
            path={`${match.path}/categories`}
            component={Categories}
          />
          <Route
            exact
            path={`${match.path}/workspaces`}
            component={Workspaces}
          />
          <Route
            exact
            path={`${match.path}/workspace-settings`}
            component={WorkspaceSettings}
          />
          <Route
            exact
            path={`${match.path}/operating-expenses`}
            component={OperatingExpenses}
          />
          <Route
            exact
            path={`${match.path}/material-expenses`}
            component={MaterialExpenses}
          />
          <Route
            exact
            path={`${match.path}/charges-aquisition`}
            component={ChargesAquisition}
          />
          <Route
            exact
            path={`${match.path}/ca-report`}
            component={CAReport}
          />
        </Suspense>
      </Switch>
    </div>
  );
};

export default App;
