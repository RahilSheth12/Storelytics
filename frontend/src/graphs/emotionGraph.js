import React, { useState, useEffect } from "react";
import Data from "../../test_copy.json";

import moment from "moment";
import {
  Dimensions,
  SafeAreaView,
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

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";

import { getDatabase, ref, onValue } from "firebase/database";

import { initializeApp } from "firebase/app";

import { theme } from "../core/theme";

const emotionGraph = ({ numberOfDays }) => {
  let [data1, setData] = useState([]);

  let [finish, setFinish] = useState(false);
  const firebaseApp = initializeApp({
    apiKey: "AIzaSyBWQFQ3o1hfYLZPghlWO9UMc5BJ4aMBJSg",
    databaseURL: "https://storelytics-app-default-rtdb.firebaseio.com/",
    projectId: "storelytics-app",
  });

  const db = getDatabase(firebaseApp);
  const ref1 = ref(db, "/Customers");

  const fire_db = getFirestore();
  const q = query(collection(fire_db, "Customers"));
  let arrOfEmotions = [];
  let arrOfDates = [];
  let counter = 0;
  let justTheDate;

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setData((prevState) => ({
            ...prevState,
            [String(counter)]: JSON.stringify(change.doc.data()),
          }));
          counter++;
          // const data = JSON.stringify(change.doc.data());
          // const obj = JSON.parse(data);

          //   arrOfRaces.push(obj.gender);
          //   console.log("after push: " + arrOfRaces);
          //   if (obj.time_in.length === 17 || obj.time_in.length === 18) {
          //     justTheDate = obj.time_in.substring(0, 9);
          //   } else {
          //     justTheDate = obj.time_in.substring(0, 10);
          //   }
          //   arrOfDates.push(justTheDate);
          // }
          // console.log(arr);
        }
      });
      setFinish(true);
    });
  }, []);

  //_____________________________________________________________

  // useEffect(() => {
  console.log("data: " + data1);
  arrOfEmotions = Object.entries(data1).map(function (data, index) {
    const emotion = JSON.parse(data[1])["emotion"];
    console.log("emotion: " + emotion);

    // const real_data = JSON.parse(data[1]);
    // console.log(real_data["time_in"]);
    return emotion;
  });

  arrOfDates = Object.entries(data1).map(function (data, index) {
    const date = JSON.parse(data[1])["time_in"];
    // console.log(date);
    if (data === 17 || data === 18) {
      justTheDate = date.substring(0, 8);
    } else {
      justTheDate = date.substring(0, 9);
    }
    console.log("date: " + justTheDate);

    // const real_data = JSON.parse(data[1]);
    // console.log(real_data["time_in"]);
    return justTheDate;
  });

  console.log(arrOfEmotions);
  console.log(arrOfDates);

  let emotionList = [
    "angry",
    "disgust",
    "fear",
    "happy",
    "sad",
    "surprise",
    "neutral",
  ];
  // let colors = [
  //       "#ff595e",
  //       "#FFA03B",
  //       "#ffca3a",
  //       "#8ac926",
  //       "#1982c4",
  //       "#6a4c93",
  // ]
  let amountOfEachEmotion = [0, 0, 0, 0, 0, 0, 0];

  function formatDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = mm;
    }
    date = mm + "/" + dd + "/" + yyyy;
    return date;
  }
  var result = [];

  function Last7Days() {
    for (var i = 0; i < 7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      result.push(formatDate(d));
    }

    return result;
  }

  let allEmotions = [];
  let emotionsFromJson = [];

  if (numberOfDays === 1) {
    const date = new Date();
    let str = date;
    const myMomentObject = moment(str, "M/DD/YYYY");

    let currentDate = myMomentObject.format("M/DD/YYYY");

    let justDate;

    // allRaces = Data.map(({ time_in, race }) => {
    //   justDate = time_in.substring(0, 9);
    //   if (currentDate === justDate) {
    //     return race;
    //   } else {
    //     return null;
    //   }
    // });
    for (let i = 0; i < arrOfDates.length; i++) {
      if (arrOfDates[i] === currentDate) {
        allEmotions.push(arrOfEmotions[i]);
      }
    }

    for (let i = 0; i < allEmotions.length; i++) {
      for (let j = 0; j < emotionList.length; j++) {
        if (allEmotions[i] === emotionList[j]) {
          amountOfEachEmotion[j]++;
        }
      }
    }
  } else {
    Last7Days();

    // let justDate;

    // allRaces = Data.map(({ time_in, race }) => {
    //   justDate = time_in.substring(0, 9);
    //   for (let i = 0; i < result.length; i++) {
    //     if (result[i] === justDate) {
    //       racesFromJson.push(race);
    //     } else {
    //       racesFromJson.push(null);
    //     }
    //   }
    // });

    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < arrOfDates.length; j++)
        if (result[i] === arrOfDates[j]) {
          emotionsFromJson.push(arrOfEmotions[j]);
        }
    }

    for (let i = 0; i < emotionsFromJson.length; i++) {
      for (let j = 0; j < emotionList.length; j++) {
        if (emotionsFromJson[i] === emotionList[j]) {
          amountOfEachEmotion[j]++;
        }
      }
    }
  }

  console.log(amountOfEachEmotion);

  //-----------------------------------------------------------------------------------------------------------------------//

  const data = [
    {
      name: "Angry",
      population: amountOfEachEmotion[0],
      color: "#ff595e",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Surprised",
      population: amountOfEachEmotion[5],
      color: "#FFA03B",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Happy",
      population: amountOfEachEmotion[3],
      color: "#ffca3a",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Disgusted",
      population: amountOfEachEmotion[1],
      color: "#8ac926",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Sad",
      population: amountOfEachEmotion[4],
      color: "#1982c4",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Scared",
      population: amountOfEachEmotion[2],
      color: "#6a4c93",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Neutral",
      population: amountOfEachEmotion[6],
      color: "#D3D3D3",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  const chartConfig = {
    backgroundColor: "#000000",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 119, 179, ${opacity})`,
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
  const height = 205;
  const graphStyle = {
    marginVertical: 8,
    ...chartConfig.style,
  };

  return (
    <View>
      <PieChart
        data={data}
        width={width}
        height={height}
        chartConfig={chartConfig}
        style={graphStyle}
        fromZero={true}
        accessor="population"
        backgroundColor="#fff"
        absolute
      />
      {/* <Text>list of emotions:{arrOfEmotions}</Text>
      <Text>list of dates:{arrOfDates}</Text> */}
    </View>
  );
};

export default emotionGraph;
