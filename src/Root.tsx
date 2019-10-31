import React from "react";
import { StyleSheet, View } from "react-native";

export default function Root() {
  return (
    <View style={styles.container}>
      <View style={styles.circle}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    borderRadius: 200,
    height: 200,
    width: 200,
    backgroundColor: "teal"
  }
});
