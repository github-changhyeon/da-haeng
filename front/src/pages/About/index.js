import { React } from 'react';
import styles from './index.module.css';
import { useHistory, generatePath } from 'react-router';
import RouterInfo from 'src/constants/RouterInfo';
import Header from 'src/components/Header/Header';
import $ from 'jquery';
import classNames from 'classnames';

export default function About() {
  const history = useHistory();

  // $('.card').on('click', function () {
  //   $(this).toggleClass('flipped');
  //   console.log('클릭');
  // });

  return (
    <div className={styles.about_background}>
      <Header />
      <div className={styles.about_container}>
        <div className={styles.about_title}>이용 방법</div>
        <div className={styles.about_cards}>
          {/* <div className="card"> */}
          <div className={styles.card}>
            <div className={styles.front}>서비스 소개</div>
            <div className={styles.back}>
              <p>온라인 지역사회 중심 교수 플랫폼입니다.</p>
              <p>지역사회 중심 교수란?</p>
              <p>발달장애 학생들을 위한 교육과정의 하나</p>
              <p>
                지역사회 환경에서 활동할 때 필요한 기술들을 실제 환경에서 직접 교수하는 것입니다.
              </p>
            </div>
          </div>
          {/* </div> */}
          <div className={styles.card}>
            <div className={styles.front}>튜토리얼</div>
            <div className={styles.back}>
              <p>키오스크/버스의 이용 방법을 알려드립니다.</p>
              <p>튜토리얼을 통해 간단한 조작 방법을 알 수 있습니다.</p>
              <p>단계별로 나누어진 설명을 통해 쉽게 배울 수 있습니다.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.front}>연습하기</div>
            <div className={styles.back}>
              <p>자유롭게 키오스크/버스를 이용할 수 있습니다.</p>
              <p>
                연습하기를 통해 아하랜드(가상 세계)에서 실제와 비슷한 키오스크/버스 환경을 체험할 수
                있습니다.
              </p>
              <p>다양하게 둘러보며 아하랜드(가상 세계)를 즐길 수 있습니다.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.front}>도전하기</div>
            <div className={styles.back}>
              <p>주어지는 다양한 요구사항을 해결할 수 있습니다.</p>
              <p>도전 과제를 통해 응용력을 기를 수 있습니다.</p>
              <p>도전에 성공하면 성취감을 통한 동기부여를 할 수 있습니다.</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.front}>나의 정보</div>
            <div className={styles.back}>
              <p>나의 도전 과제 진척도를 확인할 수 있습니다.</p>
              <p>학생</p>
              <p>회원가입 할 때, 선생님 코드를 입력할 수 있습니다. </p>
              <p>선생님</p>
              <p>선생님 코드를 통해 연결된 학생들의 과제 진척도를 한 눈에 확인할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
