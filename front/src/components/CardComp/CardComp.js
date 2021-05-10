import React, { useEffect, useState } from 'react';
import styles from './CardComp.module.css';
import LockIcon from '@material-ui/icons/Lock';
import RouterInfo from 'src/constants/RouterInfo';
import { useHistory, generatePath } from 'react-router';

export default function CardComp({ type }) {
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

  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [imgPath, setImgPath] = useState('');
  const [color, setColor] = useState('');
  const [colorDeep, setColorDeep] = useState('');
  const [lockable, setLockable] = useState(false);
  const [path, setPath] = useState(RouterInfo.PAGE_URLS.HOME);
  const [category, setCategory] = useState('');

  var lists = {
    burger_tutorial: {
      title: '튜토리얼',
      contents: '키오스크의 이용 방법을\r\n익힐 수 있어요',
      imgPath: '/images/dahamzzi/ch_help.png',
      color: '#A1CD63',
      colorDeep: '#82B13D',
      lockable: false,
      path: RouterInfo.PAGE_URLS.TUTORIAL,
      category: 'burger',
    },
    burger_exercise: {
      title: '연습하기',
      contents: '자유롭게 키오스크를\r\n이용해보세요',
      imgPath: '/images/dahamzzi/ch_exercise.png',
      color: '#7CB3E2',
      colorDeep: '#659AC8',
      lockable: true,
      path: RouterInfo.PAGE_URLS.EXERCISE,
      category: 'burger',
    },
    burger_practice: {
      title: '도전하기',
      contents: '주어지는 다양한\r\n요구사항을 해결해주세요',
      imgPath: '/images/dahamzzi/ch_practice1.png',
      color: '#F38375',
      colorDeep: '#E56D5D',
      lockable: true,
      path: RouterInfo.PAGE_URLS.PRACTICE,
      category: 'burger',
    },
    bus_tutorial: {
      title: '튜토리얼',
      contents: '시내버스의 이용 방법을\r\n익힐 수 있어요',
      imgPath: '/images/dahamzzi/ch_help.png',
      color: '#A1CD63',
      colorDeep: '#82B13D',
      lockable: false,
      path: RouterInfo.PAGE_URLS.TUTORIAL,
      category: 'bus',
    },
    bus_exercise: {
      title: '연습하기',
      contents: '자유롭게 시내버스를\r\n이용해보세요',
      imgPath: '/images/dahamzzi/ch_exercise.png',
      color: '#7CB3E2',
      colorDeep: '#659AC8',
      lockable: true,
      path: RouterInfo.PAGE_URLS.EXERCISE,
      category: 'bus',
    },
    bus_practice: {
      title: '도전하기',
      contents: '주어지는 다양한\r\n요구사항을 해결해주세요',
      imgPath: '/images/dahamzzi/ch_practice1.png',
      color: '#F38375',
      colorDeep: '#E56D5D',
      lockable: true,
      path: RouterInfo.PAGE_URLS.PRACTICE,
      category: 'bus',
    },
  };

  useEffect(() => {
    if (type != undefined && type != null) {
      setTitle(lists[type]['title']);
      setContents(lists[type]['contents']);
      setImgPath(lists[type]['imgPath']);
      setColor(lists[type]['color']);
      setColorDeep(lists[type]['colorDeep']);
      setLockable(lists[type]['lockable']);
      setPath(lists[type]['path']);
      setCategory(lists[type]['category']);
    }
  }, [type]);

  return (
    <div className={styles.card} style={{ backgroundColor: color }}>
      {/* 로그인 안했을 때 , 잠금을 해야 하는 카드라면 */}
      {!isLogined && lockable ? (
        <div
          className={styles.cover_lock}
          onClick={() => {
            history.push(RouterInfo.PAGE_URLS.LOGIN);
          }}
        >
          <LockIcon className={styles.lock_icon} />
          <div className={styles.lock_bottom}></div>
        </div>
      ) : (
        <div
          className={styles.cover_open}
          onClick={() => {
            history.push({
              pathname: generatePath(path, {
                category: category,
                uid: uid,
              }),
              state: { category: category },
            });
          }}
        ></div>
      )}
      <div className={styles.title} style={{ color: color }}>
        {title}
      </div>
      <div className={styles.contents}>{contents}</div>
      <div className={styles.card_bottom} style={{ backgroundColor: colorDeep }}></div>
      <div className={styles.image_container}>
        <img className={styles.image} src={imgPath} alt="image" />
      </div>
    </div>
  );
}
