import { Provider } from "react-native-paper";
import { theme } from "./src/core/theme";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from "./src/screens";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import AppLoading from "expo-app-loading";
import Home from "./src/screens/Home";
import MoreData from "./src/screens/MoreData";
import DropDown from "./src/screens/DropDown";
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync().catch(console.warn);

import RealData from "./realData";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
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
      <Provider theme={theme}>
        <SafeAreaProvider>
          <RealData />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="StartScreen"
              screenOptions={{
                headerShown: true,

                headerTintColor: theme.colors.primary,
              }}
            >
              <Stack.Screen name="StartScreen" component={StartScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
              />

              <Stack.Screen
                name="Home"
                component={Home}
                options={({ route }) => ({
                  title: `Welcome ${route.params.title}!`,
                })}
              />
              <Stack.Screen
                name="MoreData"
                component={MoreData}
                options={({ route }) => ({
                  title: `${route.params.title}'s Extra Data`,
                })}
              />
              <Stack.Screen
                name="DropDown"
                component={DropDown}
                options={({ route }) => ({
                  title: `${route.params.title}'s DropDown`,
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFD",
    alignItems: "center",
  },
});
