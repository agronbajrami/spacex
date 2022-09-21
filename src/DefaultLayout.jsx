import React from "react";
import Header from "./Components/Head/Header";

const DefaultLayout = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default DefaultLayout;
