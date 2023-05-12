import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import "../../test_copy.json";
import moment from "moment";
import Button from "../components/Button";
import { theme } from "../core/theme";
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
const Card = ({ cardCounterProp, refresh }) => {
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
  let arrOfTimeIns = [];
  let arrOfTimeOuts = [];
  let arrOfNumberInStores = [];
  let arrOfGenders = [];
  let arrOfRaces = [];
  let arrOfEmotions = [];
  let arrOfIds = [];

  let [finish, setFinish] = useState(false);
  let [data1, setData] = useState([]);

  // let counter1 = 0;

  useEffect(() => {
    const new_entry = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = JSON.stringify(change.doc.data());
          console.log(data);
          console.log(JSON.parse(data)["id"]);
          setData((prevState) => ({
            ...prevState,
            [String(JSON.parse(data)["id"])]: data,
          }));
          // counter1++;
        }
      });
      return setFinish(true);
    });
    onValue(ref1, (snapshot) => {
      setPeople(snapshot.toJSON());
    });
    // cardCounterProp--;
  }, []);

  console.log("====================================");
  console.log(data1);
  console.log("====================================");

  arrOfTimeIns = Object.entries(data1).map(function (data, index) {
    // console.log(data);
    const timeIn = JSON.parse(data[1])["time_in"];
    return timeIn;
  });
  console.log(arrOfTimeIns);

  arrOfTimeOuts = Object.entries(data1).map(function (data, index) {
    // console.log(data);
    const timeOut = JSON.parse(data[1])["time_out"];
    return timeOut;
  });
  console.log(arrOfTimeOuts);

  arrOfNumberInStores = Object.entries(people).map(function (data, index) {
    const timeInStore = JSON.parse(data[1])["number_in_store"];
    return timeInStore;
  });

  console.log(arrOfNumberInStores);

  arrOfRaces = Object.entries(data1).map(function (data, index) {
    // console.log(data);
    const races = JSON.parse(data[1])["race"];
    return races;
  });
  console.log(arrOfRaces);

  arrOfGenders = Object.entries(data1).map(function (data, index) {
    // console.log(data);
    const genders = JSON.parse(data[1])["gender"];
    return genders;
  });
  console.log(arrOfGenders);

  arrOfEmotions = Object.entries(data1).map(function (data, index) {
    // console.log(data);
    const emotions = JSON.parse(data[1])["emotion"];
    return emotions;
  });
  console.log(arrOfEmotions);

  arrOfIds = Object.entries(data1).map(function (data, index) {
    // console.log(data);
    const ids = JSON.parse(data[1])["id"];
    return ids;
  });
  console.log(arrOfIds);

  let totalTimeSpentInShop = [];

  for (let i = 0; i < arrOfTimeOuts.length; i++) {
    // if (arrOfTimeOuts[i] && arrOfTimeIns[i]) {
    const test = arrOfTimeIns[i];

    //time in
    let test1 = test.substring(0, 1);
    const quantity1 = test1;
    let months = parseInt(quantity1, 10);

    let test2 = test.substring(2, 4);
    const quantity2 = test2;
    let days = parseInt(quantity2, 10);

    let test3 = test.substring(5, 9);
    const quantity3 = test3;
    let years = parseInt(quantity3, 10);

    let test4 = "";
    if (test.length === 17) {
      test4 = test.substring(10, 11);
    } else {
      test4 = test.substring(10, 12);
    }
    const quantity4 = test4;
    let hours = parseInt(quantity4, 10);

    let test5 = "";
    if (test.length === 17) {
      test5 = test.substring(12, 14);
    } else {
      test5 = test.substring(13, 15);
    }
    const quantity5 = test5;
    let mins = parseInt(quantity5, 10);

    //time out
    const Time = arrOfTimeOuts[i];

    let Time1 = Time.substring(0, 1);
    const quantity11 = Time1;
    let months2 = parseInt(quantity11, 10);

    let Time2 = Time.substring(2, 4);
    const quantity22 = Time2;
    let days2 = parseInt(quantity22, 10);

    let Time3 = Time.substring(5, 9);
    const quantity33 = Time3;
    let years2 = parseInt(quantity33, 10);

    let Time4 = "";
    if (Time.length === 17) {
      Time4 = Time.substring(10, 11);
    } else {
      Time4 = Time.substring(10, 12);
    }
    const quantity44 = Time4;
    let hours2 = parseInt(quantity44, 10);

    let Time5 = "";
    if (Time.length === 17) {
      Time5 = Time.substring(12, 14);
    } else {
      Time5 = Time.substring(13, 15);
    }
    const quantity55 = Time5;
    let mins2 = parseInt(quantity55, 10);

    const m1 = moment({
      y: years,
      M: months - 1,
      d: days,
      h: hours,
      m: mins,
    });
    const m2 = moment({
      y: years2,
      M: months2 - 1,
      d: days2,
      h: hours2,
      m: mins2,
    });

    totalTimeSpentInShop.push(m2.diff(m1, "minutes"));
    console.log(totalTimeSpentInShop);
    // }
  }

  let bad = "#a70c25";
  let meh = "#a7640c";
  let ok = "#a7950c";
  let good = "#8da70c";
  let amazing = "#1ba70c";

  let colorOfChoice = "";

  if (totalTimeSpentInShop[cardCounterProp] < 2) {
    colorOfChoice = bad;
  } else if (
    totalTimeSpentInShop[cardCounterProp] >= 2 &&
    totalTimeSpentInShop[cardCounterProp] < 5
  ) {
    colorOfChoice = meh;
  } else if (
    totalTimeSpentInShop[cardCounterProp] >= 5 &&
    totalTimeSpentInShop[cardCounterProp] < 8
  ) {
    colorOfChoice = ok;
  } else if (
    totalTimeSpentInShop[cardCounterProp] >= 8 &&
    totalTimeSpentInShop[cardCounterProp] < 11
  ) {
    colorOfChoice = good;
  } else if (totalTimeSpentInShop[cardCounterProp] >= 11) {
    colorOfChoice = amazing;
  } else {
    colorOfChoice = "black";
  }
  // let line1 = "";
  // const displayCards = () => {
  //   for (let i = 0; i < arrOfTimeOuts.length; i++) {
  //     <View>
  //       <Text
  //         style={styles.cardText}
  //       >{`Customer #${arrOfIds[i]}: spent ${totalTimeSpentInShop} min(s)`}</Text>
  //       <Text
  //         style={styles.cardText}
  //       >{`Key Traits: ${arrOfEmotions[i]}, ${arrOfRaces[i]}, ${arrOfGenders[i]}`}</Text>
  //     </View>;
  //   }
  // };

  console.log(cardCounterProp);

  return (
    <View
      style={{
        margin: 14,
        borderRadius: 17,
        borderWidth: 3,
        borderColor: theme.colors.primary,
        justifyContent: "center",
        alignItems: "center",
        width: 400,
        height: 60,
        backgroundColor: colorOfChoice,
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }}
    >
      <View style={styles.cardWrapper}>
        <View>
          <Text
            style={styles.cardText}
          >{`Customer #${arrOfIds[cardCounterProp]}: spent ${totalTimeSpentInShop[cardCounterProp]} min(s)`}</Text>
          <Text
            style={styles.cardText}
          >{`Key Traits: ${arrOfEmotions[cardCounterProp]}, ${arrOfRaces[cardCounterProp]}, ${arrOfGenders[cardCounterProp]}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    borderRadius: 16,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Card;
