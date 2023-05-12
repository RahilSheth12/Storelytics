import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  SectionList,
  Modal,
  TouchableOpacity,
} from "react-native";
const CONTENT = [
  {
    isExpanded: false,
    category_name: "item 1",
    subcategory: [
      { id: 1, val: "sub 1" },
      { id: 2, val: "sub 2" },
    ],
  },

  {
    isExpanded: false,
    category_name: "item 2",
    subcategory: [
      { id: 3, val: "sub 3" },
      { id: 4, val: "sub 4" },
    ],
  },

  {
    isExpanded: false,
    category_name: "item 3",
    subcategory: [
      { id: 5, val: "sub 5" },
      { id: 6, val: "sub 6" },
    ],
  },

  {
    isExpanded: false,
    category_name: "item 4",
    subcategory: [
      { id: 7, val: "sub 7" },
      { id: 8, val: "sub 8" },
    ],
  },

  {
    isExpanded: false,
    category_name: "item 5",
    subcategory: [
      { id: 9, val: "sub 9" },
      { id: 10, val: "sub 10" },
    ],
  },
];

const DropDown = ({ navigation, route }) => {
  const [multiSelect, setmultiSelect] = useState(false);
  const [listDataSource, setlistDataSource] = useState(CONTENT);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Expandable List View</Text>
          <TouchableOpacity onPress={() => setmultiSelect(!multiSelect)}>
            <Text style={styles.headerButton}>
              {multiSelect
                ? "Enable Single \n Expand"
                : "Enable Multiple \n Expand"}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {listDataSource.map((item, index) => (
            <ExpandableComponent />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    padding: 10,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
  },
  headerButton: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 18,
  },
});
export default DropDown;
