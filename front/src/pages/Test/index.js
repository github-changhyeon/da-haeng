import { React } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

export default function Test() {
  const unityContext = new UnityContext({
    loaderUrl: "UnityPlaza/UnityPlaza.loader.js",
    dataUrl: "UnityPlaza/UnityPlaza.data",
    frameworkUrl: "UnityPlaza/UnityPlaza.framework.js",
    codeUrl: "UnityPlaza/UnityPlaza.wasm",
  });
  return (
    <div>
      <h1>hello webgl Test</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Unity
          style={{ width: "80vw", height: "80vh" }}
          unityContext={unityContext}
        />
      </div>
    </div>
  );
}
