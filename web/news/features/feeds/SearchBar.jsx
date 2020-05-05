import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = (props) => {
  const { searchValue, setSearchValue } = props;

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
        className="w-100 form-control"
        placeholder="Найти новость.."
      />
    </Form>
  );
};

export default SearchBar;
