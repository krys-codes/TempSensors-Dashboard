const admin = require("firebase-admin");
const date = require("date-and-time");
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

const incrementValue = admin.firestore.FieldValue.increment(1);

async function addFirebaseUsage() {
  const getTimestamp = admin.firestore.Timestamp.now();
  const getReadableDate = date.format(getTimestamp.toDate(), "DD.MM.YYYY");
  await db.collection("usage").doc(getReadableDate).set(
    {
      appUsage: incrementValue,
    },
    { merge: true }
  );
}

module.exports = { addFirebaseUsage };
