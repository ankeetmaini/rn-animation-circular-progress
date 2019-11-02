import React, { useState } from "react";
import Root from "./src/Root";
import { View, Button, Text } from "react-native";

export default function App() {
  const [done, setDone] = useState(0);

  return (
    <>
      <View style={{ margin: 40, flexDirection: "row", flexWrap: "wrap" }}>
        <Text style={{ fontSize: 20, marginBottom: 30 }}>
          Click `progress` percentage and see the donut animate
        </Text>
        <View style={{ margin: 2, width: 100, display: "flex" }}>
          <Button onPress={() => setDone(20)} title="20" />
        </View>
        <View style={{ margin: 2, width: 100 }}>
          <Button onPress={() => setDone(90)} title="90" />
        </View>
        <View style={{ margin: 2, width: 100 }}>
          <Button onPress={() => setDone(15)} title="15" />
        </View>
        <View style={{ margin: 2, width: 100 }}>
          <Button onPress={() => setDone(25)} title="25" />
        </View>
        <View style={{ margin: 2, width: 100 }}>
          <Button onPress={() => setDone(78)} title="78" />
        </View>
        <View style={{ margin: 2, width: 100 }}>
          <Button onPress={() => setDone(33)} title="33" />
        </View>
        <View style={{ margin: 2, width: 100 }}>
          <Button onPress={() => setDone(2)} title="2" />
        </View>
        <View style={{ margin: 2, width: 100 }}>
          <Button onPress={() => setDone(21)} title="21" />
        </View>
        <View style={{ margin: 2, width: 100 }}>
          <Button onPress={() => setDone(98)} title="98" />
        </View>
      </View>
      <Root
        activeColor="orange"
        passiveColor="grey"
        baseColor="white"
        width={10}
        done={done}
        radius={100}
      >
        <Text>Wow!</Text>
      </Root>
    </>
  );
}
