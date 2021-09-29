import "./App.css";
import "./styles/leaveNumber.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Status from "./containers/Status";
import Lash from "./containers/Lash";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/status/:uid" component={Status} />
          <Route path="/" component={Lash} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
