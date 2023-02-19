import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <View style={styles.createContainer}>
        <TouchableOpacity onPress={() => {navigation.navigate('CreateForm')}}>
          <View style={styles.createBtn}>
            <Text style={styles.createText}>Create</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>What is your name?</Text>
        <View style={styles.radioBtnContainer}>
          <TouchableOpacity style={styles.radioBtn}></TouchableOpacity>
          <Text>Tamwe</Text>
        </View>
        <View style={styles.radioBtnContainer}>
          <TouchableOpacity style={styles.radioBtn}></TouchableOpacity>
          <Text>Ye Thiha</Text>
        </View>
      </View>
      <View style={[styles.createContainer, { alignItems: "flex-start"}]}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.createBtn}>
            <Text style={styles.createText}>Submit the answer</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  createContainer: {
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  createBtn: {
    backgroundColor: "blue",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  createText: {
    color: "white",
    fontSize: 16,
  },
  questionContainer: {
    backgroundColor: "#d4cfcf50",
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 20,
  },
  questionText: {
    color: "black",
    fontSize: 14,
  },
  radioBtnContainer: {
    flexDirection: "row",
    backgroundColor: 'transparent',
    marginTop: 5,
  },
  radioBtn: {
    backgroundColor: "#86bdd9",
  // backgroundColor: "#b3adad",
    borderRadius: 5,
    width: 15,
    height: 15,
    marginRight: 5,
  },
  radioText: {},
});
