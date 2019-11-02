import React, { FunctionComponent, useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Alert,
  ToastAndroid
} from "react-native";
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
  const initialValue1 = done >= 50 ? 0 : 180;
  const initialValue2 = done >= 50 ? 0 : 180;
  const initialValue3 = 0;
  const animatedValue1 = useRef(new Animated.Value(initialValue1)).current;
  const animatedValue2 = useRef(new Animated.Value(initialValue2)).current;
  const animatedValue3 = useRef(new Animated.Value(initialValue3)).current;
  const color = done >= 50 ? activeColor : passiveColor;

  const firstAnimation = () => {
    animatedValue1.setValue(initialValue1);
    animatedValue2.setValue(initialValue2);
    animatedValue3.setValue(initialValue3);
    const timePerDegree = 2000 / 360;
    Animated.parallel([
      Animated.timing(animatedValue1, {
        toValue: 180,
        duration: 180 * timePerDegree,
        useNativeDriver: true,
        easing: Easing.linear
      }),
      Animated.timing(animatedValue2, {
        toValue: 180 + (done - 50) * 3.6,
        duration: (180 + (done - 50) * 3.6) * timePerDegree,
        // duration: 180 * timePerDegree,
        useNativeDriver: true,
        easing: Easing.linear
      }),
      Animated.timing(animatedValue3, {
        toValue: (done - 50) * 3.6,
        delay: 180 * timePerDegree,
        duration: timePerDegree * ((done - 50) * 3.6),
        // duration: 180 * timePerDegree,
        useNativeDriver: true,
        easing: Easing.linear
      })
    ]).start();
  };

  useEffect(() => {
    firstAnimation();
  }, [done]);

  const renderHalf = (color: string, transforms = [], otherStyles = {}) => (
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
        },
        otherStyles
      ]}
    ></Animated.View>
  );

  const rotate1 = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1deg"]
  });
  const rotate2 = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1deg"]
  });

  const rotate3 = animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1deg"]
  });

  const elevation3 = animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1]
  });

  return (
    <View style={styles.container}>
      <View style={[styles.outer, { backgroundColor: passiveColor }]}>
        {renderHalf(color, [{ rotate: rotate1 }])}
        {renderHalf(color, [{ rotate: rotate2 }])}
        {/* to hide the active elements */}
        {renderHalf(passiveColor, [{ rotate: rotate3 }], {
          elevation: elevation3
        })}
        <View
          style={[
            {
              backgroundColor: baseColor,
              width: radius,
              height: radius,
              borderRadius: radius,
              elevation: 1000
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
