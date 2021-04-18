import { React } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

export default function Test2() {
  const unityContext = new UnityContext({
    loaderUrl: "UnityBuild2/connection_test.loader.js",
    dataUrl: "UnityBuild2/connection_test.data",
    frameworkUrl: "UnityBuild2/connection_test.framework.js",
    codeUrl: "UnityBuild2/connection_test.wasm",
  });
  const reactUpdateText = () => {
    unityContext.send("Text1", "ReactUpdateText", "hello react");
  };
  return (
    <div>
      <h1>hello connection test</h1>
      <button onClick={() => reactUpdateText()}>Send</button>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Unity
          style={{ width: "80vw", height: "80vh" }}
          unityContext={unityContext}
        />
      </div>
    </div>
  );
}
