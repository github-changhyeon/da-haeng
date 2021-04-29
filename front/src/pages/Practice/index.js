import { React } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import RouterInfo from 'src/constants/RouterInfo';

export default function Practice() {
  const history = useHistory();

  return (
    <div>
      <h1>hello Practice</h1>
    </div>
  );
}
