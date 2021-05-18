import { React, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import RouterInfo from 'src/constants/RouterInfo';
import UnityLoader from 'src/components/UnityLoader/UnityLoader';

export default function Exercise() {
  return <UnityLoader />;
}
