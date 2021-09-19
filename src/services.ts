class Services {
  private url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://bizza.pizza";
  private uid: string = "";

  public sendRSVP = (notifyDesc: string, contactInfo: string) =>
    fetch(`${this.url}/add-entry`, {
      method: "POST",
      body: JSON.stringify({ notifyDesc, contactInfo }),
    }).then((r) => r.json());

  public getRaptor = (uid: string) =>
    fetch(`${this.url}/raptor?raptor=${uid}`).then((r) => {
      if (r.status === 200) {
        this.uid = uid;
        return r.json();
      }
      if (r.status === 404) {
        throw new Error("NO_USER");
      }
    });

  public updateRaptor = (updates: object) =>
    fetch(`${this.url}/raptor`, {
      method: "POST",
      headers: { Authorization: this.uid },
      body: JSON.stringify(updates),
    }).then((r) => r.json());

  public leaveNumber = (number: string) =>
    fetch(`${this.url}/leave-number`, {
      method: "POST",
      body: JSON.stringify({ number }),
    }).then((r) => r.json());
}

export default Services;
