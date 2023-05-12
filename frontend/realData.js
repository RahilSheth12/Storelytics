import React, { useState, useEffect } from "react";
import { Text } from "react-native";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
  onSnapshot,
  doc,
} from "firebase/firestore";

import { getDatabase, ref, onValue } from "firebase/database";

import { initializeApp } from "firebase/app";

const realData = () => {
  let [people, setPeople] = useState({});

  const firebaseApp = initializeApp({
    apiKey: "AIzaSyBWQFQ3o1hfYLZPghlWO9UMc5BJ4aMBJSg",
    databaseURL: "https://storelytics-app-default-rtdb.firebaseio.com/",
    projectId: "storelytics-app",
  });

  const db = getDatabase(firebaseApp);
  const ref1 = ref(db, "/Customers");

  const fire_db = getFirestore();
  const q = query(collection(fire_db, "Customers"));

  // used for when a person leaves and also for graph purposes (day, week, month, etc)
  // let arr = [];

  let new_entry = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const data = JSON.stringify(change.doc.data());
        console.log(data);
        // const obj = JSON.parse(data);
        // console.log(obj.gender);
        // arr.push(obj.gender);
        // console.log(arr);
      }
    });
  });
  // console.log(arr);

  // // const fire_db = getFirestore();

  // // const query = fire_db.collection("/Customers");

  // useEffect(() => {
  //   onValue(ref1, (snapshot) => {
  //     setPeople(snapshot.toJSON());
  //   });
  // }, []);

  // useEffect(() => {
  //   const all = Object.entries(people).map(function (data, index) {
  //     const key = data[0];
  //     const real_data = JSON.parse(data[1]);
  //     console.log("type: " + typeof real_data);
  //     console.log("people: " + people);
  //     console.log(real_data);
  //     console.log(real_data["gender"]);
  //   });
  // }, [people]);

  return <Text>lol</Text>;
};

export default realData;
