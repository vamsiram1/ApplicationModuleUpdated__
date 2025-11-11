import React from "react";
import styles from "./FilterSearch.module.css";

const normalize = (s = "") => s.toLowerCase().replace(/\s+/g, " ").trim();

const FilterSearch = ({ suggestions = [] }) => {
  return (
    <div className={styles.filter_search_container}>
      <div className={styles.suggestion_header}>
        <p classname={styles.suggestion_text_head}>Search Suggestions</p>
        <div className={styles.line_wrapper}>
          <hr className={styles.suggestion_line} />
        </div>
      </div>

      <ul>
        {suggestions.map((item, index) => (
          <li
            className={styles.list_items}
            key={`${normalize(item.name)}-${index}`}
          >
            {item?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSearch;

