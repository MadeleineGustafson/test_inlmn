import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import styled from "styled-components";

function InputField({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Trigger the onSearch function passed from the parent component (App.js)
    onSearch(searchTerm);
  };

  return (
    <Container>
      <SearchField
        type="Text"
        placeholder="Enter text..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchButton onClick={handleSearch}>
        <SearchIcon />
      </SearchButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 500px; /* Adjust width as needed */
`;

const SearchField = styled.input`
  flex: 1;
  height: 54px;
  border: 2px solid white;
  background: transparent;
  border-radius: 30px;
  padding: 0 15px;

  ::placeholder {
    color: white;
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
  color: white;
`;

export default InputField;
