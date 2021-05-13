import { React } from 'react';
import CardComp from 'src/components/CardComp/CardComp';
import ProfileComp from 'src/components/ProfileComp/ProfileComp';
import StepComp from 'src/components/StepComp/StepComp';
import Header from 'src/components/Header/Header';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import ProgressComp from 'src/components/ProgressComp/ProgressComp';
import BackgroundComp from 'src/components/BackgroundComp/BackgroundComp';
import RouterInfo from 'src/constants/RouterInfo';
import { useHistory, generatePath } from 'react-router';

export default function Test3() {
  const history = useHistory();

  const burgerStageResult = 3;
  const busStageResult = 1;
  const name = '박건후';

  return (
    <div>
      <Header />
      <BackgroundComp color="blue" />
      <CardComp type="burger_tutorial" />
      <CardComp type="burger_exercise" />
      <CardComp type="burger_practice" />
      <br />
      <CardComp type="bus_tutorial" />
      <CardComp type="bus_exercise" />
      <CardComp type="bus_practice" />
      <ButtonComp
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
      <ButtonComp
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

      <ProfileComp role="ROLE_ADMIN" name={name} />
      <ProfileComp role="ROLE_STUDENT" name={name} />

      <ProgressComp percent="33" />
      <StepComp type="burger" max={burgerStageResult} />
      <StepComp type="bus" max={busStageResult} />
    </div>
  );
}
