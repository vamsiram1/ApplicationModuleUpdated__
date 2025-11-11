import React, { useRef, useState, useEffect } from "react";
import styles from "../analytical-header-part-components/AnalyticsHeader.module.css";
import ApplicationSearchHeaderIcon from "../../../assets/application-analytics/ApplicationSearchHeaderIcon";
import ApplicationSearchBar from "../../../widgets/application-search-bar-component/ApplicationSearchBar";
import SearchDropdown from "../analytics-header-part/searchbar-drop-down-component/SearchDropdown";
import FilterSearch from "../analytics-header-part/filter-search-component/FilterSearch";

const AnalyticsHeader = () => {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const wrapperRef = useRef(null);

  const items = [
    { id: 1, name: "vamsi" },
    { id: 2, name: "Ram" },
    { id: 3, name: "sravani" },
    { id: 4, name: "srinagar" },
    { id: 5, name: "dudu" },
    { id: 4, name: "vamsi ram" },
    { id: 4, name: "vamsi kond" },
    { id: 4, name: "vamsi" },
    { id: 4, name: "vamsi ramana" },
  ];

  const handleSearchBarClick = () => {
    setShowSearchDropdown(!showSearchDropdown);
    setShowSuggestions(false);
  };

  // Case-insensitive filter + EXACT de-duplication + top-5
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const q = value.toLowerCase().trim();

    if (!q) {
      setSuggestions([]);
      setShowSuggestions(false);
      setShowSearchDropdown(false);
      return;
    }

    // Filter (case-insensitive)
    const filtered = items.filter((it) => it.name.toLowerCase().includes(q));

    // De-duplicate by exact original string
    const seen = new Set();
    const unique = [];
    for (const it of filtered) {
      if (!seen.has(it.name)) {
        seen.add(it.name);
        unique.push(it);
      }
    }

    // Top-5 only
    setSuggestions(unique.slice(0, 5));
    setShowSuggestions(true);
    setShowSearchDropdown(false);
  };

  useEffect(() => {
    function handleOutside(e) {
      const clickedInsideWrapper = wrapperRef.current?.contains(e.target);
      if (clickedInsideWrapper) return;
      setShowSearchDropdown(false);
      setShowSuggestions(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className={styles.analytics_header_and_search_bar} ref={wrapperRef}>
      <div className={styles.analytics_header}>
        <ApplicationSearchHeaderIcon height="44" width="44" />
        <div>
          <h3 className={styles.analytics_heading}>Application Analytics</h3>
          <p className={styles.analytics_header_text_para}>
            Get all the analytics and growth rate of applications
          </p>
        </div>
      </div>

      <div className={styles.searchbar_wrapper}>
        <ApplicationSearchBar
          placeholderText="Search for Zone, DGM or Campus"
          customClass={styles.custom_search_bar}
          onClick={handleSearchBarClick}
          onChange={handleInputChange}
          value={searchTerm}
        />

        {showSuggestions && <FilterSearch suggestions={suggestions} />}
        {showSearchDropdown && <SearchDropdown />}
      </div>
    </div>
  );
};

export default AnalyticsHeader;
