import admin from "./config/firebaseAdmin.js";

const test = async () => {
  const users = await admin.auth().listUsers(1);
  console.log("Firebase Admin working ✅");
};

test();
