import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import styled from "styled-components";

function InputField({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Container>
      <SearchField
        type="Text"
        placeholder="Enter word..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <SearchButton onClick={handleSearch}>
        <SearchIcon />
      </SearchButton>
      {searched && !searchTerm && <ErrorText>Error</ErrorText>}
    </Container>
  );
}
const SmallContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorText = styled.p`
  color: red;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 600px;
`;

const SearchField = styled.input`
  flex: 1;
  height: 54px;
  border: 2px solid #f77731;
  background: transparent;
  border-radius: 30px;
  padding: 0 15px;

  ::placeholder {
    color: #f77731;
  }
`;

const SearchButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54px;
`;

const SearchIcon = styled(IoIosSearch)`
  font-size: 2rem;
  color: #f77731;
`;

export default InputField;
