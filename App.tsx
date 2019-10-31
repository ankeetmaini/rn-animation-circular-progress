import React from "react";
import Root from "./src/Root";

export default function App() {
  return (
    <>
      <Root
        activeColor="orange"
        passiveColor="black"
        baseColor="white"
        width={10}
        done={80}
        radius={100}
      />
    </>
  );
}
