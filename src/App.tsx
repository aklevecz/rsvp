import "./App.css";
import "./styles/leaveNumber.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Status from "./containers/Status";
import Angeles from "./containers/Angeles";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/status/:uid" component={Status} />
          <Route path="/" component={Angeles} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
