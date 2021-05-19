import React, { useEffect, useState } from 'react';
import styles from './StepComp.module.css';
import RouterInfo from 'src/constants/RouterInfo';
import { useHistory, generatePath } from 'react-router';
import { restApi } from 'src/common/axios/index';
import Swal from 'sweetalert2';

export default function StepComp({ type, max }) {
  const history = useHistory();

  const [role, setRole] = useState('');

  const [thisType, setThisType] = useState('');
  const [thisMax, setThisMax] = useState(0);

  const [title, setTitle] = useState('');
  const [totalNum, setTotalNum] = useState(0);
  const [path, setPath] = useState(RouterInfo.PAGE_URLS.HOME);

  var lists = {
    burger: {
      title: '키오스크',
      totalNum: 5,
      path: RouterInfo.PAGE_URLS.STAGES,
    },
    bus: {
      title: '버스',
      totalNum: 3,
      path: RouterInfo.PAGE_URLS.STAGES,
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
      pathname: path,
      state: { category: thisType },
    });
    return;
  }

  function onClickStages() {
    if (role === 'ROLE_STUDENT') {
      history.push({
        pathname: path,
        state: { category: thisType },
      });
    }
    return;
  }

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
            setRole(res.data.role);
          } else {
            console.log('반만 성공');
          }
        })
        .catch((err) => {
          console.log(err);
          // alert('실패!!!!');
          Swal.fire({
            icon: 'warning',
            title: '내 정보를 불러오는 중에 오류가 발생했습니다.',
            text: '잠시 후에 다시 시도해주세요.',
          });
        });
    } else {
      console.log('main/ jwt 토큰 없음 !!');
    }
  }, []);

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
                onClick={onClickStages}
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
                onClick={onClickStages}
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
