// // node --experimental-json-modules test.js

// //TypeError [ERR_UNKNOWN_FILE_EXTENSION] [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".json" for

// // DOCS: https://firebase.google.com/docs/database/admin/retrieve-data, https://firebase.google.com/docs/firestore/query-data/listen#node.js
// // var admin = require("firebase-admin");
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// var admin = require("firebase-admin");
// var serviceAccount = require("./storeDB.json");
// const { getDatabase } = require("firebase-admin/database");
// const { getFirestore, QuerySnapshot } = require("firebase-admin/firestore");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://storelytics-app-default-rtdb.firebaseio.com/",
// });

// const db = getDatabase();
// const ref = db.ref("/Customers");

// const fire_db = getFirestore();

// const query = fire_db
//   .collection("/Customers")

//   // event listener for when a user leaves the store and the user is entered into the firestore database
//   .onSnapshot((querySnapshot) => {
//     querySnapshot.docChanges().forEach((change) => {
//       if (change.type === "added") {
//         const data = JSON.stringify(change.doc.data()); // access data with data['field']
//         const obj = JSON.parse(data);
//         console.log(obj.gender);
//       }
//     });
//   });

// // event listener for when a new user is added (realtime database)
// ref.on("child_added", (snapshot, prevChildKey) => {
//   var newPost = snapshot.toJSON();
//   console.log("new user: " + newPost);
//   const data = JSON.parse(newPost); // data of new user (data['time_in'] is access method)
//   const key = snapshot.key; // key of new user
// });

// // import admin from "firebase-admin";

// // var serviceAccount = require("./storeDB.json");
// // import serviceAccount from "./storeDB.json";

// // // const { getDatabase } = require("firebase-admin/database");
// // import { getDatabase } from "firebase-admin/database";

// // // const { getFirestore, QuerySnapshot } = require("firebase-admin/firestore");
// // import { getFirestore, QuerySnapshot } from "firebase-admin/firestore";

// // // admin.initializeApp({
// // //   credential: admin.credential.cert(serviceAccount),
// // //   databaseURL: "https://storelytics-app-default-rtdb.firebaseio.com/",
// // // });

// // const db = getDatabase();
// // const ref = db.ref("/Customers");

// // const fire_db = getFirestore();

// // const query = fire_db
// //   .collection("/Customers")

// //   // event listener for when a user leaves the store and the user is entered into the firestore database
// //   .onSnapshot((querySnapshot) => {
// //     querySnapshot.docChanges().forEach((change) => {
// //       if (change.type === "added") {
// //         let data = change.doc.data(); // access data with data['field']
// //         console.log("data: " + data);
// //       }
// //     });
// //   });

// // // event listener for when a new user is added (realtime database)
// // ref.on("child_added", (snapshot, prevChildKey) => {
// //   var newPost = snapshot.toJSON();
// //   const data = JSON.parse(newPost);
// //   console.log(data);
// //   // data.map(())
// //   // console.log(data); // data of new user (data['time_in'] is access method)
// //   const key = snapshot.key; // key of new user
// // });

let numbers = [0, 1, 2, 3, 30, 20, 10];
numbers.sort((a, b) => a - b);

console.log(numbers);
