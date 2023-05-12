import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { StyleSheet } from "react-native";

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      {/* <Button
        mode="contained"
        onPress={() => navigation.navigate("DropDown", { title: "DropDown" })}
      >
        Drop Down
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Home", { title: "Home" })}
      >
        Home Page
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("MoreData", { title: "More Data" })}
      >
        More Data Page
      </Button> */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Sign Up
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  btn: {},
});
