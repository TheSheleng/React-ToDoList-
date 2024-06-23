interface SearchBarProps {onSearch:(term: string) =>void }
import { InputGroup, FormControl } from 'react-bootstrap';

const SearchBar = ({onSearch}:SearchBarProps) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
      <FormControl
        type="text"
        className="search-bar"
        aria-label="Search by tag"
        aria-describedby="basic-addon1"
        onChange={(e) =>  onSearch(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
