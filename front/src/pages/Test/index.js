import { React } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

export default function Test() {
  const unityContext = new UnityContext({
    loaderUrl: "UnityBuild/webgl_test.loader.js",
    dataUrl: "UnityBuild/webgl_test.data",
    frameworkUrl: "UnityBuild/webgl_test.framework.js",
    codeUrl: "UnityBuild/webgl_test.wasm",
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
