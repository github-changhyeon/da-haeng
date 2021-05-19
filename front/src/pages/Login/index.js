import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { useHistory, generatePath } from 'react-router';
import RouterInfo from 'src/constants/RouterInfo';
import TextField from '@material-ui/core/TextField';
import $ from 'jquery';
import Typography from '@material-ui/core/Typography';
import { restApi } from 'src/common/axios/index';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import BackComp from 'src/components/BackComp/BackComp';
import Swal from 'sweetalert2';

export default function Login() {
  const history = useHistory();

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const onLoginIdHandler = (event) => {
    setLoginId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    const userData = {
      loginId: loginId,
      password: password,
    };

    const instance = restApi();

    instance
      .post(`/login`, userData)
      .then((res) => {
        // if (res.data.response === 'success') {
        if (res.status == 200) {
          // 세션스토리지에 token 저장
          sessionStorage.setItem('jwt', res.headers.authorization);
          console.log(res.headers);

          // alert('로그인 성공 !! 추카추 ~!!');
          Swal.fire({
            icon: 'success',
            title: '로그인에 성공했습니다.',
            text: '반갑다햄!',
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            history.push({
              pathname: generatePath(RouterInfo.PAGE_URLS.MAIN),
            });
            window.location.reload();
            console.log('로그인 리로드~');
          });
        } else {
          // alert('로그인 대 실패 !!');
          Swal.fire({
            icon: 'error',
            title: '로그인에 실패했습니다.',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (loginId === '' && password === '') {
          // alert('아이디와 비밀번호를 입력해 주세요.');
          Swal.fire({
            icon: 'warning',
            title: '아이디와 비밀번호를 입력해 주세요.',
          });
        } else if (loginId === '') {
          // alert('아이디를 입력해 주세요.');
          Swal.fire({
            icon: 'warning',
            title: '아이디를 입력해 주세요.',
          });
        } else if (password === '') {
          // alert('비밀번호를 입력해 주세요.');
          Swal.fire({
            icon: 'warning',
            title: '비밀번호를 입력해 주세요.',
          });
        } else {
          // alert('아이디와 비밀번호가 일치하지 않습니다.');
          Swal.fire({
            icon: 'error',
            title: '아이디와 비밀번호를 확인해주세요.',
          });
        }
      });
  };

  const onEnterPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmitHandler();
    }
  };

  return (
    <div>
      <BackComp />
      <div className={styles.check_info_container}>
        <div className={styles.check_info_box}>
          <div className={styles.check_info_title}>로그인</div>
          {/* 아이디 */}
          <div className={styles.check_info_block}>
            <div className={styles.check_info_label}>아이디</div>
            <input
              className={styles.check_info_input}
              id="loginId"
              type="text"
              placeholder="아이디를 입력하세요."
              required
              onChange={onLoginIdHandler}
            />
            {/* <LoginId style={{ height: '30px', fontSize: '20px' }} /> */}
          </div>
          {/* 비밀번호 */}
          <div className={styles.check_info_block}>
            <div className={styles.check_info_label}>비밀번호</div>
            <input
              className={styles.check_info_input}
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요."
              required
              onChange={onPasswordHandler}
              onKeyPress={onEnterPress}
            />
            {/* <Password style={{ height: '30px', fontSize: '20px' }} /> */}
            <div className={styles.check_info_buttons}>
              <div className={styles.check_info_button}>
                <ButtonComp
                  onClickFunc={onSubmitHandler}
                  text="로그인"
                  width="140px"
                  color="#fb9cbb"
                  colorDeep="#f73a78"
                />
              </div>
              <div className={styles.check_info_button}>
                <ButtonComp
                  onClickFunc={() => {
                    history.push({
                      pathname: generatePath(RouterInfo.PAGE_URLS.SIGNUP),
                    });
                  }}
                  text="회원가입"
                  width="150px"
                  color="#cb92fb"
                  colorDeep="#9152fb"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
