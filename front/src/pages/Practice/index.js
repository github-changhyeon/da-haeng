import { React, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import RouterInfo from 'src/constants/RouterInfo';
import { restApi } from 'src/common/axios/index';
import Header from 'src/components/Header/Header';
import $ from 'jquery';

export default function Practice() {
  const history = useHistory();

  const [now, setNow] = useState('');
  const [iconPath, setIconPath] = useState('');
  // TODO 실데이터로 바꾸기
  const show = 3;

  useEffect(() => {
    if (window.location.pathname === '/practice/burger') {
      setNow('burger');
    } else if (window.location.pathname === '/practice/bus') {
      setNow('bus');
    }
  }, []);

  useEffect(() => {
    if (now === 'burger') {
      setIconPath('/images/dahamzzi/ch_burger.png');
    } else if (now === 'bus') {
      setIconPath('/images/dahamzzi/ch_bus.png');
    }
  }, [now]);

  useEffect(() => {
    if (show === 3) $('.stage_3').show();
  }, [show]);

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
        <div className="stage_1" style={{ display: 'none' }}>
          <img className={styles.ch_bus_icon} src={iconPath} alt="icon" />
        </div>
        <div className={styles.cloud_text}>1</div>
      </div>
      <div
        className={styles.cloud_2}
        style={{
          background: `url('/images/cloud_3.png') center center`,
          backgroundSize: '100% 100%',
          top: '110px',
          left: '390px',
        }}
      >
        <div className="stage_2" style={{ display: 'none' }}>
          <img className={styles.ch_bus_icon} src={iconPath} alt="icon" />
        </div>
        <div className={styles.cloud_text}>2</div>
      </div>
      <div
        className={styles.cloud_2}
        style={{
          background: `url('/images/cloud_3.png') center center`,
          backgroundSize: '100% 100%',
          top: '420px',
          left: '630px',
        }}
      >
        <div className="stage_3" style={{ display: 'none' }}>
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
        <div className="stage_4" style={{ display: 'none' }}>
          <img className={styles.ch_bus_icon} src={iconPath} alt="icon" />
        </div>
        <div className={styles.cloud_text}>4</div>
      </div>
      <div
        className={styles.cloud_1}
        style={{
          background: `url('/images/cloud_1.png') center center`,
          backgroundSize: '100% 100%',
          top: '340px',
          left: '1200px',
        }}
      >
        <div className="stage_5" style={{ display: 'none' }}>
          <img className={styles.ch_bus_icon} src={iconPath} alt="icon" />
        </div>
        <div className={styles.cloud_text}>5</div>
      </div>
    </div>
  );
}
