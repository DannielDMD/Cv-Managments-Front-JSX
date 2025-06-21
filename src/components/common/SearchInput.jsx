const SearchInput = ({ search, setSearch }) => (
  <input
    type="text"
    placeholder="Buscar por nombre..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded px-3 py-2 w-full"
  />
);

export default SearchInput;
