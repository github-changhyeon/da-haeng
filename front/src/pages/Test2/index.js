import { React, useEffect, useState } from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';

export default function Test2() {
  const [receiveMsg, setReceiveMsg] = useState('데이터 받기 전입니다.');
  const [unityContext, setUnityContext] = useState(null);

  const reactUpdateText = () => {
    unityContext.send('Text1', 'ReactUpdateText', 'hello react ' + new Date().getTime().toString());
  };

  useEffect(() => {
    setUnityContext(
      new UnityContext({
        loaderUrl: 'UnityBuild2/BugerIsPratice3.loader.js',
        dataUrl: 'UnityBuild2/BugerIsPratice3.data',
        frameworkUrl: 'UnityBuild2/BugerIsPratice3.framework.js',
        codeUrl: 'UnityBuild2/BugerIsPratice3.wasm',
      })
    );
    const unityContext2 = new UnityContext({
      loaderUrl: 'UnityBuild2/BugerIsPratice3.loader.js',
      dataUrl: 'UnityBuild2/BugerIsPratice3.data',
      frameworkUrl: 'UnityBuild2/BugerIsPratice3.framework.js',
      codeUrl: 'UnityBuild2/BugerIsPratice3.wasm',
    });

    unityContext2.on('SendTest', (param) => {
      setReceiveMsg(param);
    });
  }, []);
  return (
    <div>
      <h1>hello connection test</h1>
      <h1>{receiveMsg}</h1>
      <button onClick={() => reactUpdateText()}>Send</button>
      {unityContext ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Unity style={{ width: '80vw', height: '80vh' }} unityContext={unityContext} />
        </div>
      ) : null}
    </div>
  );
}
