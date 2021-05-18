import React, { useEffect, useState } from 'react';
import styles from './UnityLoader.module.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function UnityLoader({ percent }) {
  const classes = useStyles();

  const [per, setPer] = useState(0);

  useEffect(() => {
    if (percent != undefined && percent != null) {
      setPer(percent);
    }
  }, [percent]);

  return (
    <div className={styles.loading_container}>
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
      <div className={styles.loading_screen}>
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
        <img className={styles.ch_icon} src="/images/dahamzzi/ch_teacher.png" alt="icon" />
        {/* Progress Bar */}
        <BorderLinearProgress variant="determinate" value={per} />
        {/* <div className={styles.contents}></div> */}
      </div>
    </div>
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
