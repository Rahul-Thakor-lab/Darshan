import { useState, useEffect } from "react";
import API_BASE_URL from "../../../config/api";

export default function useTours() {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllTours();
  }, []);

  const getAllTours = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/tours`);
      if (!res.ok) throw new Error("Failed to fetch tours");
      const data = await res.json();
      setTours(data);
      setFilteredTours(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) setFilteredTours(tours);
    else {
      setFilteredTours(
        tours.filter((t) => t.name.toLowerCase().includes(term.toLowerCase()))
      );
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredTours].sort((a, b) => {
      if (key === "name") {
        return direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (key === "price") {
        return direction === "asc"
          ? a.pricePerPerson - b.pricePerPerson
          : b.pricePerPerson - a.pricePerPerson;
      }
      return 0;
    });

    setFilteredTours(sorted);
  };

  return {
    tours,
    filteredTours,
    getAllTours,
    handleSearch,
    handleSort,
    searchTerm,
    setSearchTerm,
  };
}
