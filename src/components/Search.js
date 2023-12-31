import React from 'react';
import { useState } from 'react';
import { Stack, Button, Box ,Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getWeather } from '../services/api';


export default function Search({updateWeather }) {

  const [city, setCity] = useState('');

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const getWeatherInfo = async () => {
    try {
      const response = await getWeather(city);
      updateWeather(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField onChange={(e) => handleChange(e)}
        id="search-input"
        label="Search City"
        
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <Button onClick={getWeatherInfo} variant="contained" color="primary" size="small">
              <SearchIcon />
            </Button>
          ),
        }}
      />
    </Box>
  );
}

