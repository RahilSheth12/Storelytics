import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ColorfulTabBar } from "react-navigation-tabbar-collection";
import Icon from "react-native-vector-icons/AntDesign";
import Paragraph from "../components/Paragraph";
import MoreData from "../screens/MoreData";
const Tab = createBottomTabNavigator();

const DemoScreen = ({ route }) => (
  <View style={styles.screen}>
    <Text>{route.name}</Text>
  </View>
);

import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Button,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  SafeAreaProvider,
} from "react-native";

import Data from "../../test_copy.json";
import Card from "../components/Card";
import Graph from "../graphs/graph";

import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync().catch(console.warn);

import AppLoading from "expo-app-loading";

import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

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
import Background from "../components/Background";

const Home = ({ navigation, route }) => {
  const { title } = route.params;
  const [toogleGraph, settoogleGraph] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("MoreData", { title: title })}
          title="More Data"
        />
      ),
    });
  }, [navigation]);

  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

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

  let [data1, setData] = useState([]);
  let [toggle, setToggle] = useState(false);

  // useEffect(() => {
  //   setToggle((prevState) => !prevState);
  // }, []);
  let data;
  let obj;
  let obj1;
  // let new_entry = onSnapshot(q, (snapshot) => {
  //   snapshot.docChanges().forEach((change) => {
  //     if (change.type === "added") {
  //       data = JSON.stringify(change.doc.data());
  //       console.log(data);
  //       obj = JSON.parse(data)["time_out"];
  //       obj1 = JSON.parse(data)["number_in_store"];
  //       arrOfTimeOuts.push(obj);
  //       arrOfNumberInStores.push(obj1);
  //       console.log(arrOfTimeOuts);
  //       console.log(arrOfNumberInStores);

  //       // console.log(obj.gender);
  //       // arr.push(obj.gender);
  //       // // console.log(arr);
  //     }
  //   });
  // });
  let hi = [];
  let counter1 = 0;

  useEffect(() => {
    const new_entry = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = JSON.stringify(change.doc.data());
          console.log(data);
          setData((prevState) => ({
            ...prevState,
            [String(counter1)]: data,
          }));
          counter1++;
        }
      });
    });
    onValue(ref1, (snapshot) => {
      setPeople(snapshot.toJSON());
    });
  }, []);

  //_____________________________________________________________

  // useEffect(() => {
  // console.log("data: " + data1);

  console.log(people);
  // const arrOfPeople = Object.entries(people).map(function (data, index) {
  //   console.log(data);
  //   const key = data[0];
  //   const real_data = JSON.parse(data[1])["time_out"];
  //   console.log(real_data);
  //   return real_data;
  // });
  // console.log(arrOfPeople);

  // if(people.length != data1.length){
  //   let adujster = people.length - data1.length
  //   for(let i = 0; i < )
  //   arrOfTimeOuts.push()
  // }

  // arrOfTimeOuts += Object.entries(people).map(function (data, index) {
  //   console.log(data);
  //   const key = data[0];
  //   const real_data = JSON.parse(data[1])["time_out"];
  //   console.log(real_data);
  //   return real_data;
  // });

  // useEffect(() => {
  //   onValue(ref1, (snapshot) => {
  //     setPeople(snapshot.toJSON());
  //   });
  // }, []);
  // let [toggle, setToggle] = useState(false);

  // const arrOfTimes = Object.entries(people).map(function (data, index) {
  //   console.log(data);
  //   const key = data[0];
  //   const real_data = JSON.parse(data[1]);
  //   console.log(real_data);
  //   console.log(real_data.number_in_store);
  //   console.log(real_data.time_out);
  //   return real_data.number_in_store;
  // });
  // let counter = arrOfNumberInStores.length - arrOfTimeOuts.length;

  // console.log("hi from counter");

  // for (let i = 0; i < arrOfNumberInStores.length; i++) {
  //   for (let j = 0; j < arrOfTimeOuts.length; j++) {
  //     if (arrOfNumberInStores[i] != null && arrOfTimeOuts[j] != null) {
  //       if (counter === 0) {
  //         counter = 0;
  //       } else {
  //         counter--;
  //       }
  //     } else {
  //       counter++;
  //     }
  //   }
  // }
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

  let cardCounter = arrOfTimeOuts.length;

  const cards = arrOfTimeOuts
    .splice(arrOfTimeOuts.length - 3, arrOfTimeOuts.length)
    .map(() => {
      cardCounter--;
      console.log(cardCounter);
      return <Card key={cardCounter} cardCounterProp={cardCounter} />;
    });

  let counter = arrOfNumberInStores.length - arrOfTimeOuts.length;
  console.log("counter: " + counter);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Background>
        <SafeAreaView>
          {/* <ScrollView vertical={true} showsVerticalScrollIndicator={true}> */}
          <View style={styles.container}>
            <Image
              style={styles.img}
              source={require("../misc/pics/logo.png")}
            />

            {counter > 0 ? (
              <Image source={require("../misc/pics/online-50.png")} />
            ) : (
              <Image source={require("../misc/pics/offline-50.png")} />
            )}
            <Paragraph>#{counter} of people</Paragraph>
            {cards}
            <View style={styles.graph}>
              <Header># of Customers</Header>
              <Graph z={0} />
            </View>
            {/* <Graph z={0} /> */}
          </View>
          {/* <Tab.Navigator
          initialRouteName="Home"
          tabBar={(props) => <ColorfulTabBar {...props} />}
        >
          <Tab.Screen
            name="Home"
            component={MoreData}
            onPress={() => navigation.navigate("MoreData", { title: title })}
            options={{
              title: "Home",
              icon: ({ focused, color, size }) => (
                <Icon name="home" size={size} color={color} />
              ),
              color: "primary",
            }}
          /> */}
          {/* <Tab.Screen
            name="News"
            component={MoreData}
            options={{
              title: "News",
              icon: ({ focused, color, size }) => (
                <Icon name="sharealt" size={size} color={color} />
              ),
              color: "info",
            }}
          />
          <Tab.Screen
            name="Chat"
            component={DemoScreen}
            options={{
              title: "Chat",
              icon: ({ focused, color, size }) => (
                <Icon name="API" size={size} color={color} />
              ),
              color: "warning",
            }}
          />
          <Tab.Screen
            name="Likes"
            component={DemoScreen}
            options={{
              title: "Likes",
              icon: ({ focused, color, size }) => (
                <Icon name="hearto" size={size} color={color} />
              ),
              color: "danger",
            }}
          />
          <Tab.Screen
            name="Settings"
            component={DemoScreen}
            options={{
              title: "Settings",
              icon: ({ focused, color, size }) => (
                <Icon name="setting" size={size} color={color} />
              ),
              color: "success",
            }}
          /> */}
          {/* </Tab.Navigator> */}
          {/* </ScrollView> */}
        </SafeAreaView>
      </Background>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    margin: 0,
    alignItems: "center",
  },
  img: {
    width: 500,
    height: 125,
    resizeMode: "contain",
  },
  graph: {
    marginBottom: 25,
    marginTop: -15,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    width: "100%",
    height: "100%",
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Home;
