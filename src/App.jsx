import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import InputField from "./components/InputField";
import TextContent from "./components/TextContent";

function App() {
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (word) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResult(null);
    }
    setIsLoading(false);
  };

  return (
    <Centered>
      <div>
        <HeaderText>Dictionary</HeaderText>
        <InputField onSearch={handleSearch} />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <TextContent searchResult={searchResult} />
        )}
      </div>
    </Centered>
  );
}

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  background-color: #143547;
`;

const HeaderText = styled.h1`
  color: #fff;
  font-size: 4rem;
`;

export default App;
