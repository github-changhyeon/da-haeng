import { React } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import RouterInfo from 'src/constants/RouterInfo';

import {
  Test,
  Test2,
  Test3,
  Home,
  Login,
  SignUp,
  Main,
  Tutorial,
  Exercise,
  Practice,
  MyPage,
} from './pages';
function App() {
  return (
    <StylesProvider injectFirst>
      <Router>
        <Switch>
          <Route exact path={RouterInfo.PAGE_URLS.HOME} component={Home} />
          <Route path={RouterInfo.PAGE_URLS.LOGIN} component={Login} />
          <Route path={RouterInfo.PAGE_URLS.SIGNUP} component={SignUp} />
          <Route path={RouterInfo.PAGE_URLS.MAIN} component={Main} />
          <Route path={RouterInfo.PAGE_URLS.TUTORIAL} component={Tutorial} />
          <Route path={RouterInfo.PAGE_URLS.EXERCISE} component={Exercise} />
          <Route path={RouterInfo.PAGE_URLS.PRACTICE} component={Practice} />
          <Route path={RouterInfo.PAGE_URLS.MYPAGE} component={MyPage} />
          <Route path={RouterInfo.PAGE_URLS.TEST} component={Test} />
          <Route path={RouterInfo.PAGE_URLS.TEST2} component={Test2} />
          <Route path={RouterInfo.PAGE_URLS.TEST3} component={Test3} />
        </Switch>
      </Router>
    </StylesProvider>
  );
}

export default App;
