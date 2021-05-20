import React, { useEffect, useState, useRef } from 'react';
import styles from './index.module.css';
import { useHistory, generatePath } from 'react-router';
import RouterInfo from 'src/constants/RouterInfo';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import TextField from '@material-ui/core/TextField';
import $ from 'jquery';
import Typography from '@material-ui/core/Typography';
import { restApi } from 'src/common/axios/index';
import BackComp from 'src/components/BackComp/BackComp';
import Swal from 'sweetalert2';

export default function SignUp() {
  const history = useHistory();
  const [isSelectStudent, setIsSelectStudent] = useState(false);

  const [role, setRole] = useState('');
  const [pinCode, setPinCode] = useState(0);

  const [loginId, setLoginId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [loginIdError, setLoginIdError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  // 선생님 코드
  const inputRef_1 = useRef(null);
  const inputRef_2 = useRef(null);
  const inputRef_3 = useRef(null);
  const inputRef_4 = useRef(null);
  const inputRef_5 = useRef(null);
  const inputRef_6 = useRef(null);

  const onChangeInput_1 = () => {
    inputRef_2.current.focus();
  };
  const onChangeInput_2 = () => {
    inputRef_3.current.focus();
  };
  const onChangeInput_3 = () => {
    inputRef_4.current.focus();
  };
  const onChangeInput_4 = () => {
    inputRef_5.current.focus();
  };
  const onChangeInput_5 = () => {
    inputRef_6.current.focus();
  };
  const onChangeInput_6 = () => {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input');

    var code = '';
    for (var i = 0; i < inputs.length; i++) {
      code += inputs[i].value;
    }

    if (isNaN(Number(code)) === false && code.length == 6) {
      setPinCode(Number(code));
    } else {
      // alert('선생님 코드를 확인해주세요.');
      Swal.fire({
        icon: 'warning',
        title: '선생님 코드를 확인해주세요.',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    console.log('role: ' + role);
    console.log('pinCode: ' + pinCode);
  }, [role]);

  function onSkip() {
    setPinCode(0);
    $('.checkRole').hide();
    $('.checkInfo').show();
    return;
  }

  function onSubmit() {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input');

    var code = '';
    for (var i = 0; i < inputs.length; i++) {
      code += inputs[i].value;
    }

    console.log(code);

    if (isNaN(Number(code)) === false && code.length == 6) {
      setPinCode(Number(code));
      $('.checkRole').hide();
      $('.checkInfo').show();
      return;
    } else {
      // alert('선생님 코드를 확인해주세요.');
      Swal.fire({
        icon: 'warning',
        title: '선생님 코드를 확인해주세요.',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
  }

  function onClickStudent() {
    setIsSelectStudent(!isSelectStudent);
    setRole('ROLE_STUDENT');
    return;
  }

  function onClickTeacher() {
    setRole('ROLE_ADMIN');
    onSkip();
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
        setLoginIdError(true);
        return <Typography className={styles.error}>아이디는 10자 이하입니다.</Typography>;
      } else {
        setLoginIdError(false);
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
        setNameError(true);
        return <Typography className={styles.error}>이름은 10자 이하입니다.</Typography>;
      } else {
        setNameError(false);
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
        setPasswordError(true);
        return (
          <Typography className={styles.error}>
            소문자/숫자 포함 8자 이상, 20자 이하입니다.
          </Typography>
        );
      } else {
        setPasswordError(false);
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
        setPasswordConfirmError(false);
        return <Typography>&nbsp;</Typography>;
      }
      if (password.value !== confirm.value) {
        setPasswordConfirmError(true);
        return <Typography className={styles.error}>비밀번호가 일치하지 않습니다.</Typography>;
      }
    }
    return <Typography>&nbsp;</Typography>;
  }

  async function onSignUp() {
    if (!loginId || !name || !password || !passwordConfirm === true) {
      // alert('모든 입력값을 채워주세요.');
      Swal.fire({
        icon: 'warning',
        title: '모든 입력값을 채워주세요.',
      });
      return;
    }

    if (password != passwordConfirm) {
      // alert('비밀번호 확인이 일치하지 않습니다.');
      Swal.fire({
        icon: 'error',
        title: '비밀번호가 일치하지 않습니다.',
        text: '다시 입력해주세요.',
      });
      return;
    }

    if (loginIdError || nameError || passwordError || passwordConfirmError) {
      // alert('조건에 적합하지 않은 부분이 있습니다.');
      Swal.fire({
        icon: 'error',
        title: '조건에 적합하지 않은 부분이 있습니다.',
        text: '입력하신 정보를 다시 확인해주세요.',
      });
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
        console.log('여기');
        console.log(res.status);
        if (res.status === 201) {
          history.push({
            pathname: '/login',
          });
          // alert('회원가입 성공! 반갑습니다!');
          Swal.fire({
            icon: 'success',
            title: '회원가입에 성공했습니다.',
            text: '반갑다햄~ 다같이 행복해~!',
            showConfirmButton: false,
            timer: 2000,
          });
          console.log(res);
          return;
        } else {
          // alert('회원가입에 실패했습니다.');
          Swal.fire({
            icon: 'error',
            title: '회원가입에 실패했습니다.',
            text: '다시 시도해주세요.',
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          // alert('이미 사용 중인 아이디입니다.');
          Swal.fire({
            icon: 'warning',
            title: '이미 사용 중인 아이디입니다.',
            text: '다른 아이디를 입력해주세요.',
          });
        } else {
          alert('회원가입에 실패했습니다.');
          // Swal.fire({
          //   icon: 'error',
          //   title: '회원가입에 실패했습니다.',
          //   text: '다시 시도해주세요.',
          // });
        }
      });
  }

  const onEnterPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSignUp();
    }
  };

  return (
    <div>
      <BackComp />
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
                <form action="#">
                  <div onChange={onPinCodeHandler}>
                    <input
                      onChange={onChangeInput_1}
                      ref={inputRef_1}
                      type="tel"
                      maxLength="1"
                      pattern="[0-9]"
                      className={styles.form_control}
                    />
                    <input
                      onChange={onChangeInput_2}
                      ref={inputRef_2}
                      type="tel"
                      maxLength="1"
                      pattern="[0-9]"
                      className={styles.form_control}
                    />
                    <input
                      onChange={onChangeInput_3}
                      ref={inputRef_3}
                      type="tel"
                      maxLength="1"
                      pattern="[0-9]"
                      className={styles.form_control}
                    />
                    <input
                      onChange={onChangeInput_4}
                      ref={inputRef_4}
                      type="tel"
                      maxLength="1"
                      pattern="[0-9]"
                      className={styles.form_control}
                    />
                    <input
                      onChange={onChangeInput_5}
                      ref={inputRef_5}
                      type="tel"
                      maxLength="1"
                      pattern="[0-9]"
                      className={styles.form_control}
                    />
                    <input
                      onChange={onChangeInput_6}
                      ref={inputRef_6}
                      type="tel"
                      maxLength="1"
                      pattern="[0-9]"
                      className={styles.form_control}
                    />
                  </div>
                </form>
                <div className={styles.check_role_buttons}>
                  <div className={styles.check_role_button}>
                    <div className={styles.button_skip} onClick={onSkip}>
                      <div className={styles.button_skip_text}>건너뛰기</div>
                    </div>
                    {/* <ButtonComp
                      onClickFunc={onSkip}
                      text="건너뛰기"
                      width="160px"
                      color="#a9c505"
                      colorDeep="#4d7f36"
                    /> */}
                  </div>
                  <div className={styles.check_role_button}>
                    <div className={styles.button_input} onClick={onSubmit}>
                      <div className={styles.button_input_text}>입력하기</div>
                    </div>
                    {/* <ButtonComp
                      onClickFunc={onSubmit}
                      text="입력하기"
                      width="160px"
                      color="#ffaa2b"
                      colorDeep="#c5670f"
                    /> */}
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
                  <div className={styles.button_signup} onClick={onSignUp}>
                    <div className={styles.button_signup_text}>회원가입</div>
                  </div>
                  {/* <ButtonComp
                    onClickFunc={onSignUp}
                    text="회원가입"
                    width="160px"
                    color="#cb92fb"
                    colorDeep="#9152fb"
                  /> */}
                </div>
                <div className={styles.check_info_button}>
                  <div
                    className={styles.button_home}
                    onClick={() => {
                      history.push({
                        pathname: generatePath(RouterInfo.PAGE_URLS.HOME),
                      });
                    }}
                  >
                    <div className={styles.button_home_text}>홈으로</div>
                  </div>
                  {/* <ButtonComp
                    onClickFunc={() => {
                      history.push({
                        pathname: generatePath(RouterInfo.PAGE_URLS.HOME),
                      });
                    }}
                    text="홈으로"
                    width="140px"
                    color="#ffc531"
                    colorDeep="#ca9100"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
