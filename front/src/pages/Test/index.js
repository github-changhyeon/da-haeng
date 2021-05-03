import { React } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

export default function Test() {
  const unityContext = new UnityContext({
    loaderUrl: "UnitySelectCharacter/SelectCharacterWebGL.loader.js",
    dataUrl: "UnitySelectCharacter/SelectCharacterWebGL.data",
    frameworkUrl: "UnitySelectCharacter/SelectCharacterWebGL.framework.js",
    codeUrl: "UnitySelectCharacter/SelectCharacterWebGL.wasm",
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
