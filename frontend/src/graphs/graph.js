import React, { useState, useEffect } from "react";
import Data from "../../test_copy.json";

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

import moment from "moment";

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { theme } from "../core/theme";

//function start
const graph = ({ z }) => {
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
  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const data = JSON.stringify(change.doc.data());
        console.log(data);
      }
    });
  });

  // const fire_db = getFirestore();

  // const query = fire_db.collection("/Customers");

  useEffect(() => {
    const new_entry = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = JSON.stringify(change.doc.data());
          console.log(data);
        }
      });
    });
    onValue(ref1, (snapshot) => {
      setPeople(snapshot.toJSON());
    });
    console.log("uh huh");
    yAxes = [0, 0, 0, 0];
  }, []);

  let oneHourBehindCounter = 0;
  let twoHoursBehindCounter = 0;
  let threeHoursBehindCounter = 0;

  const date = new Date();
  let str = date;
  const myMomentObject = moment(str, "MM-DD-YYYY hh:mm a");
  let currentTime = myMomentObject.format("h:mm A");
  let currentMin = moment().format("mm");
  let currentHour = moment().hour();
  // currentHour.format("hh");
  let amOrPm;
  let zerodCurrentTime = currentTime.replace(currentMin, "00");

  if (zerodCurrentTime.length === 8) {
    amOrPm = zerodCurrentTime.substring(6, 8);
  } else {
    amOrPm = zerodCurrentTime.substring(5, 7);
  }

  let Myflagger = false;
  let onlyAMFlagger = "AM";
  let currentHour12;

  if (currentHour === 0) {
    currentHour = 12;
  }

  if (currentHour > 11) {
    currentHour12 = currentHour - 12;
  } else {
    currentHour12 = currentHour;
  }

  if (currentHour12 === 0) {
    currentHour12 = 12;
    Myflagger = true;
  }

  let oneHourBehind = currentHour12 - 1;
  let twoHoursBehind = currentHour12 - 2;
  let threeHoursBehind = currentHour12 - 3;

  let tester;

  if (oneHourBehind <= 0 || Myflagger) {
    if (Myflagger) {
      oneHourBehindCounter++;
    } else {
      if (oneHourBehind === 0) {
        oneHourBehind = 12;
        oneHourBehindCounter++;
      } else {
        oneHourBehind = 12 - Math.abs(oneHourBehind);
        oneHourBehindCounter++;
      }
    }
  }

  // tester = Myflagger;

  if (twoHoursBehind <= 0 || Myflagger) {
    if (Myflagger) {
      twoHoursBehindCounter++;
    } else {
      if (twoHoursBehind === 0) {
        twoHoursBehind = 12;
        twoHoursBehindCounter++;
      } else {
        twoHoursBehind = 12 - Math.abs(twoHoursBehind);
        twoHoursBehindCounter++;
      }
    }
  }

  if (threeHoursBehind <= 0 || Myflagger) {
    if (Myflagger) {
      threeHoursBehindCounter++;
    } else {
      if (threeHoursBehind === 0) {
        threeHoursBehind = 12;
        threeHoursBehindCounter++;
      } else {
        threeHoursBehind = 12 - Math.abs(threeHoursBehind);
        threeHoursBehindCounter++;
      }
    }
  }

  let hourOne = zerodCurrentTime;
  let hourTwo;
  let hourThree;
  let hourFour;

  if (oneHourBehindCounter > 0 && amOrPm === "PM") {
    hourTwo = zerodCurrentTime
      .replace(currentHour12, oneHourBehind)
      .replace(amOrPm, "AM");
  } else if (oneHourBehindCounter > 0 && amOrPm === "AM") {
    hourTwo = zerodCurrentTime
      .replace(currentHour12, oneHourBehind)
      .replace(amOrPm, "PM");
  } else if (Myflagger === true) {
    hourTwo = zerodCurrentTime
      .replace(currentHour12, oneHourBehind)
      .replace(amOrPm, onlyAMFlagger);
  } else {
    hourTwo = zerodCurrentTime.replace(currentHour12, oneHourBehind);
  }

  if (twoHoursBehindCounter > 0 && amOrPm === "PM") {
    hourThree = zerodCurrentTime
      .replace(currentHour12, twoHoursBehind)
      .replace(amOrPm, "AM");
  } else if (twoHoursBehindCounter > 0 && amOrPm === "AM") {
    hourThree = zerodCurrentTime
      .replace(currentHour12, twoHoursBehind)
      .replace(amOrPm, "PM");
  } else if (Myflagger === true) {
    hourThree = zerodCurrentTime
      .replace(currentHour12, twoHoursBehind)
      .replace(amOrPm, onlyAMFlagger);
  } else {
    hourThree = zerodCurrentTime.replace(currentHour12, twoHoursBehind);
  }

  if (threeHoursBehindCounter > 0 && amOrPm === "PM") {
    hourFour = zerodCurrentTime
      .replace(currentHour12, threeHoursBehind)
      .replace(amOrPm, "AM");
  } else if (threeHoursBehindCounter > 0 && amOrPm === "AM") {
    hourFour = zerodCurrentTime
      .replace(currentHour12, threeHoursBehind)
      .replace(amOrPm, "PM");
  } else if (Myflagger === true) {
    hourFour = zerodCurrentTime
      .replace(currentHour12, threeHoursBehind)
      .replace(amOrPm, onlyAMFlagger);
  } else {
    hourFour = zerodCurrentTime.replace(currentHour12, threeHoursBehind);
  }

  let hours = [hourFour, hourThree, hourTwo, hourOne];
  // let hours = ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"];

  // hours[0] = currentHour12;
  let justTime;

  let justMins;
  let replaceMinWithZeros;

  // ref.on("child_added", (snapshot, prevChildKey) => {
  //   var newPost = snapshot.toJSON();
  //   console.log("new user: " + newPost);
  //   const data = JSON.parse(newPost); // data of new user (data['time_in'] is access method)
  //   const key = snapshot.key; // key of new user
  // });

  // tester = "idk";

  // let persons = [0, 0, 0, 0];
  // let [yAxes, setyAxes] = useState([z, z, z, z]);
  let yAxes = [z, z, z, z];
  console.log(yAxes);
  // let everything;
  // let [toggle, setToggle] = useState(false);
  // useEffect(() => {
  //   setyAxes([0, 0, 0, 0]);
  //   console.log("====================================");
  //   console.log(yAxes);
  //   console.log("====================================");
  // }, [refresh]);

  // useEffect(() => {
  // if (Object.entries(people).length === 0) {
  //   console.log("empty");
  // } else {
  //   console.log("full");
  const arrOfTimes = Object.entries(people).map(function (data, index) {
    // console.log(data.length);
    const key = data[0];
    const real_data = JSON.parse(data[1]);
    console.log(real_data);
    return real_data.time_in;
  });

  const everything = arrOfTimes.map((time_in) => {
    if (time_in.length === 17) {
      // hours[0] = "yes";
      justTime = time_in.substring(10);
      justMins = justTime.substring(2, 4);
    } else {
      justTime = time_in.substring(10);
      // hours[1] = justTime;
      justMins = justTime.substring(3, 5);
    }
    replaceMinWithZeros = justTime.replace(justMins, "00");
    return replaceMinWithZeros;
  });
  console.log(everything);
  tester = everything;
  for (let i = 0; i < everything.length; i++) {
    for (let j = 0; j < hours.length; j++) {
      if (everything[i] === hours[j]) {
        console.log("yeah");
        yAxes[j]++;
        console.log(yAxes);
      }
    }
  }
  console.log(yAxes);
  // }
  // setToggle(true);
  // }, [people]);

  // useEffect(() => {
  //   tester = yAxes.toString();
  // }, [toggle]);

  // persons = [1, 2, 1, 2];
  // arr = [parseInt(yAxes[0]), 1, 1, 2];
  // tester = yAxes.toString();
  // arr = persons;

  //____________________________________________________________________________________//

  const data = {
    labels: hours,
    datasets: [
      {
        data: yAxes,
        color: (opacity = 1) => `rgba(0, 119, 179, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["#Customers"], // optional
  };

  const chartConfig = {
    backgroundColor: "#000000",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 119, 179, ${opacity})`,
    barPercentage: 1.5,
    style: {
      borderRadius: 16,
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      borderWidth: 3,
      borderColor: theme.colors.primary,
    },
  };
  const width = Dimensions.get("window").width * 0.9;
  const height = 300;
  const graphStyle = {
    ...chartConfig.style,
    alignItems: "center",
  };

  // useEffect(() => {
  //   onValue(ref1, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(data);
  //   });
  //   // ref1.on("child_added", (snapshot, prevChildKey) => {
  //   //   var newPost = snapshot.toJSON();
  //   //   const data = JSON.parse(newPost); // data of new user (data['time_in'] is access method)
  //   //   const key = snapshot.key; // key of new user
  //   //   setPeople((prevState) => ({
  //   //     ...prevState,
  //   //     [key]: data,
  //   //   }));
  //   // });
  // }, []);

  // useEffect(() => {
  //   console.log(people);
  //   // rerender graph data
  // }, [people]);

  return (
    <View>
      <BarChart
        showValuesOnTopOfBars={true}
        yAxisLabel="#"
        data={data}
        width={width}
        height={height}
        chartConfig={chartConfig}
        style={graphStyle}
        fromZero={true}
        yAxisInterval={1}
      />
      {/* <Text>{yAxes}</Text>
      <Text>{tester}</Text> */}
    </View>
  );
};

export default graph;

//____________________________________________________________________________________//
