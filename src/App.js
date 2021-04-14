import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Pages
import Winter2021 from "./pages/Winter2021";
import Spring2021 from "./pages/Spring2021";
import Summer2021 from "./pages/Summer2021";
import Fall2021 from "./pages/Fall2021";

function App() {
  return (
    <Router>
      <Route path="/Winter2021">
        <Winter2021 />
      </Route>
      <Route exact path="/">
        <Spring2021 />
      </Route>
      <Route path="/Summer2021">
        <Summer2021 />
      </Route>
      <Route path="/Fall2021">
        <Fall2021 />
      </Route>
    </Router>
  );
}

export default App;
