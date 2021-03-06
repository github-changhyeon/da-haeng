import React, { useEffect, useState } from 'react';
import styles from './ButtonComp.module.css';
import RouterInfo from 'src/constants/RouterInfo';
import { useHistory, generatePath } from 'react-router';
import classNames from 'classnames';
import $ from 'jquery';

export default function ButtonComp({ onClickFunc, text, width, color, colorDeep }) {
  const history = useHistory();

  // color : #ce89c8
  // colorDeep : #aa47a2

  return (
    <div
      className={classNames({ [styles.button]: true, ['button']: true })}
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
