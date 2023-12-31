import { Container, Typography, Card, CardContent, Box, CardMedia } from '@mui/material'
import React, { useState } from 'react'
import FreeSolo from './Search'
import cloudyImage from '../assets/images/cloudy.png';
import fewClouds from '../assets/images/fewclouds.png';
import mist from '../assets/images/mist.png';
import rainy from '../assets/images/rain.png';
import snow from '../assets/images/snow.png';
import sunny from '../assets/images/sun.png';
import thunderstorm from '../assets/images/thunderstorm.png';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';



export default function Mainbox() {
  const [weatherData, setWeatherData] = useState({
    celcius: 0,
    name: 'London',
    humidity: 0,
    visibility: 0,
    windSpeed: 0,
    weather: 'Clouds',
  });

  const [icon, setIcon] = useState(fewClouds);



  const updateWeather = (data) => {
    const windSpeedKmH = parseFloat((data.wind.speed * 3.6).toFixed(2));

    setWeatherData({
      celcius: data.main.temp,
      name: data.name,
      humidity: data.main.humidity,
      visibility: data.visibility / 1000,
      windSpeed: windSpeedKmH,
      weather: data.weather[0].main


    });

    if (data.weather[0].main === 'Clouds') {
      setIcon(cloudyImage);
    } if (data.weather[0].main === 'few clouds') {
      setIcon(fewClouds);
    } if (data.weather[0].main === 'Clear') {
      setIcon(sunny);
    } if (data.weather[0].main === 'Mist') {
      setIcon(mist);
    } if (data.weather[0].main === 'Rain') {
      setIcon(rainy);
    } if (data.weather[0].main === 'Snow') {
      setIcon(snow);
    } if (data.weather[0].main === 'Thunderstorm') {
      setIcon(thunderstorm);

    } else {

    }

  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container>
      <Box>
        <FreeSolo sx={{ marginBottom: 5 }} updateWeather={updateWeather} />
      </Box>
      <Card variant='elevation' sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        backgroundImage: 'linear-gradient(to right, #ff8a00, #da1b60)',
        height: isMobile ? 'auto' : 250,
      }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'center', }} >
          <CardMedia
            sx={{
              display: 'flex', justifyContent: 'center', objectFit: 'contain', marginTop: isMobile ? '10px' : '20px', height: isMobile ? '60%' : '50%',  width: isMobile ? '60%' : '40%',
            }}
            component="img"
            image={icon}
            title="Image Title"
            alt="Image Alt Text"
          />
          <CardContent>
            <Typography sx={{ textAlign: 'center', fontSize: 30 }} variant="body1">{weatherData.weather}</Typography>
            <Typography sx={{ textAlign: 'center', fontSize: 32 }} variant="body1">{weatherData.celcius}°C</Typography>
          </CardContent>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: isMobile ? 'center' : 'flex-start' }}>
          <Box sx={{ margin: isMobile ? '10px 0' : 2 }}>
            <Typography variant="body1" sx={{ textAlign: isMobile ? 'center' : 'left' }}>
              Wind Speed: {weatherData.windSpeed} km/h<br /> Humidity: {weatherData.humidity}%<br /> Visibility: {weatherData.visibility} km
            </Typography>
          </Box>
          <Typography sx={{ textAlign: isMobile ? 'center' : 'left', fontSize: isMobile ? 30 : 40,margin: isMobile ? '20px 0' : 2 }} variant="body1">
            {weatherData.name}
          </Typography>
        </Box>
      </Card>
    </Container>
  )
}

