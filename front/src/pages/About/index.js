import { React } from 'react';
import styles from './index.module.css';
import { useHistory, generatePath } from 'react-router';
import RouterInfo from 'src/constants/RouterInfo';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';

export default function About() {
  const history = useHistory();

  return (
    <div>
      <h1>hello About</h1>
    </div>
  );
}
