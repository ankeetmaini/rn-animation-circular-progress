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
        done={85}
        radius={100}
      />
    </>
  );
}
