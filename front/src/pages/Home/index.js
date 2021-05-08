import { React } from 'react';
import styles from './index.module.css';
import { useHistory, generatePath } from 'react-router';
import RouterInfo from 'src/constants/RouterInfo';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';

export default function Home() {
  const history = useHistory();

  return (
    <div className={styles.home_container}>
      <div className={styles.home_items}>
        <div className={styles.home_logo}>
          <img className={styles.home_logo_image} src="/images/logo.png" alt="logo" />
        </div>
        <div className={styles.home_buttons}>
          <div className={styles.home_button}>
            <ButtonComp
              onClickFunc={() => {
                history.push({
                  pathname: generatePath(RouterInfo.PAGE_URLS.LOGIN),
                });
              }}
              text="로그인"
              width="160px"
              color="#ffc531"
              colorDeep="#ca9100"
            />
          </div>
          <div className={styles.home_button}>
            <ButtonComp
              onClickFunc={() => {
                history.push({
                  pathname: generatePath(RouterInfo.PAGE_URLS.SIGNUP),
                });
              }}
              text="회원가입"
              width="160px"
              color="#fb9cbb"
              colorDeep="#f73a78"
            />
          </div>
        </div>
      </div>

      {/* <h1>hello Home</h1>
      <button
        onClick={() => {
          history.push(RouterInfo.PAGE_URLS.TEST);
        }}
      >
        Multi Test
      </button>
      <button
        onClick={() => {
          history.push(RouterInfo.PAGE_URLS.TEST2);
        }}
      >
        webgl connect test
      </button>
      <button
        onClick={() => {
          history.push(RouterInfo.PAGE_URLS.TEST3);
        }}
      >
        components
      </button>
      <button
        onClick={() => {
          history.push(RouterInfo.PAGE_URLS.TEST4);
        }}
      >
        민주 테스트
      </button> */}
    </div>
  );
}
