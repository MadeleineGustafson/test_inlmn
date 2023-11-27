import React from "react";
import styled from "styled-components";

function TextContent({ searchResult }) {
  // Check if searchResult contains data and is an array
  const hasResults = searchResult && Array.isArray(searchResult);

  console.log(searchResult);

  return (
    <ResultSection>
      {hasResults ? (
        searchResult.map((result, index) => (
          <div key={index}>
            <h3>{result.word}</h3>
            {result.phonetics && result.phonetics[0] && (
              <audio controls>
                <source src={result.phonetics[0].audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
            <WordList>
              {result.meanings.map((meaning, i) => (
                <li key={i}>
                  <p>{meaning.partOfSpeech}</p>
                  <WordList>
                    {meaning.definitions.map((definition, j) => (
                      <li key={j}>
                        <p>{definition.definition}</p>
                      </li>
                    ))}
                  </WordList>
                </li>
              ))}
            </WordList>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </ResultSection>
  );
}

const ResultSection = styled.section`
  color: #fff;
  width: 600px;
  list-style-type: none;
`;

const WordList = styled.ul`
  list-style-type: none;
`;
export default TextContent;
