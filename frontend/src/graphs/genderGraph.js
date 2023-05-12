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

const genderGraph = ({ numberOfDays }) => {
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
  let arrOfGenders = [];
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
        }
      });
      return setFinish(true);
    });
  }, []);

  //_____________________________________________________________

  // useEffect(() => {
  console.log("data: " + data1);

  arrOfGenders = Object.entries(data1).map(function (data, index) {
    const gender = JSON.parse(data[1])["gender"];
    console.log("gender: " + gender);

    // const real_data = JSON.parse(data[1]);
    // console.log(real_data["time_in"]);
    return gender;
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

  console.log(arrOfGenders);
  console.log(arrOfDates);

  // }, [finish]);

  let genderList = ["Man", "Woman"];

  let amountOfEachGender = [0, 0];

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

  let allGenders = [];
  let gendersFromJson = [];

  if (numberOfDays === 1) {
    const date = new Date();
    let str = date;
    const myMomentObject = moment(str, "M/DD/YYYY");

    let currentDate = myMomentObject.format("M/DD/YYYY");

    let justDate;
    // allGenders = arrOfDates.map((date) => {
    //   if (currentDate === date) {
    //     return arrOfGenders;
    //   } else {
    //     return null;
    //   }
    // });
    // let yes = "no/yes";

    for (let i = 0; i < arrOfDates.length; i++) {
      if (arrOfDates[i] === currentDate) {
        allGenders.push(arrOfGenders[i]);
      }
    }

    for (let i = 0; i < allGenders.length; i++) {
      for (let j = 0; j < genderList.length; j++) {
        if (allGenders[i] === genderList[j]) {
          amountOfEachGender[j]++;
        }
      }
    }
  } else {
    Last7Days();

    // let justDate;

    // allGenders = Data.map(({ time_in, gender }) => {
    //   justDate = time_in.substring(0, 9);
    //   for (let i = 0; i < result.length; i++) {
    //     if (result[i] === justDate) {
    //       gendersFromJson.push(gender);
    //     } else {
    //       gendersFromJson.push(null);
    //     }
    //   }
    // });

    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < arrOfDates.length; j++)
        if (result[i] === arrOfDates[j]) {
          gendersFromJson.push(arrOfGenders[j]);
        }
    }

    for (let i = 0; i < gendersFromJson.length; i++) {
      for (let j = 0; j < genderList.length; j++) {
        if (gendersFromJson[i] === genderList[j]) {
          amountOfEachGender[j]++;
        }
      }
    }
    // amountOfEachGender[1]++;
  }

  //____________________________________________________________________________________//

  // const data = {
  //   labels: genderList,
  //   datasets: [
  //     {
  //       data: [amountOfEachGender[0], amountOfEachGender[1]],
  //       color: (opacity = 1) => `rgba(103, 185, 218, ${opacity})`, // optional
  //       strokeWidth: 2, // optional
  //     },
  //   ],
  //   legend: ["#Men/Women"], // optional
  // };

  // const chartConfig = {
  //   backgroundColor: "#000000",
  //   backgroundGradientFrom: "#ffffff",
  //   backgroundGradientTo: "#fff",
  //   color: (opacity = 1) => `rgba(0, 119, 179, ${opacity})`,
  //   barPercentage: 1.5,
  //   style: {
  //     borderRadius: 16,
  //     shadowOffset: { width: 2, height: 4 },
  //     shadowOpacity: 0.2,
  //     shadowRadius: 3,
  //   },
  // };
  // const width = Dimensions.get("window").width * 0.9;
  // const height = 280;
  // const graphStyle = {
  //   marginVertical: 8,
  //   ...chartConfig.style,
  //   flex: 1,
  //   alignItems: "center",
  // };
  const data = [
    {
      name: "Women",
      population: amountOfEachGender[1],
      color: "#8700f9",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Men",
      population: amountOfEachGender[0],
      color: "#00c4aa",
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
    ...chartConfig.style,
  };
  //____________________________________________________________________________________//
  // allGenders = [1, 1, 1, 1];
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
      {/* <Text>list of genders:{arrOfGenders}</Text>
      <Text>list of dates:{arrOfDates}</Text> */}
    </View>
  );
};

export default genderGraph;
