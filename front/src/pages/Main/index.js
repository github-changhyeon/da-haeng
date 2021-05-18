import { React, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import RouterInfo from 'src/constants/RouterInfo';
import { restApi } from 'src/common/axios/index';
import Header from 'src/components/Header/Header';
import CardComp from 'src/components/CardComp/CardComp';
import classNames from 'classnames';
import $ from 'jquery';
import { TurnedIn } from '@material-ui/icons';

export default function Main() {
  const history = useHistory();

  useEffect(() => {
    if (sessionStorage.getItem('jwt') != null) {
      const instance = restApi();

      instance
        .get(`/users`, {
          headers: {
            Authorization: sessionStorage.getItem('jwt'),
          },
        })
        .then((res) => {
          if (res.status == 200) {
            console.log('성공');
          } else {
            console.log('반만 성공');
          }
        })
        .catch((err) => {
          console.log(err);
          alert('실패!!!!');
        });
    } else {
      console.log('main/ jwt 토큰 없음 !!');
    }
  });

  const onClickNext = () => {
    $('.main_container').css('transform', 'translateX(-100vw)');
    $('.main_container').css('transition', 'all 1s ease-in-out');
  };

  const onClickPrev = () => {
    $('.main_container').css('transform', 'translateX(0)');
    $('.main_container').css('transition', 'all 1s ease-in-out');
  };

  return (
    <div className={styles.main_background}>
      <Header />
      <div className={classNames({ [styles.main_container]: true, ['main_container']: true })}>
        <div className={styles.burger_container}>
          <div
            className={styles.burger_image}
            style={{
              background: `url('/images/burger_container.png') center center`,
              backgroundSize: '100% 100%',
            }}
          >
            <div className={styles.burger_cards}>
              <CardComp type="burger_tutorial" />
              <CardComp type="burger_exercise" />
              <CardComp type="burger_practice" />
            </div>
          </div>
          <div className={styles.next_arrow}>
            <div
              className={classNames({
                [styles.arrow]: true,
                [styles.bounce]: true,
              })}
              onClick={onClickNext}
            ></div>
          </div>
        </div>
        <div className={styles.bus_container}>
          <div className={styles.prev_arrow}>
            <div
              className={classNames({
                [styles.arrow]: true,
                [styles.bounce]: true,
              })}
              onClick={onClickPrev}
            ></div>
          </div>
          <div
            className={styles.bus_image}
            style={{
              background: `url('/images/bus_container.png') center center`,
              backgroundSize: '100% 100%',
            }}
          >
            <div className={styles.bus_cards}>
              <CardComp type="bus_tutorial" />
              <CardComp type="bus_exercise" />
              <CardComp type="bus_practice" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
