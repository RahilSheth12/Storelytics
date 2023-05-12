import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import AppLoading from "expo-app-loading";

import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

export default function Paragraph(props) {
  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <Text style={styles.text} {...props} />;
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontFamily: "Quicksand_400Regular",
    textAlign: "center",
    marginBottom: 12,
  },
});
