import { React } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import RouterInfo from 'src/constants/RouterInfo';

export default function Plaza() {
  const history = useHistory();

  return (
    <div>
      <h1>hello Plaza</h1>
    </div>
  );
}
