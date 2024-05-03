import React from "react";
import { countries } from "countries-list";
import styles from '../../../pagelayout/data/page.module.css'

const CountryDropdown = ({ value, onChange }) => {
  return (
    <select
      id="country"
      name="country"
      value={value}
      className={styles.inputField}
      onChange={onChange}
    >
      {Object.keys(countries).map((code) => (
        <option key={code} value={code}>
          {countries[code].name}
        </option>
      ))}
    </select>
  );
};

export default CountryDropdown;
