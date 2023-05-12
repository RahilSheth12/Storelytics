import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
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
export default function TextInput({ errorText, description, ...props }) {
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
      <View style={styles.container}>
        <Input
          style={styles.input}
          selectionColor={theme.colors.primary}
          underlineColor="transparent"
          mode="outlined"
          {...props}
        />
        {description && !errorText ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
        {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    fontFamily: "Quicksand_400Regular",
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    fontFamily: "Quicksand_400Regular",
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    fontFamily: "Quicksand_400Regular",
    color: theme.colors.error,
    paddingTop: 8,
  },
});
