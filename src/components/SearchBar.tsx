import React from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

const SearchBar: React.FC<Props> = ({ searchTerm, onSearchChange }) => {
  return (
    <div style={{ position: 'relative', marginBottom: '28px' }}>
      <FaSearch
        style={{
          position: 'absolute',
          top: '50%',
          left: '12px',
          transform: 'translateY(-50%)',
          color: '#3f3c3cff',
          fontSize: '32px',
          pointerEvents: 'none',
        }}
      />
      <input
        type="text"
        placeholder="Search by title, link, description, or tags..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: '100%',
          padding: '20px 20px 20px 68px',
          fontSize: '24px',
          borderRadius: '100px',
          border: '1px solid #69590a8c',
        }}
      /> 
    </div>
  );
};

export default SearchBar;
