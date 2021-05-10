import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import RouterInfo from 'src/constants/RouterInfo';
import { useHistory, generatePath } from 'react-router';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export default function Header() {
  const history = useHistory();

  // 로그인 여부 확인
  const [isLogined, setIsLogined] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem('jwt')) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, [sessionStorage.getItem('jwt')]);

  // 로그인 되어있다면 uid 가져오기
  const [uid, setUid] = useState(0);
  useEffect(() => {
    if (isLogined) {
      setUid(sessionStorage.getItem('uid'));
    }
  }, [isLogined]);

  const onLogoutClick = (event) => {
    // sessionStorage.removeItem('jwt');
    sessionStorage.clear();
    // window.localStorage.clear();
    console.log(sessionStorage);

    alert('로그아웃이 완료되었습니다.');
    history.push(RouterInfo.PAGE_URLS.HOME);
  };

  return (
    <div className={styles.header}>
      <div className={styles.header_left}>
        <div
          className={styles.header_left_button}
          onClick={() => {
            history.push({
              // pathname: generatePath(RouterInfo.PAGE_URLS.PLAZA),
              pathname: generatePath(RouterInfo.PAGE_URLS.TEST),
            });
          }}
        >
          <div className={styles.header_left_button_sign}>
            광장으로
            <PlayArrowIcon className={styles.header_left_button_icon} />
          </div>
        </div>
      </div>

      <div className={styles.header_right}>
        {/* 로그아웃 상태 */}
        {!isLogined && (
          <>
            {/* 로그인 버튼 */}
            {/* 회원가입 버튼 */}
          </>
        )}
        {/* 로그인 상태 */}
        {isLogined && (
          <>
            {/* 홈 버튼 */}
            <div
              className={styles.header_right_item}
              onClick={() => {
                history.push({
                  pathname: generatePath(RouterInfo.PAGE_URLS.MAIN),
                });
              }}
            >
              <img
                className={styles.header_right_icon}
                src="/images/icons/homeIcon.png"
                alt="icon"
              />
            </div>
            {/* 프로필 버튼 */}
            <div className={styles.header_right_item}>
              <div className={styles.dropdown}>
                <img
                  className={styles.header_right_icon}
                  src="/images/icons/userIcon.png"
                  alt="icon"
                />

                <div className={styles.dropdown_content}>
                  <div
                    className={styles.dropdown_menu}
                    onClick={() => {
                      history.push({
                        pathname: generatePath(RouterInfo.PAGE_URLS.MYPAGE, {
                          uid: uid,
                        }),
                      });
                    }}
                  >
                    <p>
                      <FaceIcon className={styles.dropdown_icon} />
                    </p>
                    <p>나의 정보</p>
                  </div>
                  <div onClick={onLogoutClick} className={styles.dropdown_menu}>
                    <p>
                      <ExitToAppIcon className={styles.dropdown_icon} />
                    </p>
                    <p>로그아웃</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
