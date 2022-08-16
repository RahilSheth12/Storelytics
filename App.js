import * as React from "react";
import { Appbar } from "react-native-paper";

export default function App() {
  const _goBack = () => console.log("Went back");

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title="Title" />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
// });

{
  /* <SafeAreaView style={styles.container}>
      <Text>Wassup Boiiii!!!!</Text>
      <TouchableHighlight onPress={() => console.log("hi")}>
        <Image 
      blurRadius={6}
      source={require("./assets/car.jpg")} 
      style={styles.car} 
      />
        <View style={styles.box}></View>
        <Button
          title="Click"
          onPress={() =>
            Alert.alert("Clicked", "ayee", [
              { text: "Yes", onPress: () => console.log("yes") },
              { text: "No", onPress: () => console.log("no") },
            ])
          }
        ></Button>
      </TouchableHighlight>
      <StatusBar style="auto" />
    </SafeAreaView> */
}

// car: {
//   width: 200,
//   height: 300,
// },
// box: {
//   width: 100,
//   height: 100,
//   backgroundColor: "dodgerblue",
// },
