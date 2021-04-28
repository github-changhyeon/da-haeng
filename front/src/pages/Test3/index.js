import { React } from 'react';
import CardComp from 'src/components/CardComp/CardComp';
import HomeComp from 'src/components/HomeComp/HomeComp';
import ProfileComp from 'src/components/ProfileComp/ProfileComp';
import StepComp from 'src/components/StepComp/StepComp';
import UserComp from 'src/components/UserComp/UserComp';
import Header from 'src/components/Header/Header';

export default function Test3() {
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
      <HomeComp />
      <ProfileComp />
      <StepComp />
      <UserComp />
    </div>
  );
}