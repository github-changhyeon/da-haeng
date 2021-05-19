import { React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import RouterInfo from 'src/constants/RouterInfo';
import { useHistory } from 'react-router-dom';
import BackgroundComp from 'src/components/BackgroundComp/BackgroundComp';
import $ from 'jquery';

import {
  Test,
  Test2,
  Test3,
  Test4,
  Home,
  Login,
  SignUp,
  Main,
  Tutorial,
  Exercise,
  Practice,
  Stages,
  Plaza,
  MyPage,
  Loading,
  About,
  Ahatech,
} from './pages';
import { LaptopWindowsOutlined } from '@material-ui/icons';

const AppRouter = () => {
  // 로그인이 되어 있을 경우
  if (sessionStorage.getItem('jwt')) {
    return <LoginRouter />;
  }
  // 로그인이 안되어 있을 경우
  else {
    return <NotLoginRouter />;
  }
};

const NotLoginRouter = () => {
  return (
    <Router>
      {/* TODO 배경 color 다르게 주고싶어 */}
      {/* <BackgroundComp color="blue" /> */}
      <Switch>
        <Route exact path={RouterInfo.PAGE_URLS.HOME} component={Home} />
        <Route path={RouterInfo.PAGE_URLS.LOGIN} component={Login} />
        <Route path={RouterInfo.PAGE_URLS.SIGNUP} component={SignUp} />
        <Route path={RouterInfo.PAGE_URLS.MAIN} component={Main} />
        <Route path={RouterInfo.PAGE_URLS.TUTORIAL} component={Tutorial} />
        <Route path={RouterInfo.PAGE_URLS.PLAZA} component={Plaza} />
        <Route path={RouterInfo.PAGE_URLS.TEST} component={Test} />
        <Route path={RouterInfo.PAGE_URLS.TEST2} component={Test2} />
        <Route path={RouterInfo.PAGE_URLS.TEST3} component={Test3} />
        <Route path={RouterInfo.PAGE_URLS.TEST4} component={Test4} />
        <Route path="*" component={Loading} />
      </Switch>
    </Router>
  );
};

const LoginRouter = () => {
  return (
    <Router>
      {/* TODO 배경 color 다르게 주고싶어 */}
      {/* <BackgroundComp color="blue" /> */}
      <Switch>
        <Route path={RouterInfo.PAGE_URLS.MAIN} component={Main} />
        <Route path={RouterInfo.PAGE_URLS.TUTORIAL} component={Tutorial} />
        <Route path={RouterInfo.PAGE_URLS.EXERCISE} component={Exercise} />
        <Route path={RouterInfo.PAGE_URLS.PRACTICE} component={Practice} />
        <Route path={RouterInfo.PAGE_URLS.STAGES} component={Stages} />
        <Route path={RouterInfo.PAGE_URLS.PLAZA} component={Plaza} />
        <Route path={RouterInfo.PAGE_URLS.MYPAGE} component={MyPage} />
        <Route path={RouterInfo.PAGE_URLS.TEST} component={Test} />
        <Route path={RouterInfo.PAGE_URLS.TEST2} component={Test2} />
        <Route path={RouterInfo.PAGE_URLS.TEST3} component={Test3} />
        <Route path={RouterInfo.PAGE_URLS.TEST4} component={Test4} />
        <Route path={RouterInfo.PAGE_URLS.ABOUT} component={About} />
        <Route path={RouterInfo.PAGE_URLS.AHATECH} component={Ahatech} />
        <Route path="*" component={Loading} />
      </Switch>
    </Router>
  );
};

function App() {
  useEffect(() => {
    $('.App').css({
      cursor: 'url(/images/pointer.png),auto',
    });
    // $('.App').css({
    //   cursor: 'url(https://greghub.github.io/coloron/public/svg/cursor.svg), pointer',
    // });
  }, []);

  return (
    <StylesProvider injectFirst>
      <BackgroundComp color="blue" />
      <div className="App">
        <AppRouter />
      </div>
    </StylesProvider>
  );
}

export default App;
