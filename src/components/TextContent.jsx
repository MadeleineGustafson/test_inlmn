import React from "react";
import styled from "styled-components";

function TextContent({ searchResult }) {
  if (!searchResult) {
    return null; // Or you can return an empty fragment <></> to render nothing
  }

  if (!Array.isArray(searchResult) || searchResult.length === 0) {
    return <p>No results found</p>;
  }

  const { word, phonetics, meanings, license, sourceUrls } = searchResult[0];

  if (!meanings || !Array.isArray(meanings) || meanings.length === 0) {
    return <p>No meanings found for this word</p>;
  }

  return (
    <BigContainer>
      <WordTitle>{word}</WordTitle>
      {phonetics && (
        <div>
          <PartOfSpeechTitle>Phonetics</PartOfSpeechTitle>
          {phonetics.slice(0, 5).map((phonetic, index) => (
            <div key={index}>
              <audio controls>
                <source src={phonetic.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <PhoneticText>{phonetic.text}</PhoneticText>
              {phonetic.license && (
                <div>
                  <p>License Name: {phonetic.license.name}</p>
                  <p>
                    License URL:
                    <a href={phonetic.license.url}>{phonetic.license.url}</a>
                  </p>
                </div>
              )}
              {phonetic.sourceUrl && (
                <p>
                  Source URL:
                  <a href={phonetic.sourceUrl}>{phonetic.sourceUrl}</a>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      <div>
        <PartOfSpeechTitle>Meanings</PartOfSpeechTitle>
        {meanings.map((meaning, i) => (
          <div key={i}>
            <PartOfSpeechTitle>{meaning.partOfSpeech}</PartOfSpeechTitle>
            <DetailsList>
              {meaning.definitions.length > 0 && (
                <>
                  <h3>Definitions</h3>
                  {meaning.definitions.slice(0, 5).map((definition, j) => (
                    <div key={j}>
                      <p>{definition.definition}</p>
                    </div>
                  ))}
                </>
              )}
              {meaning.definitions.some((definition) => definition.example) && (
                <>
                  <h3>Examples</h3>
                  {meaning.definitions.map((definition, j) => (
                    <div key={j}>
                      {definition.example && (
                        <p>Example: {definition.example}</p>
                      )}
                    </div>
                  ))}
                </>
              )}
              {meaning.synonyms && meaning.synonyms.length > 0 && (
                <>
                  <h3>Synonyms</h3>
                  <SynonymsList>
                    {meaning.synonyms
                      .slice(0, 5)
                      .map((synonym, synonymIndex) => (
                        <div key={synonymIndex}>
                          <p>{synonym}</p>
                        </div>
                      ))}
                  </SynonymsList>
                </>
              )}
              {meaning.antonyms && meaning.antonyms.length > 0 && (
                <>
                  <h3>Antonyms</h3>
                  <AntonymsList>
                    {meaning.antonyms
                      .slice(0, 5)
                      .map((antonym, antonymIndex) => (
                        <div key={antonymIndex}>
                          <p>{antonym}</p>
                        </div>
                      ))}
                  </AntonymsList>
                </>
              )}
            </DetailsList>
          </div>
        ))}
      </div>
      {sourceUrls && (
        <div>
          <h3>Source URLs</h3>
          <ul>
            {sourceUrls.map((url, index) => (
              <li key={index}>
                <a href={url}>{url}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {license && (
        <div>
          <h2>License</h2>
          <p>License Name: {license.name}</p>
          <p>
            License URL: <a href={license.url}>{license.url}</a>
          </p>
        </div>
      )}
    </BigContainer>
  );
}

const BigContainer = styled.div`
  width: 600px;
`;

const WordTitle = styled.h2`
  color: #fff;
  font-size: 2rem;
`;

const PartOfSpeechTitle = styled.h3`
  color: #fff;
  font-size: 1.5rem;
`;

const PhoneticText = styled.p`
  color: #fff;
`;

const DetailsList = styled.ul`
  list-style-type: none;
  font-weight: 200;
`;

const SynonymsList = styled.ul`
  list-style-type: none;
`;

const AntonymsList = styled.ul`
  list-style-type: none;
`;

export default TextContent;
