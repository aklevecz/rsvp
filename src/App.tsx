import "./App.css";
import "./styles/leaveNumber.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Status from "./containers/Status";
import Lash from "./containers/Lash";
import FunAspect from "./containers/FunAspect";
import { useEffect, useState } from "react";
import { fpPromise, services } from ".";
import Hole from "./Hole";

function App() {
  const [fingerprint, setFingerprint] = useState({
    value: "",
    completed: false,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    fpPromise.then(async (fp) => {
      const result = await fp.get();
      services
        .findFingerprint(result.visitorId)
        .then((exists) => {
          setTimeout(
            () =>
              setFingerprint({ value: result.visitorId, completed: exists }),
            3000
          );
        })
        .catch(() => {
          setFingerprint({ value: "chicken", completed: false });
        });
      // fingerprintRef.current = result.visitorId;
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/status/:uid" component={Status} />
          <Route path="/">
            {!fingerprint.value && <Hole />}
            {fingerprint.value && (
              <FunAspect
                fingerprint={fingerprint.value}
                completed={fingerprint.completed}
              />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
