import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../core/theme";
import AppLoading from "expo-app-loading";

import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

export default function Header(props) {
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
    return <Text style={styles.header} {...props} />;
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    color: theme.colors.primary,
    fontFamily: "Quicksand_500Medium",
    paddingVertical: 12,
    backgroundColor: "transparent",
  },
});
