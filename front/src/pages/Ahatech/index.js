import { React } from 'react';
import styles from './index.module.css';
import { useHistory, generatePath } from 'react-router';
import RouterInfo from 'src/constants/RouterInfo';
import Header from 'src/components/Header/Header';
import $ from 'jquery';
import classNames from 'classnames';
import BackgroundComp from 'src/components/BackgroundComp/BackgroundComp';

export default function Ahatech() {
  const history = useHistory();

  // $('.card').on('click', function () {
  //   $(this).toggleClass('flipped');
  //   console.log('클릭');
  // });

  const lists = {
    0: {
      imgPath: '/images/aha/aha_1.png',
      title: '이주희',
      summary: '인프라\r\n백엔드\r\n유니티',
      contents: '\r\n머장님\r\n\r\n얘들아...\r\n우리 좀\r\n하는 것 같아...',
    },
    1: {
      imgPath: '/images/aha/aha_2.png',
      title: '김예슬',
      summary: '프론트엔드',
      contents:
        '\r\n킬러\r\n\r\n내일은 할 수 있겠어?\r\n그런 마음으로\r\n내일모레는\r\n할 수 있겠어?',
    },
    2: {
      imgPath: '/images/aha/aha_3.png',
      title: '김창현',
      summary: '유니티',
      contents: '\r\n귀염둥이\r\n\r\n내가 이렇게\r\n코드를 잘 짠다고?',
    },
    3: {
      imgPath: '/images/aha/aha_4.png',
      title: '박수빈',
      summary: '백엔드\r\n유니티',
      contents: '\r\n캔디\r\n\r\n두려워하지 마,\r\n닥치면 다 해!',
    },
    4: {
      imgPath: '/images/aha/aha_5.png',
      title: '백민주',
      summary: '유니티',
      contents: '\r\n얼음 공주\r\n\r\n언니 오빠의 말씀을\r\n잘 듣겠습니다.',
    },
  };

  return (
    <div className={styles.aha_background}>
      <BackgroundComp color="pink" />
      <Header />
      <div className={styles.aha_container}>
        <div className={styles.aha_title}>아하텍</div>
        <div className={styles.aha_cards}>
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
            <div className={styles.back}>
              <div className={styles.back_title}>{lists[2]['summary']}</div>
              <div className={styles.back_contents}>{lists[2]['contents']}</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.front}>
              <img className={styles.circle_icon} src={lists[3]['imgPath']} alt="circle" />
              {lists[3]['title']}
            </div>
            <div className={styles.back}>
              <div className={styles.back_title}>{lists[3]['summary']}</div>
              <div className={styles.back_contents}>{lists[3]['contents']}</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.front}>
              <img className={styles.circle_icon} src={lists[4]['imgPath']} alt="circle" />
              {lists[4]['title']}
            </div>
            <div className={styles.back}>
              <div className={styles.back_title}>{lists[4]['summary']}</div>
              <div className={styles.back_contents}>{lists[4]['contents']}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
