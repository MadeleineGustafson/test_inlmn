import React from "react";
import styled from "styled-components";

function TextContent({ searchResult }) {
  if (!searchResult) {
    return null;
  }

  if (!Array.isArray(searchResult) || searchResult.length === 0) {
    return <p role="message">No results found</p>;
  }

  const { word, phonetics, meanings, license, sourceUrls } = searchResult[0];

  // if (!meanings || !Array.isArray(meanings) || meanings.length === 0) {
  //   return <p>No meanings found for this word</p>;
  // }

  return (
    <BigContainer>
      <WordTitle data-testid="word" role="heading">
        {word}
      </WordTitle>

      {phonetics && (
        <div>
          <PartOfSpeechTitle>Phonetics</PartOfSpeechTitle>

          {phonetics.slice(0, 5).map((phonetic, index) => (
            <div key={index}>
              {phonetic.audio && (
                <AudioControl controls data-testid="audio-player" role="audio">
                  <source src={phonetic.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </AudioControl>
              )}
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
            <PartOfSpeechTitle2>{meaning.partOfSpeech}</PartOfSpeechTitle2>
            <DetailsList>
              {meaning.definitions.length > 0 && (
                <>
                  <TitleStyle>Definitions</TitleStyle>
                  {meaning.definitions.slice(0, 5).map((definition, j) => (
                    <div key={j}>
                      <FontStyle>- {definition.definition}</FontStyle>
                    </div>
                  ))}
                </>
              )}
              {meaning.definitions
                .slice(0, 5)
                .some((definition) => definition.example) && (
                <>
                  <TitleStyle>Examples</TitleStyle>
                  {meaning.definitions.slice(0, 5).map((definition, j) => (
                    <div key={j}>
                      {definition.example && (
                        <FontStyle>- {definition.example}</FontStyle>
                      )}
                    </div>
                  ))}
                </>
              )}
              {meaning.synonyms && meaning.synonyms.length > 0 && (
                <>
                  <TitleStyle>Synonyms</TitleStyle>

                  {meaning.synonyms.slice(0, 5).map((synonym, synonymIndex) => (
                    <div key={synonymIndex}>
                      <FontStyle>- {synonym}</FontStyle>
                    </div>
                  ))}
                </>
              )}
              {meaning.antonyms && meaning.antonyms.length > 0 && (
                <>
                  <TitleStyle>Antonyms</TitleStyle>

                  {meaning.antonyms.slice(0, 5).map((antonym, antonymIndex) => (
                    <div key={antonymIndex}>
                      <FontStyle>- {antonym}</FontStyle>
                    </div>
                  ))}
                </>
              )}
            </DetailsList>
          </div>
        ))}
      </div>
      {sourceUrls && (
        <div>
          <h2>Source URLs</h2>
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

const FontStyle = styled.p`
  font-family: Anonymous pro;
`;

const TitleStyle = styled.h3`
  border-bottom: 1px solid #f77731;
`;

const AudioControl = styled.audio`
  border: 2px solid #f77731;
  border-radius: 30px;
`;

const WordTitle = styled.h2`
  color: #f77731;
  font-size: 3.5rem;
  font-weight: 200;
  font-family: Anonymous pro;
  padding-left: 1rem;
  border-left: 2px solid black;
`;

const PartOfSpeechTitle = styled.h3`
  color: ##21201f;
  font-size: 2rem;
`;

const PartOfSpeechTitle2 = styled.h3`
  color: ##21201f;
  font-size: 1.5rem;
`;

const PhoneticText = styled.p`
  color: ##21201f;
`;

const DetailsList = styled.ul`
  list-style-type: none;
  font-weight: 200;
`;

export default TextContent;
