import { React, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import RouterInfo from 'src/constants/RouterInfo';
import { restApi } from 'src/common/axios/index';
import Header from 'src/components/Header/Header';
import $ from 'jquery';

export default function Practice() {
  const history = useHistory();

  const [iconPath, setIconPath] = useState('');
  const [resultNum, setResultNum] = useState(0);

  useEffect(() => {
    if (resultNum === 0) {
      $('.stage_1').show();
      $('.stage_2').hide();
      $('.stage_3').hide();
      $('.stage_4').hide();
      $('.stage_5').hide();
    } else if (resultNum === 1) {
      $('.stage_1').hide();
      $('.stage_2').show();
      $('.stage_3').hide();
      $('.stage_4').hide();
      $('.stage_5').hide();
    } else if (resultNum === 2) {
      $('.stage_1').hide();
      $('.stage_2').hide();
      $('.stage_3').show();
      $('.stage_4').hide();
      $('.stage_5').hide();
    } else if (resultNum === 3) {
      $('.stage_1').hide();
      $('.stage_2').hide();
      $('.stage_3').hide();
      $('.stage_4').show();
      $('.stage_5').hide();
    } else if (resultNum === 4 || resultNum === 5) {
      $('.stage_1').hide();
      $('.stage_2').hide();
      $('.stage_3').hide();
      $('.stage_4').hide();
      $('.stage_5').show();
    }
  }, [resultNum]);

  useEffect(() => {
    if (sessionStorage.getItem('jwt') != null) {
      const instance = restApi();

      // 도전하기 Stage 현황 불러오기 axios
      instance
        .get(`/stage`, {
          headers: {
            Authorization: sessionStorage.getItem('jwt'),
          },
        })
        .then((res) => {
          if (res.status == 200) {
            console.log('성공');
            if (window.location.pathname === '/practice/burger') {
              setResultNum(res.data.burgerStageResult);
              setIconPath('/images/dahamzzi/ch_burger.png');
            } else if (window.location.pathname === '/practice/bus') {
              setResultNum(res.data.busStageResult);
              setIconPath('/images/dahamzzi/ch_bus.png');
            }
          } else {
            console.log('반만 성공');
          }
        })
        .catch((err) => {
          console.log(err);
          alert('내 정보를 불러오는 중에 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
        });
    } else {
      console.log('mypage/ jwt 토큰 없음 !!');
    }
  }, []);

  useEffect(() => {
    console.log('iconNum: ' + resultNum);
  }, [resultNum]);

  return (
    <div className={styles.practice_container}>
      <Header />
      <div
        className={styles.cloud_1}
        style={{
          background: `url('/images/cloud_1.png') center center`,
          backgroundSize: '100% 100%',
          top: '300px',
          left: '100px',
        }}
      >
        <div className="stage_1">
          <img className={styles.ch_bus_icon} src={iconPath} alt="icon" />
        </div>
        <div className={styles.cloud_text}>1</div>
      </div>
      <div
        className={styles.cloud_1}
        style={{
          background: `url('/images/cloud_1.png') center center`,
          backgroundSize: '100% 100%',
          top: '110px',
          left: '390px',
        }}
      >
        <div className="stage_2">
          <img className={styles.ch_bus_icon} src={iconPath} alt="icon" />
        </div>
        <div className={styles.cloud_text}>2</div>
      </div>
      <div
        className={styles.cloud_1}
        style={{
          background: `url('/images/cloud_1.png') center center`,
          backgroundSize: '100% 100%',
          top: '420px',
          left: '630px',
        }}
      >
        <div className="stage_3">
          <img className={styles.ch_bus_icon} src={iconPath} alt="icon" />
        </div>
        <div className={styles.cloud_text}>3</div>
      </div>
      <div
        className={styles.cloud_1}
        style={{
          background: `url('/images/cloud_1.png') center center`,
          backgroundSize: '100% 100%',
          top: '180px',
          left: '900px',
        }}
      >
        <div className="stage_4">
          <img className={styles.ch_bus_icon} src={iconPath} alt="icon" />
        </div>
        <div className={styles.cloud_text}>4</div>
      </div>
      {/* <div className={styles.cloud}></div> */}
      <div
        className={styles.cloud_1}
        style={{
          background: `url('/images/cloud_1.png') center center`,
          backgroundSize: '100% 100%',
          top: '340px',
          left: '1200px',
        }}
      >
        <div className="stage_5">
          <img className={styles.ch_bus_icon} src={iconPath} alt="icon" />
        </div>
        <div className={styles.cloud_text}>5</div>
      </div>
    </div>
  );
}
