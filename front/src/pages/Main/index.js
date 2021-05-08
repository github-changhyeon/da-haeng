import { React } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import RouterInfo from 'src/constants/RouterInfo';
import { restApi } from 'src/common/axios/index';
import Header from 'src/components/Header/Header';

export default function Main() {
  const history = useHistory();

  function onClickCheck() {
    console.log('확인하쟈');

    // const token = window.localStorage.getItem('jwt');
    const token = sessionStorage.getItem('jwt');

    const instance = restApi();
    instance
      .get(`/users`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          console.log('성공');
          console.log(res.data);
        } else {
          console.log('반만 성공');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('실패!!!!');
      });
    return;
  }

  return (
    <div className={styles.main_background}>
      <Header />
      <div className={styles.main_container}>
        {/* <img
          className={styles.bus_container_image}
          src="/images/burger_container.png"
          alt="container"
        ></img> */}
      </div>
      {/* <button onClick={onClickCheck}>눌러바</button> */}
    </div>
  );
}
