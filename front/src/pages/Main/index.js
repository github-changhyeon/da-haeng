import { React, useEffect, useState, useRef } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import RouterInfo from 'src/constants/RouterInfo';
import { restApi } from 'src/common/axios/index';
import Header from 'src/components/Header/Header';
import CardComp from 'src/components/CardComp/CardComp';

export default function Main() {
  const history = useHistory();
  const slideRef = useRef(null);

  const [slide, setSlide] = useState('burger');

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

  const onClickBtn = () => {
    alert('버튼 눌러써?');
    setSlide('bus');
    // slideRef.current.style.styles.transition = 'all 0.5s ease-in-out';
    // slideRef.current.style.styles.transform = 'translateX(-100%)';
  };

  return (
    <div className={styles.main_background}>
      <Header />
      <div className={styles.main_container}>
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
          <button onClick={onClickBtn}>다음</button>
        </div>
        <div className={styles.bus_container}>
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
