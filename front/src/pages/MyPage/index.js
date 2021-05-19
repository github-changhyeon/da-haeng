import { React, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import RouterInfo from 'src/constants/RouterInfo';
import { restApi } from 'src/common/axios/index';
import Header from 'src/components/Header/Header';
import ProfileComp from 'src/components/ProfileComp/ProfileComp';
import ProgressComp from 'src/components/ProgressComp/ProgressComp';
import StepComp from 'src/components/StepComp/StepComp';
import PaginationComp from 'src/components/PaginationComp/PaginationComp';
import $ from 'jquery';
import classNames from 'classnames';
import Swal from 'sweetalert2';

export default function MyPage() {
  const history = useHistory();

  const [now, setNow] = useState('avg'); // avg, student

  const [uid, setUid] = useState(0);
  const [loginId, setLoginId] = useState('');
  const [uname, setUname] = useState('');
  const [pinCode, setPinCode] = useState(0);
  const [role, setRole] = useState('');

  const [burgerStageResult, setBurgerStageResult] = useState(0);
  const [busStageResult, setBusStageResult] = useState(0);

  const [burgerAvg, setBurgerAvg] = useState(0);
  const [busAvg, setBusAvg] = useState(0);
  const [studentUserResponses, setStudentUserResponses] = useState([]);

  // console.log(studentUserResponses[0]['name']);

  // 기본 정보 axios
  useEffect(() => {
    if (sessionStorage.getItem('jwt') != null) {
      const instance = restApi();

      instance
        .get(`/users`, {
          headers: {
            Authorization: sessionStorage.getItem('jwt'),
          },
        })
        .then((res) => {
          if (res.status == 200) {
            console.log('성공');
            setUid(res.data.id);
            setLoginId(res.data.loginId);
            setUname(res.data.name);
            setPinCode(res.data.pinCode);
            setRole(res.data.role);
          } else {
            console.log('반만 성공');
          }
        })
        .catch((err) => {
          console.log(err);
          // alert('내 정보를 불러오는 중에 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
          Swal.fire({
            icon: 'warning',
            title: '내 정보를 불러오는 중에 오류가 발생했습니다.',
            text: '잠시 후에 다시 시도해주세요.',
          });
        });
    } else {
      console.log('mypage/ jwt 토큰 없음 !!');
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('jwt') != null) {
      const instance = restApi();

      if (role === 'ROLE_STUDENT') {
        // 학생 도전하기 axios
        instance
          .get(`/stage`, {
            headers: {
              Authorization: sessionStorage.getItem('jwt'),
            },
          })
          .then((res) => {
            if (res.status == 200) {
              console.log('성공');
              // TODO 달미한테 로직 물어보기
              setBurgerStageResult(res.data.burgerStageResult);
              setBusStageResult(res.data.busStageResult);
            } else {
              console.log('반만 성공');
            }
          })
          .catch((err) => {
            console.log(err);
            // alert('내 정보를 불러오는 중에 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
            Swal.fire({
              icon: 'warning',
              title: '내 정보를 불러오는 중에 오류가 발생했습니다.',
              text: '잠시 후에 다시 시도해주세요.',
            });
          });
      } else if (role === 'ROLE_ADMIN') {
        // 선생님 axios
        instance
          .get(`/stage/admin`, {
            headers: {
              Authorization: sessionStorage.getItem('jwt'),
            },
          })
          .then((res) => {
            if (res.status == 200) {
              console.log('성공');
              setBurgerAvg(res.data.burgerAvg);
              setBusAvg(res.data.busAvg);

              // name, burgerStageResult, busStageResult
              setStudentUserResponses(res.data.studentUserResponses);
            } else {
              console.log('반만 성공');
            }
          })
          .catch((err) => {
            console.log(err);
            // alert('내 정보를 불러오는 중에 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.');
            Swal.fire({
              icon: 'warning',
              title: '내 정보를 불러오는 중에 오류가 발생했습니다.',
              text: '잠시 후에 다시 시도해주세요.',
            });
          });
      }
    } else {
      console.log('mypage/ jwt 토큰 없음 !!');
    }
  }, [role]);

  // 탭 선택
  useEffect(() => {
    console.log(now);
    if (now === 'avg') {
      $('.avg').show();
      $('.tab_avg').css('backgroundColor', 'rgba(255, 183, 58, 0.95)');
      $('.student').hide();
      $('.tab_student').css('backgroundColor', 'rgba(255, 255, 255, 0.9)');
    } else if (now === 'student') {
      $('.avg').hide();
      $('.tab_avg').css('backgroundColor', 'rgba(255, 255, 255, 0.9)');
      $('.student').show();
      $('.tab_student').css('backgroundColor', 'rgba(255, 183, 58, 0.95)');
    }
  }, [now]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = studentUserResponses.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.mypage_background}>
      <Header />
      <div className={styles.role}>
        <ProfileComp role={role} name={uname} code={pinCode} />
      </div>
      {role === 'ROLE_STUDENT' ? (
        // 학생인 경우
        <div>
          <div style={{ marginLeft: '40px' }}>
            <div className={styles.tab}>
              <div className={styles.tab_text}>나의 진척도</div>
            </div>
          </div>
          <div className={styles.box}>
            <StepComp type="burger" max={burgerStageResult} />
            <StepComp type="bus" max={busStageResult} />
          </div>
        </div>
      ) : (
        // 선생님인 경우
        <div>
          <div style={{ marginLeft: '40px' }}>
            <div className={classNames({ [styles.tab]: true, ['tab_avg']: true })}>
              <div
                className={styles.tab_text}
                onClick={() => {
                  setNow('avg');
                }}
              >
                평균 진척도
              </div>
            </div>
            <div className={classNames({ [styles.tab]: true, ['tab_student']: true })}>
              <div
                className={styles.tab_text}
                onClick={() => {
                  setNow('student');
                }}
              >
                학생별 진척도
              </div>
            </div>
          </div>
          <article className="avg">
            {studentUserResponses[0] != null && studentUserResponses[0] != undefined ? (
              <div className={styles.box}>
                <div className={styles.progress_container}>
                  <div className={styles.progress_each}>
                    <div className={styles.avg_text}>1. 행복행 버스</div>
                    <ProgressComp percent={busAvg} />
                  </div>
                  <div className={styles.progress_each}>
                    <div className={styles.avg_text}>2. 행복 햄버거</div>
                    <ProgressComp percent={burgerAvg} />
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.box}>
                <div className={styles.no_student_text}>학생이 없습니다.</div>
              </div>
            )}
          </article>
          <article className="student">
            {studentUserResponses[0] != null && studentUserResponses[0] != undefined ? (
              <div className={styles.box} style={{ flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '340px' }}>
                  {currentPosts.map((n, index) => {
                    console.log('here: ' + studentUserResponses.length);
                    return (
                      <div className={styles.student_each}>
                        <div className={styles.sname_text}>{currentPosts[index]['name']}</div>
                        <div className={styles.student_bar}></div>
                        <StepComp type="burger" max={currentPosts[index]['burgerStageResult']} />
                        <StepComp type="bus" max={currentPosts[index]['busStageResult']} />
                      </div>
                    );
                  })}
                  <div className={styles.pagination}>
                    <PaginationComp
                      postsPerPage={postsPerPage}
                      totalPosts={studentUserResponses.length}
                      paginate={paginate}
                    />
                  </div>
                </div>
                {/* <div className={styles.student_each}>
                  <div className={styles.sname_text}>{studentUserResponses[0]['name']}</div>
                  <div className={styles.student_bar}></div>
                  <StepComp type="burger" max={studentUserResponses[0]['burgerStageResult']} />
                  <StepComp type="bus" max={studentUserResponses[0]['busStageResult']} />
                </div>
                <div className={styles.student_each}>
                  <div className={styles.sname_text}>{studentUserResponses[1]['name']}</div>
                  <div className={styles.student_bar}></div>
                  <StepComp type="burger" max={studentUserResponses[1]['burgerStageResult']} />
                  <StepComp type="bus" max={studentUserResponses[1]['busStageResult']} />
                </div> */}
              </div>
            ) : (
              <div className={styles.box}>
                <div className={styles.no_student_text}>학생이 없습니다.</div>
              </div>
            )}
          </article>
        </div>
      )}
    </div>
  );
}
