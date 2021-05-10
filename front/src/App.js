import { React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import RouterInfo from 'src/constants/RouterInfo';
import { useHistory } from 'react-router-dom';
import BackgroundComp from 'src/components/BackgroundComp/BackgroundComp';

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
  Plaza,
  MyPage,
} from './pages';

const AppRouter = () => {
  const history = useHistory();

  const [isLogined, setIsLogined] = useState(false);

  // // 로그인한 사용자가 있다면 탭/브라우저 종료시 로그아웃
  // useEffect(() => {
  //   if (isLogined) {
  //     window.addEventListener('unload', onLogout);
  //     return () => {
  //       window.removeEventListener('unload', onLogout);
  //     };
  //   }
  // });

  // const onLogout = () => {
  //   sessionStorage.removeItem('jwt');
  //   // window.localStorage.clear();
  //   console.log(sessionStorage);

  //   // alert('로그아웃이 완료되었습니다.');
  //   history.push(RouterInfo.PAGE_URLS.HOME);
  // };

  useEffect(() => {
    if (sessionStorage.getItem('jwt')) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, [sessionStorage.getItem('jwt')]);

  // 로그인이 되어 있을 경우
  if (isLogined) {
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
      <BackgroundComp color="blue" />
      <Switch>
        <Route exact path={RouterInfo.PAGE_URLS.HOME} component={Home} />
        <Route path={RouterInfo.PAGE_URLS.LOGIN} component={Login} />
        <Route path={RouterInfo.PAGE_URLS.SIGNUP} component={SignUp} />
        <Route path={RouterInfo.PAGE_URLS.MAIN} component={Main} />
        <Route path={RouterInfo.PAGE_URLS.TUTORIAL} component={Tutorial} />
        <Route path={RouterInfo.PAGE_URLS.PLAZA} component={Plaza} />
        <Route path={RouterInfo.PAGE_URLS.TEST} component={Test} />
        <Route path={RouterInfo.PAGE_URLS.TEST2} component={Test2} />
        {/* <Route path={RouterInfo.PAGE_URLS.TEST3} component={Test3} /> */}
        <Route path="*" component={Test3} />
        <Route path={RouterInfo.PAGE_URLS.TEST4} component={Test4} />
      </Switch>
    </Router>
  );
};

const LoginRouter = () => {
  return (
    <Router>
      {/* TODO 배경 color 다르게 주고싶어 */}
      <BackgroundComp color="blue" />
      <Switch>
        <Route path={RouterInfo.PAGE_URLS.MAIN} component={Main} />
        <Route path={RouterInfo.PAGE_URLS.TUTORIAL} component={Tutorial} />
        <Route path={RouterInfo.PAGE_URLS.EXERCISE} component={Exercise} />
        <Route path={RouterInfo.PAGE_URLS.PRACTICE} component={Practice} />
        <Route path={RouterInfo.PAGE_URLS.PLAZA} component={Plaza} />
        <Route path={RouterInfo.PAGE_URLS.MYPAGE} component={MyPage} />
        <Route path={RouterInfo.PAGE_URLS.TEST} component={Test} />
        <Route path={RouterInfo.PAGE_URLS.TEST2} component={Test2} />
        {/* <Route path={RouterInfo.PAGE_URLS.TEST3} component={Test3} /> */}
        <Route path="*" component={Test3} />
        <Route path={RouterInfo.PAGE_URLS.TEST4} component={Test4} />
      </Switch>
    </Router>
  );
};

function App() {
  return (
    <StylesProvider injectFirst>
      <AppRouter />
    </StylesProvider>
  );
}

export default App;
