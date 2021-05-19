import { React, useEffect, useState } from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';

export default function Test2() {
  const [progress, setProgress] = useState(0.0);

  // const [receiveMsg, setReceiveMsg] = useState("데이터 받기 전입니다.");
  const [receiveCategory, setReceiveCategory] = useState('');
  const [receiveStage, setReceiveStage] = useState(0);
  const [receiveResult, setReceiveResult] = useState('');
  const [unityContext, setUnityContext] = useState(null);

  // const unityContext = new UnityContext({
  //   loaderUrl: "UnityBuild2/connection_test.loader.js",
  //   dataUrl: "UnityBuild2/connection_test.data",
  //   frameworkUrl: "UnityBuild2/connection_test.framework.js",
  //   codeUrl: "UnityBuild2/connection_test.wasm",
  // });

  const reactUpdateText = () => {
    unityContext.send('Text1', 'ReactUpdateText', 'hello react ' + new Date().getTime().toString());
  };

  const sendJsonData = () => {
    const dataObj = {
      playerName: '다햄찌',
      playerID: 888,
      category: 'burger', // burger bus plaza
      playType: 'practice', // tutorial exercise practice
      stage: 1,
    };
    // 결과는 string
    unityContext.send('PlayInfoObj', 'SetPlayInfo', JSON.stringify(dataObj));
  };

  useEffect(() => {
    if (progress !== null && progress >= 1) {
      sendJsonData();
    }
  }, [progress]);

  useEffect(() => {
    setUnityContext(
      new UnityContext({
        loaderUrl: 'UnityPlaza/BugerIsPratice3.loader.js',
        dataUrl: 'UnityPlaza/BugerIsPratice3.data',
        frameworkUrl: 'UnityPlaza/BugerIsPratice3.framework.js',
        codeUrl: 'UnityPlaza/BugerIsPratice3.wasm',
      })
    );
    const unityContext2 = new UnityContext({
      loaderUrl: 'UnityPlaza/BugerIsPratice3.loader.js',
      dataUrl: 'UnityPlaza/BugerIsPratice3.data',
      frameworkUrl: 'UnityPlaza/BugerIsPratice3.framework.js',
      codeUrl: 'UnityPlaza/BugerIsPratice3.wasm',
    });

    unityContext2.on('progress', (progression) => {
      // alert(progression);
      setProgress(progression);
    });

    setUnityContext(unityContext2);

    unityContext2.on('SendResult', (category, stage, result) => {
      setReceiveCategory(category);
      setReceiveStage(stage);
      setReceiveResult(result);
    });
  }, []);
  return (
    <div>
      <h1>hello connection test</h1>
      <h1>{receiveCategory}</h1>
      <h1>{receiveStage}</h1>
      <h1>{receiveResult}</h1>
      <button onClick={() => reactUpdateText()}>Send</button>
      {unityContext ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Unity style={{ width: '80vw', height: '80vh' }} unityContext={unityContext} />
        </div>
      ) : null}
    </div>
  );
}
