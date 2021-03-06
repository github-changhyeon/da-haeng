import { Callbacks } from 'jquery';
import { React, useState, useEffect } from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';
import Loader from 'src/components/Loader/Loader';
import UnityLoader from 'src/components/UnityLoader/UnityLoader';
import { restApi } from 'src/common/axios/index';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router';
import BackComp from 'src/components/BackComp/BackComp';
import { useHistory } from 'react-router-dom';
import BackgroundComp from 'src/components/BackgroundComp/BackgroundComp';

export default function Practice() {
  const location = useLocation();

  const history = useHistory();

  const [receiveResult, setReceiveResult] = useState('');
  const [nowBurger, setNowBurger] = useState(0);
  const [nowBus, setNowBus] = useState(0);

  const [whenClose, setWhenClose] = useState('');

  const category = location.state.category;
  const stage = location.state.stage;

  const [progress, setProgress] = useState(0.0);
  const [unityContext, setUnityContext] = useState(null);

  const [uid, setUid] = useState(0);
  const [uname, setUname] = useState('');

  // const [category, setCategory] = useState('');
  // const [playType, setPlayType] = useState('');

  // const unityContext = new UnityContext({
  //   loaderUrl: "UnityPlaza/UnityPlaza.loader.js",
  //   dataUrl: "UnityPlaza/UnityPlaza.data",
  //   frameworkUrl: "UnityPlaza/UnityPlaza.framework.js",
  //   codeUrl: "UnityPlaza/UnityPlaza.wasm",
  // });

  // 기본 정보 받아오기
  useEffect(() => {
    // const path = window.location.pathname.split('/').pop();
    // setCategory(path);

    if (sessionStorage.getItem('jwt') != null) {
      setUid(sessionStorage.getItem('uid'));
      setUname(sessionStorage.getItem('uname'));
    } else {
      console.log('plaza/ jwt 토큰 없음 !!');
      setUid(0);
      setUname('다햄찌');
    }

    const instance = restApi();

    instance
      .get(`/stage`, {
        headers: {
          Authorization: sessionStorage.getItem('jwt'),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          console.log('성공');
          setNowBurger(res.data.burgerStageResult);
          setNowBus(res.data.busStageResult);
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
  }, []);

  const onSuccessHandler = () => {
    const token = sessionStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: token,
      },
    };

    if (category === 'burger') {
      if (nowBurger < stage) {
        const resultData = {
          categoryName: 'BURGER',
          stageNumber: stage,
        };

        const instance = restApi();

        instance
          .patch(`/stage`, resultData, config)
          .then((res) => {
            // if (res.data.response === 'success') {
            if (res.status === 200) {
              // alert('결과 저장 성공');
            } else {
              // alert('대 실패 !!');
              Swal.fire({
                icon: 'error',
                title: '잠시 후에 다시 시도해주세요.',
                showConfirmButton: false,
                timer: 2000,
              });
              history.go(-1);
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: 'warning',
              title: '1. 결과를 저장하는 중에 오류가 발생했습니다.',
              text: '잠시 후에 다시 시도해주세요.',
            });
          });
      } else {
        // history.go(-1);
      }
    } else if (category === 'bus') {
      if (nowBus < stage) {
        const resultData = {
          categoryName: 'BUS',
          stageNumber: stage,
        };

        const instance = restApi();

        instance
          .patch(`/stage`, resultData, config)
          .then((res) => {
            // if (res.data.response === 'success') {
            if (res.status == 200) {
              // alert('결과 저장 성공');
              // history.go(-1);
            } else {
              // alert('대 실패 !!');
              Swal.fire({
                icon: 'error',
                title: '잠시 후에 다시 시도해주세요.',
                showConfirmButton: false,
                timer: 2000,
              });
              history.go(-1);
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: 'warning',
              title: '2. 결과를 저장하는 중에 오류가 발생했습니다.',
              text: '잠시 후에 다시 시도해주세요.',
            });
            history.go(-1);
          });
      } else {
        // history.go(-1);
      }
    }
  };

  useEffect(() => {
    if (receiveResult === 'success') {
      onSuccessHandler();
    } else if (receiveResult === 'fail') {
      // history.go(-1);
    }
    // console.log(receiveResult);
  }, [receiveResult]);

  useEffect(() => {
    if (whenClose === 'close') {
      history.go(-1);
    }
  }, [whenClose]);

  const sendJsonData = () => {
    const dataObj = {
      playerName: uname,
      playerID: uid,
      category: category, // burger bus plaza
      playType: 'practice', // tutorial exercise practice
      stage: stage,
    };
    // 결과는 string
    unityContext.send('PlayInfoObj', 'SetPlayInfo', JSON.stringify(dataObj));
  };

  useEffect(() => {
    // console.log('path');
    // console.log(category);
    const temp = new UnityContext({
      loaderUrl: 'UnityPlaza/0633.loader.js',
      dataUrl: 'UnityPlaza/0633.data',
      frameworkUrl: 'UnityPlaza/0633.framework.js',
      codeUrl: 'UnityPlaza/0633.wasm',
    });
    // console.log(temp);
    // console.log('temp 시작 전');
    temp.on('progress', (progression) => {
      // alert(progression);
      setProgress(progression);
    });

    setUnityContext(temp);
    console.log(category);

    temp.on('SendResult', (result) => {
      if (result === 'success' || result === 'fail') {
        setReceiveResult(result);
      } else if (result === 'close') {
        setWhenClose(result);
      }
    });
  }, []);

  useEffect(() => {
    if (progress !== null && progress >= 1) {
      // console.log('sendJsonData 시작');
      sendJsonData();
    }
  }, [progress]);

  return (
    <div>
      <BackgroundComp color="yellow" />
      <BackComp />
      {/* <h1>로딩률 : {progress * 100}</h1> */}
      {progress < 1 ? <UnityLoader percent={progress * 100} here="practice" /> : null}
      {unityContext !== null ? (
        <Unity
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            // TODO 커서 바꾸기
            // cursor: 'url(https://greghub.github.io/coloron/public/svg/cursor-tap.svg), pointer',
          }}
          unityContext={unityContext}
        />
      ) : null}
    </div>
  );
}
