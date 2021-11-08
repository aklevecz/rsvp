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
    data: { complete: false, info: "" },
  });

  const updateFingerprint = () => {
    fpPromise.then(async (fp) => {
      const result = await fp.get();
      services
        .findFingerprint(result.visitorId)
        .then((data) => {
          setTimeout(
            () =>
              setFingerprint({
                value: result.visitorId,
                data,
              }),
            0
          );
        })
        .catch(() => {
          setFingerprint({
            value: "",
            data: { complete: false, info: "" },
          });
        });
      // fingerprintRef.current = result.visitorId;
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    updateFingerprint();
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
                completed={fingerprint.data.complete}
                info={fingerprint.data.info}
                updateFingerprint={updateFingerprint}
              />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
