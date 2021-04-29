import { React } from 'react';
import CardComp from 'src/components/CardComp/CardComp';
import ProfileComp from 'src/components/ProfileComp/ProfileComp';
import StepComp from 'src/components/StepComp/StepComp';
import Header from 'src/components/Header/Header';
import Button from 'src/components/Button/Button';
import RouterInfo from 'src/constants/RouterInfo';
import { useHistory, generatePath } from 'react-router';

export default function Test3() {
  const history = useHistory();

  return (
    <div>
      <Header />
      <CardComp type="burger_tutorial" />
      <CardComp type="burger_exercise" />
      <CardComp type="burger_practice" />
      <br />
      <CardComp type="bus_tutorial" />
      <CardComp type="bus_exercise" />
      <CardComp type="bus_practice" />
      <Button
        onClickFunc={() => {
          history.push({
            pathname: generatePath(RouterInfo.PAGE_URLS.LOGIN),
          });
        }}
        text="로그인"
        width="160px"
        color="#ffc531"
        colorDeep="#ca9100"
      />
      <Button
        onClickFunc={() => {
          history.push({
            pathname: generatePath(RouterInfo.PAGE_URLS.SIGNUP),
          });
        }}
        text="회원가입"
        width="160px"
        color="#fb9cbb"
        colorDeep="#f73a78"
      />

      <ProfileComp role="ROLE_ADMIN" />
      <ProfileComp role="ROLE_STUDENT" />

      <StepComp />
    </div>
  );
}
