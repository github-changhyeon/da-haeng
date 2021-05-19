import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import RouterInfo from 'src/constants/RouterInfo';
import { useHistory, generatePath } from 'react-router';
import { restApi } from 'src/common/axios/index';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Swal from 'sweetalert2';

export default function Header() {
  const history = useHistory();

  // 로그인 여부 확인
  const [isLogined, setIsLogined] = useState(sessionStorage.getItem('jwt'));

  // 로그아웃
  const onLogoutClick = (event) => {
    // sessionStorage.removeItem('jwt');
    sessionStorage.clear();
    console.log(sessionStorage);

    // alert('로그아웃이 완료되었습니다.');
    Swal.fire({
      icon: 'success',
      title: '로그아웃이 완료되었습니다.',
      text: '다음에 또 만나요!',
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      history.push(RouterInfo.PAGE_URLS.HOME);
      window.location.reload();
      console.log('로그아웃 리로드~');
    });
  };

  return (
    <div className={styles.header}>
      <div className={styles.header_left}>
        <div
          className={styles.header_left_button}
          onClick={() => {
            history.push({
              pathname: generatePath(RouterInfo.PAGE_URLS.PLAZA),
            });
          }}
        >
          <div className={styles.header_left_button_text}>
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
            <div
              className={styles.header_right_button_login}
              onClick={() => {
                history.push({
                  pathname: generatePath(RouterInfo.PAGE_URLS.LOGIN),
                });
              }}
            >
              <div className={styles.header_right_button_login_text}>로그인</div>
            </div>
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
            {/* 정보 버튼 */}
            <div className={styles.header_right_item}>
              <div className={styles.dropdown}>
                <img
                  className={styles.header_right_icon}
                  src="/images/icons/infoIcon.png"
                  alt="icon"
                />

                <div className={styles.dropdown_content} style={{ minWidth: '185px' }}>
                  <div
                    className={styles.dropdown_menu}
                    onClick={() => {
                      history.push(RouterInfo.PAGE_URLS.ABOUT);
                    }}
                  >
                    <p>
                      <img
                        src="/images/icons/helpIcon.png"
                        alt="about"
                        className={styles.dropdown_icon}
                      />
                    </p>
                    <p>이용 방법</p>
                  </div>
                  <div
                    onClick={() => {
                      history.push(RouterInfo.PAGE_URLS.AHATECH);
                    }}
                    className={styles.dropdown_menu}
                  >
                    <p>
                      <img
                        src="/images/icons/ahaIcon.png"
                        alt="about"
                        className={styles.dropdown_icon}
                      />
                    </p>
                    <p>아하텍 소개</p>
                  </div>
                </div>
              </div>
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
                        pathname: generatePath(RouterInfo.PAGE_URLS.MYPAGE, {}),
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
