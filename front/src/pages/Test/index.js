import { React, useState, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

export default function Test() {
  const [progress, setProgress] = useState(0.0);
  const [unityContext, setUnityContext] = useState(null);

  // const unityContext = new UnityContext({
  //   loaderUrl: "UnityPlaza/UnityPlaza.loader.js",
  //   dataUrl: "UnityPlaza/UnityPlaza.data",
  //   frameworkUrl: "UnityPlaza/UnityPlaza.framework.js",
  //   codeUrl: "UnityPlaza/UnityPlaza.wasm",
  // });

  useEffect(() => {
    const temp = new UnityContext({
      loaderUrl: "UnityPlaza/UnityPlaza.loader.js",
      dataUrl: "UnityPlaza/UnityPlaza.data",
      frameworkUrl: "UnityPlaza/UnityPlaza.framework.js",
      codeUrl: "UnityPlaza/UnityPlaza.wasm",
    });
    temp.on("progress", (progression) => {
      // alert(progression);
      setProgress(progression);
    });
    setUnityContext(temp);
  }, []);

  return (
    <div>
      <h1>로딩률 : {progress * 100}</h1>
      {unityContext !== null ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Unity
            style={{ width: "80vw", height: "80vh" }}
            unityContext={unityContext}
          />
        </div>
      ) : null}
    </div>
  );
}
