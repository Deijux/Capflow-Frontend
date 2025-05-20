import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchStore } from "../../stores";

const SearchBar = () => {
  const { setSearchTerm } = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("q") || "";
    if (inputRef.current) inputRef.current.value = q;
    setSearchTerm(q);
  }, [searchParams, setSearchTerm]);

  const handleSearch = () => {
    const value = inputRef.current?.value || "";
    setSearchParams({ q: value });
    setSearchTerm(value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="flex w-full items-center justify-center"
    >
      <input
        type="text"
        placeholder="Search..."
        className="w-1/2 rounded border border-gray-300 p-2"
        ref={inputRef}
      />
      <button className="ml-2 rounded bg-blue-500 p-2 text-white">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
