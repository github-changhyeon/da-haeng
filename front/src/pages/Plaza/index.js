import { Callbacks } from 'jquery';
import { React, useState, useEffect } from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';
import Loader from 'src/components/Loader/Loader';
import UnityLoader from 'src/components/UnityLoader/UnityLoader';
import { restApi } from 'src/common/axios/index';
import Swal from 'sweetalert2';

export default function Plaza() {
  const [progress, setProgress] = useState(0.0);
  const [unityContext, setUnityContext] = useState(null);

  const [here, setHere] = useState('');

  const [uid, setUid] = useState(0);
  const [uname, setUname] = useState('');

  const [category, setCategory] = useState('');
  const [playType, setPlayType] = useState('');

  // const unityContext = new UnityContext({
  //   loaderUrl: "UnityPlaza/UnityPlaza.loader.js",
  //   dataUrl: "UnityPlaza/UnityPlaza.data",
  //   frameworkUrl: "UnityPlaza/UnityPlaza.framework.js",
  //   codeUrl: "UnityPlaza/UnityPlaza.wasm",
  // });

  // 기본 정보 받아오기
  useEffect(() => {
    const path = window.location.pathname.split('/');
    setCategory(path[1]);
    setPlayType(path[2]);

    setHere(path[1]); // Loader에 전달

    if (sessionStorage.getItem('jwt') != null) {
      setUid(sessionStorage.getItem('uid'));
      setUname(sessionStorage.getItem('uname'));
    } else {
      console.log('plaza/ jwt 토큰 없음 !!');
      setUid(0);
      setUname('다햄찌');
    }
  }, []);

  const sendJsonData = () => {
    const dataObj = {
      playerName: uname,
      playerID: uid,
      category: category, // burger bus plaza
      playType: playType, // tutorial exercise practice
      stage: -1,
    };
    // 결과는 string
    unityContext.send('PlayInfoObj', 'SetPlayInfo', JSON.stringify(dataObj));
  };

  useEffect(() => {
    const temp = new UnityContext({
      loaderUrl: 'UnityPlaza/0633.loader.js',
      dataUrl: 'UnityPlaza/0633.data',
      frameworkUrl: 'UnityPlaza/0633.framework.js',
      codeUrl: 'UnityPlaza/0633.wasm',
    });
    temp.on('progress', (progression) => {
      // alert(progression);
      setProgress(progression);
    });

    setUnityContext(temp);
  }, []);

  useEffect(() => {
    if (progress !== null && progress >= 1) {
      sendJsonData();
    }
  }, [progress]);

  return (
    <div>
      {/* <h1>로딩률 : {progress * 100}</h1> */}
      {progress < 1 ? <UnityLoader percent={progress * 100} here={here} /> : null}
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
