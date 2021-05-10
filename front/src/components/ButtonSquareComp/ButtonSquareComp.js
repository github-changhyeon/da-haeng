import React, { useEffect, useState } from 'react';
import styles from './ButtonSquareComp.module.css';
import RouterInfo from 'src/constants/RouterInfo';
import { useHistory, generatePath } from 'react-router';
import $ from 'jquery';

export default function ButtonSquareComp({ onClickFunc, text, width, color, colorDeep }) {
  const history = useHistory();

  // color : #ce89c8
  // colorDeep : #aa47a2

  return (
    <div
      className={styles.button}
      onClick={onClickFunc}
      style={{
        width: width,
        background: color,
        border: '3px ' + colorDeep + ' solid',
        boxShadow: '0 10px 0 ' + colorDeep,
      }}
    >
      <div className={styles.sign}>
        {text}
        {/* <PlayArrowIcon className={styles.header_left_button_icon} /> */}
      </div>
    </div>
  );
}
