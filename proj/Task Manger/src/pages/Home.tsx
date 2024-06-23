import React, { useState } from "react";
import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />
      <TaskList searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
