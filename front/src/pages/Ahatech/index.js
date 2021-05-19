import { React } from 'react';
import styles from './index.module.css';
import { useHistory, generatePath } from 'react-router';
import RouterInfo from 'src/constants/RouterInfo';
import Header from 'src/components/Header/Header';

export default function Ahatech() {
  const history = useHistory();

  return (
    <div className={styles.ahatech_background}>
      <Header />
    </div>
  );
}
