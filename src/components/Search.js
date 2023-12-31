import React from 'react';
import { useState } from 'react';
import { Stack, Button, Box, Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { getWeather, getWeatherByCoords } from '../services/api';


export default function Search({ updateWeather }) {

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

  const getLocationWeather = async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await getWeatherByCoords(latitude, longitude);
          updateWeather(response);
        } catch (error) {
          console.log(error.message);
        }
      });
    } else {
      console.log('Geolocation is not supported.');
    }
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        onChange={(e) => handleChange(e)}
        id="search-input"
        label="Search City"
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <React.Fragment>
              <Button onClick={getWeatherInfo} variant="contained" color="primary" size="small">
                <SearchIcon />
              </Button>
              <Button
                onClick={getLocationWeather}
                sx={{ marginLeft: 1 }}
                variant="contained"
                color="primary"
                size="small"
              >
                <MyLocationIcon />
              </Button>
            </React.Fragment>
          ),
        }}
      />
    </Box>

  );
}

