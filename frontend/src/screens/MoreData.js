import React, { useState } from "react";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";
import GenderGraph from "../graphs/genderGraph";
import Graph from "../graphs/graph";
import RaceGraph from "../graphs/raceGraph";
import EmotionGraph from "../graphs/emotionGraph";
import Button from "../components/Button";
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  SectionList,
  ScrollView,
} from "react-native";
import Data from "../../test_copy.json";
import * as SplashScreen from "expo-splash-screen";
import Background from "../components/Background";

SplashScreen.preventAutoHideAsync().catch(console.warn);
const MoreData = ({ navigation, route }) => {
  let counter = 0;

  const [days, setDays] = useState(1);
  const [showBtn, setshowBtn] = useState(false);
  const [showBtnRace, setshowBtnRace] = useState(false);
  const [madeChoiceRace, setmadeChoiceRace] = useState(false);
  const [showBtnEmotion, setshowBtnEmotion] = useState(false);
  const [madeChoiceEmotion, setmadeChoiceEmotion] = useState(false);

  const [madeChoice, setmadeChoice] = useState(false);

  const madeChoices = () => {
    setmadeChoice(!madeChoice);
  };
  const madeChoicesRace = () => {
    setmadeChoiceRace(!madeChoiceRace);
  };

  const upDaysByOne = () => {
    setDays(1);
    madeChoices();
  };
  const upDaysBySeven = () => {
    setDays(7);
    madeChoices();
  };

  const upDaysByOneRace = () => {
    setDays(1);
    madeChoicesRace();
  };
  const upDaysBySevenRace = () => {
    setDays(7);
    madeChoicesRace();
  };

  const showBtns = () => {
    setshowBtn(!showBtn);
  };

  const showBtnsRace = () => {
    setshowBtnRace(!showBtnRace);
  };

  const madeChoicesEmotion = () => {
    setmadeChoiceEmotion(!madeChoiceEmotion);
  };

  const upDaysByOneEmotion = () => {
    setDays(1);
    madeChoicesEmotion();
  };
  const upDaysBySevenEmotion = () => {
    setDays(7);
    madeChoicesEmotion();
  };
  const showBtnsEmotion = () => {
    setshowBtnEmotion(!showBtnEmotion);
  };

  return (
    <ScrollView vertical={true} showsVerticalScrollIndicator={true}>
      <Background>
        <View style={styles.container}>
          <View style={styles.taskWrapper}>
            <Image
              style={styles.img}
              source={require("../misc/pics/logo.png")}
            />
            <Header>Gender Graph</Header>
            <View style={styles.genderGraph}>
              <GenderGraph numberOfDays={days} />
            </View>
            <View style={styles.genderBtns}>
              <Button onPress={upDaysByOne}>One Day</Button>
              <Button onPress={upDaysBySeven}>One Week</Button>
            </View>

            <Header>Race Graph</Header>
            <View style={styles.raceGraph}>
              <RaceGraph numberOfDays={days} />
            </View>
            <View style={styles.raceBtns}>
              <Button onPress={upDaysByOneRace}>One Day</Button>
              <Button onPress={upDaysBySevenRace}>One Week</Button>
            </View>

            <Header>Emotion Graph</Header>
            <View style={styles.emotionGraph}>
              <EmotionGraph numberOfDays={days} />
            </View>
            <View style={styles.emotionBtns}>
              <Button onPress={upDaysByOneEmotion}>One Day</Button>
              <Button onPress={upDaysBySevenEmotion}>One Week</Button>
            </View>
            {/* <Button mode="contained" onPress={showBtns}>
            Gender Graph
          </Button>

          {showBtn ? (
            <View style={styles.btnWrapper}>
              <Button onPress={upDaysByOne}>One Day</Button>
              <Button onPress={upDaysBySeven}>One Week</Button>
            </View>
          ) : null}
          {madeChoice ? <GenderGraph numberOfDays={days} /> : null} */}

            {/* --------------------------------------------------------------------------------------

          <Button mode="contained" onPress={showBtnsRace}>
            Race Graph
          </Button>

          {showBtnRace ? (
            <View style={styles.btnWrapper}>
              <Button onPress={upDaysByOneRace}>One Day</Button>
              <Button onPress={upDaysBySevenRace}>One Week</Button>
            </View>
          ) : null}
          {madeChoiceRace ? <RaceGraph numberOfDays={days} /> : null}

          <Button mode="contained" onPress={showBtnsEmotion}>
            Emotion Graph
          </Button>

          {showBtnEmotion ? (
            <View style={styles.btnWrapper}>
              <Button onPress={upDaysByOneEmotion}>One Day</Button>
              <Button onPress={upDaysBySevenEmotion}>One Week</Button>
            </View>
          ) : null}
          {madeChoiceEmotion ? <EmotionGraph numberOfDays={days} /> : null} */}
          </View>
        </View>
      </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  taskWrapper: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  btn: {
    marginTop: 100,
  },
  btnWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 10,
  },
  img: {
    marginTop: -30,
    width: 300,
    height: 100,
    resizeMode: "contain",
  },
  genderGraph: {
    marginBottom: 10,
  },
  genderBtns: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  raceGraph: {
    marginBottom: 10,
  },
  raceBtns: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  emotionGraph: {
    marginBottom: 10,
  },
  emotionBtns: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  dropDownStyle: {
    backgroundColor: "#187bcd",
    padding: 8,
    borderRadius: 8,
    minHeight: 42,
    justifyContent: "center",
  },
});

export default MoreData;
