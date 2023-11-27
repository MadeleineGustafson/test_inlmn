import React from "react";
import styled from "styled-components";
import "./App.css";
import InputField from "./InputField";
import TextContent from "./TextContent";

function App() {
  return (
    <Centered>
      <div>
        <h1>Dictionary</h1>
        <InputField />
        <TextContent />
      </div>
    </Centered>
  );
}

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  background-color: tomato;
`;

export default App;
