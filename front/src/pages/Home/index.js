import { React } from "react";
import styles from "./index.module.css";
import { useHistory } from "react-router-dom";
import RouterInfo from "src/constants/RouterInfo";

export default function Home() {
  const history = useHistory();

  return (
    <div>
      <h1>hello Home</h1>
      <button
        onClick={() => {
          history.push(RouterInfo.PAGE_URLS.TEST);
        }}
      >
        Multi Test
      </button>
      <button
        onClick={() => {
          history.push(RouterInfo.PAGE_URLS.TEST2);
        }}
      >
        webgl connect test
      </button>
      <button
        onClick={() => {
          history.push(RouterInfo.PAGE_URLS.TEST3);
        }}
      >
        components
      </button>
    </div>
  );
}
