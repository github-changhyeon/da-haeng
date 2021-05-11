import { React, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import RouterInfo from 'src/constants/RouterInfo';
import { restApi } from 'src/common/axios/index';
import Header from 'src/components/Header/Header';
import CardComp from 'src/components/CardComp/CardComp';

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
            console.log('main/ uid :' + res.data.id);
            sessionStorage.setItem('uid', res.data.id);
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

  return (
    <div className={styles.main_background}>
      <Header />
      <div className={styles.main_container}>
        <div
          className={styles.burger_container}
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
      </div>
    </div>
  );
}
