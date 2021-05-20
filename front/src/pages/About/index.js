import { React } from 'react';
import styles from './index.module.css';
import { useHistory, generatePath } from 'react-router';
import RouterInfo from 'src/constants/RouterInfo';
import Header from 'src/components/Header/Header';
import $ from 'jquery';
import classNames from 'classnames';
import BackgroundComp from 'src/components/BackgroundComp/BackgroundComp';

export default function About() {
  const history = useHistory();

  // $('.card').on('click', function () {
  //   $(this).toggleClass('flipped');
  //   console.log('클릭');
  // });

  const lists = {
    0: {
      imgPath: '/images/circle/circle_1.png',
      title: '서비스 소개',
      summary: '온라인 지역사회 중심\r\n교수 플랫폼입니다.',
      contents:
        '\r\n지역사회 중심 교수란?\r\n발달장애 학생들을\r\n위한 교육과정의 하나\r\n\r\n지역사회 환경에서\r\n활동할 때 필요한\r\n기술들을 실제 환경에서\r\n직접 교수하는 것입니다.',
    },
    1: {
      imgPath: '/images/circle/circle_2.png',
      title: '튜토리얼',
      summary: '키오스크/버스의 이용\r\n방법을 알려드립니다.',
      contents:
        '\r\n튜토리얼을 통해\r\n간단한 조작 방법을\r\n알 수 있습니다.\r\n\r\n단계별로 나누어진\r\n설명을 통해\r\n쉽게 배울 수 있습니다.',
    },
    2: {
      imgPath: '/images/circle/circle_3.png',
      title: '연습하기',
      summary: '자유롭게 키오스크/버스를\r\n이용할 수 있습니다.',
      contents:
        '\r\n연습하기를 통해\r\n아하랜드(가상세계)에서\r\n실제와 비슷한\r\n키오스크/버스 환경을\r\n체험할 수 있습니다.\r\n\r\n다양하게 둘러보며\r\n아하랜드(가상세계)를\r\n즐길 수 있습니다.',
    },
    3: {
      imgPath: '/images/circle/circle_4.png',
      title: '도전하기',
      summary: '주어지는 다양한 요구사항을\r\n해결할 수 있습니다.',
      contents:
        '\r\n도전 과제를 통해\r\n응용력을 기를 수 있습니다.\r\n\r\n도전에 성공하면\r\n성취감을 통한 동기부여를\r\n할 수 있습니다.',
    },
    4: {
      imgPath: '/images/circle/circle_5.png',
      title: '나의 정보',
      summary: '나의 도전 과제 진척도를\r\n확인할 수 있습니다.',
      contents:
        '\r\n학생은 회원가입 할 때,\r\n선생님 코드를 입력할 수\r\n있습니다.\r\n\r\n선생님은 코드를 통해\r\n연결된 학생들의 과제\r\n진척도를 한 눈에 확인할 수\r\n있습니다.',
    },
  };

  return (
    <div className={styles.about_background}>
      <BackgroundComp color="pink" />
      <Header />
      <div className={styles.about_container}>
        <div className={styles.about_title}>이용 방법</div>
        <div className={styles.about_cards}>
          {/* <div className="card"> */}
          <div className={styles.card}>
            <div className={styles.front}>
              <img className={styles.circle_icon} src={lists[0]['imgPath']} alt="circle" />
              {lists[0]['title']}
            </div>
            <div className={styles.back}>
              <div className={styles.back_title}>{lists[0]['summary']}</div>
              <div className={styles.back_contents}>{lists[0]['contents']}</div>
            </div>
          </div>
          {/* </div> */}
          <div className={styles.card}>
            <div className={styles.front}>
              <img className={styles.circle_icon} src={lists[1]['imgPath']} alt="circle" />
              {lists[1]['title']}
            </div>
            <div className={styles.back}>
              <div className={styles.back_title}>{lists[1]['summary']}</div>
              <div className={styles.back_contents}>{lists[1]['contents']}</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.front}>
              <img className={styles.circle_icon} src={lists[2]['imgPath']} alt="circle" />
              {lists[2]['title']}
            </div>
            <div className={styles.back} style={{ fontSize: '1.2rem' }}>
              <div className={styles.back_title}>{lists[2]['summary']}</div>
              <div className={styles.back_contents}>{lists[2]['contents']}</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.front}>
              <img className={styles.circle_icon} src={lists[3]['imgPath']} alt="circle" />
              {lists[3]['title']}
            </div>
            <div className={styles.back} style={{ fontSize: '1.2rem' }}>
              <div className={styles.back_title}>{lists[3]['summary']}</div>
              <div className={styles.back_contents}>{lists[3]['contents']}</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.front}>
              <img className={styles.circle_icon} src={lists[4]['imgPath']} alt="circle" />
              {lists[4]['title']}
            </div>
            <div className={styles.back} style={{ fontSize: '1.2rem' }}>
              <div className={styles.back_title}>{lists[4]['summary']}</div>
              <div className={styles.back_contents}>{lists[4]['contents']}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
