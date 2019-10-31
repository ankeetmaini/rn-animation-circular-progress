import React, { FunctionComponent, useRef, useEffect, useState } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";
const RADIUS = 100;
type Props = {
  activeColor: string;
  passiveColor: string;
  baseColor: string;
  width: number;
  radius: number;
  done: number;
};
const Root: FunctionComponent<Props> = ({
  activeColor,
  passiveColor,
  radius,
  done,
  baseColor,
  width
}) => {
  const rotate1 = useRef(new Animated.Value(0)).current;
  const rotate2 = useRef(new Animated.Value(180)).current;
  const [show, setShow] = useState(false);

  useEffect(() => {
    rotate1.setValue(0);
    rotate2.setValue(180);
    const rotateValue = done >= 50 ? (done - 50) * 3.6 + 180 : 3.6 * done + 180;
    Animated.sequence([
      Animated.timing(rotate1, {
        duration: 800,
        easing: Easing.linear,
        toValue: 180,
        useNativeDriver: true
      }),
      Animated.timing(rotate2, {
        duration: 800,
        easing: Easing.linear,
        toValue: rotateValue,
        useNativeDriver: true
      })
    ]).start();
  }, [done]);

  const renderHalf = (color: string, transforms = []) => (
    <Animated.View
      style={[
        styles.half,
        { backgroundColor: color, borderColor: color },
        {
          transform: [
            { translateX: RADIUS / 2 },
            ...transforms,
            { translateX: -RADIUS / 2 },
            { scale: 1.004 }
          ]
        }
      ]}
    ></Animated.View>
  );
  const color = done >= 50 ? activeColor : passiveColor;
  const transform1 = rotate1.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1deg"]
  });
  const transform2 = rotate2.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1deg"]
  });
  return (
    <View style={styles.container}>
      <View style={[styles.outer, { backgroundColor: passiveColor }]}>
        {renderHalf(color, [{ rotate: transform1 }])}
        {renderHalf(passiveColor, [])}
        {renderHalf(color, [{ rotate: transform2 }, { scale: 0 }])}
        <View
          style={[
            {
              backgroundColor: baseColor,
              width: radius,
              height: radius,
              borderRadius: radius
            }
          ]}
        ></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  outer: {
    borderRadius: RADIUS,
    height: RADIUS * 2,
    width: RADIUS * 2,
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
  },
  half: {
    position: "absolute",
    left: 0,
    top: 0,
    width: RADIUS,
    height: RADIUS * 2,
    borderRadius: RADIUS,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }
});

export default Root;
