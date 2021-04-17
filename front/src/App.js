import { React } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RouterInfo from "src/constants/RouterInfo";

import { Test, Home } from "./pages";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={RouterInfo.PAGE_URLS.HOME} component={Home} />
        <Route path={RouterInfo.PAGE_URLS.TEST} component={Test} />
      </Switch>
    </Router>
  );
}

export default App;
