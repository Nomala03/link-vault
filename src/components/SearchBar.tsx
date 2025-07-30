type Props = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

function SearchBar({ searchTerm, onSearchChange }: Props) {
  return (
    <div style={{ marginBottom: '2px' }}>
      <input
        type="text"
        placeholder="Search by title, link, description, or tags..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
}

export default SearchBar;
