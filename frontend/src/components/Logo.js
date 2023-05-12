import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <Image source={require("../misc/pics/logo.png")} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 500,
    height: 125,
    resizeMode: "contain",
    marginBottom: 8,
  },
});
