import React, { useState } from "react";
import styled from "styled-components";

import InputField from "./components/InputField";
import TextContent from "./components/TextContent";

function App() {
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Hämta API
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

  // Header is link to startpage/ clear searchfield
  const handleHeaderClick = () => {
    setSearchResult("");
  };

  return (
    <Centered>
      <div>
        <a href="" onClick={handleHeaderClick}>
          <HeaderText>My dictionary</HeaderText>
        </a>

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
  background-color: #f5f3f0;
`;

const HeaderText = styled.h1`
  color: #05121a;
  font-size: 2.5rem;
  text-align: center;
  font-family: Anonymous pro;
`;

export default App;
