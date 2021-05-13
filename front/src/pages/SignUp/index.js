import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { useHistory, generatePath } from 'react-router';
import RouterInfo from 'src/constants/RouterInfo';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import TextField from '@material-ui/core/TextField';
import $ from 'jquery';
import Typography from '@material-ui/core/Typography';
import { restApi } from 'src/common/axios/index';

export default function SignUp() {
  const history = useHistory();
  const [isSelectStudent, setIsSelectStudent] = useState(false);

  const [role, setRole] = useState('');
  const [pinCode, setPinCode] = useState(0);

  const [loginId, setLoginId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function onClickStudent() {
    setIsSelectStudent(!isSelectStudent);
    setRole('ROLE_STUDENT');
    return;
  }

  function onClickTeacher() {
    setRole('ROLE_ADMIN');
    onNext();
    return;
  }

  useEffect(() => {
    console.log('role: ' + role);
    console.log('pinCode: ' + pinCode);
  }, [role]);

  function onNext() {
    if (pinCode != 0) {
      setPinCode(pinCode);
    }
    $('.checkRole').hide();
    $('.checkInfo').show();
    return;
  }

  function onPrev() {
    $('.checkRole').show();
    $('.checkInfo').hide();
    return;
  }

  const onPinCodeHandler = (event) => {
    setPinCode(event.target.value);
  };
  const onLoginIdHandler = (event) => {
    setLoginId(event.target.value);
  };
  const onNameHandler = (event) => {
    setName(event.target.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  const onPasswordConfirmHandler = (event) => {
    setPasswordConfirm(event.target.value);
  };

  // 아이디
  function LoginId() {
    const loginId = document.getElementById('loginId');
    if (loginId != null) {
      if (loginId.value === '') {
        return <Typography>&nbsp;</Typography>;
      }
      if (1 > loginId.value.length || loginId.value.length > 10) {
        return <Typography className={styles.error}>아이디는 10자 이하입니다.</Typography>;
      } else {
        return <Typography>&nbsp;</Typography>;
      }
    }
    return <Typography>&nbsp;</Typography>;
  }

  // 이름
  function Name() {
    const name = document.getElementById('name');
    if (name != null) {
      if (name.value === '') {
        return <Typography>&nbsp;</Typography>;
      }
      if (1 > name.value.length || name.value.length > 10) {
        return <Typography className={styles.error}>이름은 다 적합인뎅?</Typography>;
      } else {
        return <Typography>&nbsp;</Typography>;
      }
    }
    return <Typography>&nbsp;</Typography>;
  }

  // 비밀번호
  const reg = /^(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/;
  function Password() {
    const password = document.getElementById('password');
    if (password != null) {
      if (password.value === '') {
        return <Typography>&nbsp;</Typography>;
      }
      if (!reg.test(password.value)) {
        return (
          <Typography className={styles.error} style={{ fontSize: '16px' }}>
            비밀번호는 소문자/숫자 포함 8자 이상, 20자 이하입니다.
          </Typography>
        );
      } else {
        return <Typography>&nbsp;</Typography>;
      }
    }
    return <Typography>&nbsp;</Typography>;
  }

  // 비밀번호 확인
  function PasswordConfirm() {
    const password = document.getElementById('password');
    const confirm = document.getElementById('passwordConfirm');
    if (password && confirm != null) {
      if (password.value === '' || confirm.value === '') {
        return <Typography>&nbsp;</Typography>;
      }
      if (password.value === confirm.value) {
        return <Typography>&nbsp;</Typography>;
      }
      if (password.value !== confirm.value) {
        return <Typography className={styles.error}>비밀번호가 일치하지 않습니다.</Typography>;
      }
    }
    return <Typography>&nbsp;</Typography>;
  }

  async function onSignUp() {
    if (!loginId || !name || !password || !passwordConfirm === true) {
      alert('모든 입력값을 채워주세요.');
      return;
    }
    if (password != passwordConfirm) {
      alert('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    const userData = {
      loginId: loginId,
      name: name,
      password: password,
      pinCode: pinCode,
      role: role,
    };

    const instance = restApi();

    instance
      .post(`/users`, userData)
      .then((res) => {
        if (res.status == 201) {
          history.push({
            pathname: '/login',
          });
          alert('회원가입 성공 !! 경축 !!!');
          console.log(res);
        } else {
          alert('회원가입 실패 !!');
        }
      })
      .catch((err) => {
        alert('회원가입 실패');
      });
  }

  const onEnterPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSignUp();
    }
  };

  // $('styles.ss').on('keyup', function (e) {
  //   var len = $(this).val().length;
  //   if (len === 1) {
  //     $(this).next().trigger('focus').trigger('select');
  //   } else if (e.key === 'Delete') {
  //     $(this).prev().trigger('focus').trigger('select');
  //   } else if (e.key === 46) {
  //     $(this).prev().trigger('focus').trigger('select');
  //   }
  // });

  // function keyUpFunc(e) {
  //   var len = $(this).val().length;
  //   if (len === 1) {
  //     $(this).next().trigger('focus').trigger('select');
  //   } else if (e.key === 'Delete') {
  //     $(this).prev().trigger('focus').trigger('select');
  //   } else if (e.key === 46) {
  //     $(this).prev().trigger('focus').trigger('select');
  //   }
  //   return;
  // }

  // $('styles.ss').on('click', function (e) {
  //   $(this).trigger('select');
  // });

  // var $input = $('styles.ss');
  // $input.on('keyup', function (e) {
  //   var max = 1;
  //   if ($input.val().length > max) {
  //     $input.val($input.val().substr(0, max));
  //   }
  // });

  // $('styles.ss').on('keyup', function () {
  //   var pw = $(this).val().toString();
  //   if (pw == '123456') {
  //     console.log('Hello');
  //     console.log(pw);
  //   } else {
  //     console.log('Hello Failed');
  //     console.log(pw);
  //   }
  // });

  return (
    <div>
      <article className="checkRole">
        <div className={styles.check_role_container}>
          <div className={styles.check_role_title}>당신은 누구십니까?</div>
          <div className={styles.check_role_box}>
            <div className={styles.check_role_circle} onClick={onClickStudent}>
              <img
                className={styles.check_role_image}
                src="/images/dahamzzi/ch_student.png"
                alt="role"
              />
              <div className={styles.check_role_text}>학생</div>
            </div>
            {!isSelectStudent ? (
              <div className={styles.check_role_circle} onClick={onClickTeacher}>
                <img
                  className={styles.check_role_image}
                  src="/images/dahamzzi/ch_teacher.png"
                  alt="role"
                />
                <div className={styles.check_role_text}>선생님</div>
              </div>
            ) : (
              <div className={styles.check_role_teacher_code_container}>
                <div className={styles.check_role_teacher_code_title}>
                  선생님 코드를 입력하세요.
                </div>
                <TextField
                  id="outlined-search"
                  label="선생님 코드"
                  type="search"
                  onChange={onPinCodeHandler}
                  // value={pinValue}
                />
                {/* <div className={styles.input_container}>
            <div className={styles.pin}>
                <div className={styles.pin_code_wrapper}>
                  <input
                    className={styles.ss}
                    maxlength="1"
                    type="tel"
                    onKeyPress={(e) => {
                      // if (e.key === '1') console.log('1누름');
                      keyUpFunc();
                    }}
                  />
                  <input className={styles.ss} maxlength="1" type="tel" />
                  <input className={styles.ss} maxlength="1" type="tel" />
                  <input className={styles.ss} maxlength="1" type="tel" />
                  <input className={styles.ss} maxlength="1" type="tel" />
                  <input className={styles.ss} maxlength="1" type="tel" />
                </div>
              </div>
            </div> */}
                <div className={styles.check_role_buttons}>
                  <div className={styles.check_role_button}>
                    <ButtonComp
                      onClickFunc={onNext}
                      text="건너뛰기"
                      width="160px"
                      color="#ffc531"
                      colorDeep="#ca9100"
                    />
                  </div>
                  <div className={styles.check_role_button}>
                    <ButtonComp
                      onClickFunc={onNext}
                      text="확인"
                      width="160px"
                      color="#fb9cbb"
                      colorDeep="#f73a78"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
      <article className="checkInfo" style={{ display: 'none' }}>
        <div className={styles.check_info_container}>
          <div className={styles.check_info_box}>
            <div className={styles.check_info_title}>회원가입</div>
            <div className={styles.check_info_blocks}>
              {/* 아이디 */}
              <div className={styles.check_info_block}>
                <div className={styles.check_info_label}>아이디</div>
                <input
                  className={styles.check_info_input}
                  id="loginId"
                  type="text"
                  placeholder="아이디"
                  required
                  onChange={onLoginIdHandler}
                />
                <LoginId style={{ height: '30px', fontSize: '20px' }} />
              </div>
              {/* 비밀번호 */}
              <div className={styles.check_info_block}>
                <div className={styles.check_info_label}>비밀번호</div>
                <input
                  className={styles.check_info_input}
                  id="password"
                  type="password"
                  placeholder="비밀번호"
                  required
                  onChange={onPasswordHandler}
                />
                <Password style={{ height: '30px', fontSize: '20px' }} />
              </div>
              {/* 이름 */}
              <div className={styles.check_info_block}>
                <div className={styles.check_info_label}>이름</div>
                <input
                  className={styles.check_info_input}
                  id="name"
                  type="text"
                  placeholder="이름"
                  required
                  onChange={onNameHandler}
                />
                <Name style={{ height: '30px', fontSize: '20px' }} />
              </div>
              {/* 비밀번호 확인 */}
              <div className={styles.check_info_block}>
                <div className={styles.check_info_label}>비밀번호 확인</div>
                <input
                  className={styles.check_info_input}
                  id="passwordConfirm"
                  type="password"
                  placeholder="비밀번호 확인"
                  required
                  onChange={onPasswordConfirmHandler}
                  onKeyPress={onEnterPress}
                />
                <PasswordConfirm style={{ height: '30px', fontSize: '20px' }} />
              </div>
              <div className={styles.check_info_buttons}>
                <div className={styles.check_info_button}>
                  <ButtonComp
                    onClickFunc={onPrev}
                    text="뒤로가기"
                    width="160px"
                    color="#ffc531"
                    colorDeep="#ca9100"
                  />
                </div>
                <div className={styles.check_info_button}>
                  <ButtonComp
                    onClickFunc={onSignUp}
                    text="회원가입"
                    width="160px"
                    color="#fb9cbb"
                    colorDeep="#f73a78"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
