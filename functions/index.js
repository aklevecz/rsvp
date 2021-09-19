const crypto = require("crypto");
const functions = require("firebase-functions");
const { Firestore } = require("@google-cloud/firestore");
const cors = require("cors")({
  origin: true,
});

const admin = require("firebase-admin");

const serviceAccount = require("./eggsvp-firebase-adminsdk-x6ymx-1b5bae6fcb.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const RAPTORS = "RAPTORS";
const RSVPS = "RSVPS";
const QUEUE = "QUEUE";
const ANGELES = "ANGELES";
const CAVE = "CAVE";

const db = new Firestore();
exports.addEntry = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    return res.status(403).send({ error: "BAD_REQUEST_TYPE" });
  }
  return cors(req, res, () => {
    const { contactInfo, notifyDesc } = JSON.parse(req.body);
    const nonce = `0`;
    const shasum = crypto.createHash("sha1");
    const santiziedContactInfo = contactInfo
      .trim()
      .replace(/ /g, "_")
      .toLowerCase();
    shasum.update(santiziedContactInfo + nonce);
    const hex = shasum.digest("hex");
    const contactHash = santiziedContactInfo.slice(0, 3) + hex.slice(0, 5);

    db.collection(RSVPS)
      .doc(santiziedContactInfo)
      .set({ contactInfo: santiziedContactInfo, notifyDesc, contactHash });

    db.collection(RAPTORS).doc(contactHash).set({
      contactHash,
      coming: true,
      pizza: "",
      vice: "",
      contactInfo: santiziedContactInfo,
    });
    res.status(200).send({ success: true });
  });
});

let lastTimestamp = 0;
exports.songQueue = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    if (req.method === "GET") {
      try {
        const currentUri = req.query["current-track"];
        const track = await db
          .collection(QUEUE)
          .where("uri", "==", currentUri)
          .get();
        track.forEach((doc) => {
          lastTimestamp = doc.id;
        });
      } catch (e) {
        console.log("no track provided");
      }
      const queue = await db.collection(QUEUE).get();
      let data = [];
      queue.forEach((q) => {
        data.push({ ...q.data(), timestamp: q.id });
      });
      return res.status(200).send({ data, lastTimestamp });
    }
    return res.status(404);
  });
});

exports.queueSong = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  return cors(req, res, async () => {
    data = req.body;

    if (!data.chosenSong) {
      return res.status(404).send({ error: "no song provided" });
    }

    db.collection(QUEUE)
      .doc(Firestore.Timestamp.now().seconds.toString())
      .set({ ...data.chosenSong });
    return res.status(200).send({ success: true });
  });
});

exports.raptor = functions.https.onRequest(async (req, res) => {
  return cors(req, res, () => {
    if (req.method === "GET") {
      const { raptor } = req.query;
      return db
        .collection(RAPTORS)
        .doc(raptor)
        .get()
        .then((doc) => {
          if (doc.exists) {
            return res.status(200).send({ ...doc.data() });
          }
          return res.status(404).send({ error: "nothing" });
        })
        .catch(console.log);
    }
    if (req.method === "POST") {
      const uid = req.headers.authorization;
      return db
        .collection(RAPTORS)
        .doc(uid)
        .update({ ...JSON.parse(req.body) })
        .then((resp) => {
          console.log(resp);
          return res.status(200).send(req.body);
        })
        .catch((e) => {
          return res.status(403);
        });
    }
    return res.status(404).send({ error: "nothing" });
  });
});

exports.leaveNumber = functions.https.onRequest(async (req, res) => {
  return cors(req, res, () => {
    const data = JSON.parse(req.body);
    const { number } = data;
    return db
      .collection(ANGELES)
      .doc(number)
      .set({ number })
      .then((resp) => {
        return res.status(200).send(true);
      });
  });
});

exports.caveSignup = functions.https.onRequest(async (req, res) => {
  return cors(req, res, () => {
    const data = JSON.parse(req.body);
    const { name, email } = data;
    return db
      .collection(CAVE)
      .doc(email)
      .set({ name, email })
      .then((resp) => {
        return res.status(200).send(true);
      });
  });
});
