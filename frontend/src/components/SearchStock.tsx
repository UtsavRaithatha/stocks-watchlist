import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

interface Stock {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

interface SearchBoxProps {
  addToWatchlist: (stock: Stock) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ addToWatchlist }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<Stock[]>([]);

  const handleInputChange = async (
    event: React.ChangeEvent<{}>,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${newInputValue}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}`
      );
      setOptions(response.data.bestMatches || []);
      console.log(response.data.bestMatches);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Autocomplete
      fullWidth
      freeSolo
      disableClearable
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string"
          ? option
          : `${option["1. symbol"]} ${option["2. name"]}`
      }
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a stock"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} onClick={() => addToWatchlist(option)}>
          <strong>{option["1. symbol"]}</strong>&nbsp;{option["2. name"]}
        </li>
      )}
    />
  );
};

export default SearchBox;
