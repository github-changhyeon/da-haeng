import React, { useEffect, useState } from 'react';
import styles from './StepComp.module.css';
import RouterInfo from 'src/constants/RouterInfo';
import { useHistory, generatePath } from 'react-router';

export default function StepComp({ type, max }) {
  const history = useHistory();

  const [thisType, setThisType] = useState('');
  const [thisMax, setThisMax] = useState(0);

  const [title, setTitle] = useState('');
  const [totalNum, setTotalNum] = useState(0);
  const [path, setPath] = useState(RouterInfo.PAGE_URLS.HOME);

  var lists = {
    burger: {
      title: '키오스크',
      totalNum: 5,
      path: RouterInfo.PAGE_URLS.PRACTICE,
    },
    bus: {
      title: '버스',
      totalNum: 4,
      path: RouterInfo.PAGE_URLS.PRACTICE,
    },
  };

  useEffect(() => {
    if (type != undefined && type != null) {
      setThisType(type);
    }
  }, [type]);

  useEffect(() => {
    if (max != undefined && max != null) {
      setThisMax(max);
    }
  }, [max]);

  useEffect(() => {
    if (thisType === 'burger' || thisType === 'bus') {
      setTitle(lists[thisType]['title']);
      setTotalNum(lists[thisType]['totalNum']);
      setPath(lists[thisType]['path']);
    }
  }, [thisType]);

  function onClickPractice() {
    history.push({
      pathname: generatePath(path, {
        category: thisType,
      }),
      state: { category: thisType },
    });
    return;
  }

  return (
    <div className={styles.step}>
      <div className={styles.step_title} onClick={onClickPractice}>
        {title}
      </div>

      <div className={styles.step_blocks}>
        {/* props로 받아오는 데이터가 배열이 아닌 그냥 숫자만큼 반복해야 하는 상황에서 map 대신 사용 */}
        {[...Array(totalNum)].map((n, index) => {
          // 완료 한 스테이지
          if (index + 1 <= thisMax) {
            return (
              <div
                className={styles.step_each}
                onClick={onClickPractice}
                style={{ backgroundColor: 'rgba(255, 131, 131, 0.9)' }}
              >
                {index + 1}
              </div>
            );
            // 완료 전 스테이지
          } else {
            return (
              <div
                className={styles.step_each}
                onClick={onClickPractice}
                style={{ backgroundColor: '#ccc' }}
              >
                {index + 1}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
