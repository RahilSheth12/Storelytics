import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
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

export default function Button({ mode, style, ...props }) {
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
    return (
      <PaperButton
        style={[
          styles.button,
          mode === "outlined" && { backgroundColor: theme.colors.surface },
          style,
        ]}
        labelStyle={styles.text}
        mode={mode}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontFamily: "Quicksand_400Regular",
    fontSize: 18,
    lineHeight: 26,
  },
});
