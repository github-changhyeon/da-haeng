import React, { useEffect, createRef } from 'react';
import styles from './index.module.css';
import Loader from 'src/components/Loader/Loader';
import UnityLoader from 'src/components/UnityLoader/UnityLoader';

export default function Loading() {
  // return <Loader />;
  return <UnityLoader percent={80} />;
}
