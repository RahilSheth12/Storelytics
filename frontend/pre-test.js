// https://firebase.google.com/docs/firestore/query-data/listen#web-version-9
// need later ^
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get } from "firebase/database";

const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database\
  databaseURL: "https://storelytics-app-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

const ref2 = ref(database, "/Customers");

// get(child(dbRef, `/Customers`))
//   .then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// onValue(ref2, (snapshot) => {
//   const data = snapshot.toJSON();
//   // when new person enters
//   var recentKey = Object.keys(data).sort().reverse()[0];
//   var recentPerson = data[recentKey];
//   console.log(recentKey);
//   console.log(recentPerson);
//   console.log(data.numChildren())
// });

ref2.on("child_added", (snapshot, prevChildKey) => {
  const newPost = snapshot.val();
  console.log("Author: " + newPost.author);
  console.log("Title: " + newPost.title);
  console.log("Previous Post ID: " + prevChildKey);
});
