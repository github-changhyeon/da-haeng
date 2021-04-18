import { React } from "react";
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
        Go webgl Test
      </button>
      <button
        onClick={() => {
          history.push(RouterInfo.PAGE_URLS.TEST2);
        }}
      >
        webgl connect test
      </button>
    </div>
  );
}
