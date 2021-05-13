import { React } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import RouterInfo from 'src/constants/RouterInfo';

export default function Exercise() {
  const history = useHistory();

  return (
    <div>
      <h1>Exercise page</h1>
    </div>
  );
}
