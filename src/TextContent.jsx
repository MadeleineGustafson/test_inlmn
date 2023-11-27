import React, { useEffect, useState } from "react";
import styled from "styled-components";

function TextContent() {
  const [word, setWord] = useState(""); // State to store the fetched word

  useEffect(() => {
    async function getWords() {
      try {
        const response = await fetch(
          "https://api.dictionaryapi.dev/api/v2/entries/en/hello"
        );
        const [data] = await response.json();
        if (data && data.word) {
          setWord(data.word); // Update the state with the fetched word
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getWords();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <SectionText>
      <p></p>
    </SectionText>
  );
}

const SectionText = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: pink;
`;

export default TextContent;
