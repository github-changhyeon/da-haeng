import { Callbacks } from 'jquery';
import { React, useState, useEffect } from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';
import Loader from 'src/components/Loader/Loader';
import UnityLoader from 'src/components/UnityLoader/UnityLoader';

export default function Test() {
  const [progress, setProgress] = useState(0.0);
  const [unityContext, setUnityContext] = useState(null);

  // const unityContext = new UnityContext({
  //   loaderUrl: "UnityPlaza/UnityPlaza.loader.js",
  //   dataUrl: "UnityPlaza/UnityPlaza.data",
  //   frameworkUrl: "UnityPlaza/UnityPlaza.framework.js",
  //   codeUrl: "UnityPlaza/UnityPlaza.wasm",
  // });

  const sendJsonData = () => {
    const dataObj = {
      playerName: '김창현',
      playerID: 888,
      category: 'bus', // burger bus plaza
      playType: 'practice',
      stage: -1,
    };
    // 결과는 string
    unityContext.send('PlayInfoObj', 'SetPlayInfo', JSON.stringify(dataObj));
    alert('힘내자아자아자');
  };

  useEffect(() => {
    const temp = new UnityContext({
      loaderUrl: 'UnityPlaza/BugerIsPratice3.loader.js',
      dataUrl: 'UnityPlaza/BugerIsPratice3.data',
      frameworkUrl: 'UnityPlaza/BugerIsPratice3.framework.js',
      codeUrl: 'UnityPlaza/BugerIsPratice3.wasm',
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
      {progress < 1 ? <UnityLoader percent={progress * 100} /> : null}
      {unityContext !== null ? (
        <Unity
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          unityContext={unityContext}
        />
      ) : null}
    </div>
  );
}
