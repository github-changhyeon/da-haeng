import { React } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import RouterInfo from 'src/constants/RouterInfo';

export default function MyPage() {
  const history = useHistory();

  return (
    <div>
      <h1>hello MyPage</h1>
    </div>
  );
}
