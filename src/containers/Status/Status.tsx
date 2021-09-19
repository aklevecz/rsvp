import { shallowEqual } from "../../utils";

export default function Status({
  state,
  yesComing,
  notComing,
  handleChange,
  remoteState,
  update,
}: any) {
  return (
    <>
      <div id="coming" className="status__line status__coming">
        <div>coming?</div>
        <div className="button__wrapper">
          <button
            onClick={yesComing}
            className={`${state.coming ? "active" : ""}`}
          >
            yes
          </button>
          <button
            onClick={notComing}
            className={`${!state.coming ? "active" : ""}`}
          >
            no
          </button>
        </div>
      </div>
      {/* <div id="contactInfo" className="status__line status__contact">
        <div>contact info</div>
        <input
          className="input--borderless"
          onChange={handleChange}
          value={state.contactInfo}
        />
      </div> */}
      <div id="vice" className="status__line status__vice">
        <div>favorite vices</div>
        <textarea onChange={handleChange} value={state.vice} />
      </div>
      <div id="pizza" className="status__line status__pizza">
        <div>pizza topping preferences</div>
        <textarea onChange={handleChange} value={state.pizza} />
      </div>
      <div style={{ margin: "20px auto" }}>
        {!shallowEqual(state, remoteState) && (
          <button onClick={update} style={{ margin: "auto", display: "block" }}>
            update
          </button>
        )}
      </div>
    </>
  );
}
