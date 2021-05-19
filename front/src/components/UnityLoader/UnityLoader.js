import React, { useEffect, useState } from 'react';
import styles from './UnityLoader.module.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import BusLoader from 'src/components/BusLoader/BusLoader';

export default function UnityLoader({ percent, here }) {
  const classes = useStyles();

  const [per, setPer] = useState(0);

  useEffect(() => {
    if (percent != undefined && percent != null) {
      setPer(percent);
    }
  }, [percent]);

  return (
    <>
      <div className={styles.loading_container}>
        {here === 'plaza' ? (
          <div className={styles.loading_text}>
            <span>광</span>
            <span>장</span>
            <span>으</span>
            <span>로&nbsp;&nbsp;</span>
            <span>가</span>
            <span>는&nbsp;&nbsp;</span>
            <span>중</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        ) : (
          ''
        )}
        {here === 'tutorial' ? (
          <div className={styles.loading_text}>
            <span>튜</span>
            <span>토</span>
            <span>리</span>
            <span>얼&nbsp;&nbsp;</span>
            <span>로</span>
            <span>딩&nbsp;&nbsp;</span>
            <span>중</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        ) : (
          ''
        )}
        {here === 'exercise' ? (
          <div className={styles.loading_text}>
            <span>연</span>
            <span>습</span>
            <span>하</span>
            <span>러&nbsp;&nbsp;</span>
            <span>가</span>
            <span>는&nbsp;&nbsp;</span>
            <span>중</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        ) : (
          ''
        )}
        {here === 'practice' ? (
          <div className={styles.loading_text}>
            <span>도</span>
            <span>전</span>
            <span>하</span>
            <span>러&nbsp;&nbsp;</span>
            <span>가</span>
            <span>는&nbsp;&nbsp;</span>
            <span>중</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        ) : (
          ''
        )}

        <BusLoader />
        {/* Progress Bar */}
        <div className={styles.bus_loader_progress}>
          <BorderLinearProgress variant="determinate" value={per} />
          <div className={styles.bus_loader_progress_contents}></div>
        </div>

        {/* 햄찌 */}
        {/* <div className={styles.loading_screen}>
          <img
            src="https://assets.codepen.io/751678/loading-animation-base.svg"
            width="234"
            alt="base"
            className={styles.base}
          />
          <img
            src="https://assets.codepen.io/751678/loading-animation-wheel.svg"
            width="241.5"
            alt="wheel"
            className={styles.wheel}
          />
          <img className={styles.ch_icon} src="/images/dahamzzi/ch_teacher.png" alt="icon" /> */}
        {/* Progress Bar */}
        {/* <BorderLinearProgress variant="determinate" value={per} /> */}
        {/* <div className={styles.contents}></div> */}
        {/* </div> */}
      </div>
    </>
  );
}

const BorderLinearProgress = withStyles({
  root: {
    width: '100%',
    height: 30,
    borderRadius: 30,
    margin: '0 auto',
    position: 'absolute',
    bottom: 0,
    left: 0,
    border: '#0260a9 2px solid',
  },
  colorPrimary: {
    backgroundColor: '#ddd',
  },
  bar: {
    backgroundColor: '#0e87e4',
  },
})(LinearProgress);

const useStyles = makeStyles({
  progress: {
    flexGrow: 1,
  },
});
