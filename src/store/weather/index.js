import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getWeather, getWeatherByCoords } from '../../services/api'

export const getWeatherDataByCityName = createAsyncThunk('weatherDataByCityName', async (cityName) => {
    const response = await getWeather(cityName);
    return response;
})

export const getWeatherDataByLatAndLon = createAsyncThunk('weatherDataByLatLon', async ({ lat, lon }) => {
    const response = await getWeatherByCoords(lat, lon);
    return response
})

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        isLoading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getWeatherDataByCityName.pending, (state, action) => {
            state.isLoading = true;
            state.error = null
            return state
        })

        builder.addCase(getWeatherDataByCityName.fulfilled, (state, action) => {
            state.isLoading = false;
            const windSpeedKmH = parseFloat((action.payload.wind.speed * 3.6).toFixed(2));
            state.data = {
                celcius: action.payload.main.temp,
                name: action.payload.name,
                humidity: action.payload.main.humidity,
                visibility: action.payload.visibility / 1000,
                windSpeed: windSpeedKmH,
                weather: action.payload.weather[0].main
            };
            state.error = null
            return state
        })

        builder.addCase(getWeatherDataByCityName.rejected, (state, action) => {
            state.isLoading = false;
            state.data = null;
            state.error = action.payload;
            return state
        })

        builder.addCase(getWeatherDataByLatAndLon.pending, (state, action) => {
            state.isLoading = true;
            state.error = null
            return state
        })

        builder.addCase(getWeatherDataByLatAndLon.fulfilled, (state, action) => {
            state.isLoading = false;
            const windSpeedKmH = parseFloat((action.payload.wind.speed * 3.6).toFixed(2));
            state.data = {
                celcius: action.payload.main.temp,
                name: action.payload.name,
                humidity: action.payload.main.humidity,
                visibility: action.payload.visibility / 1000,
                windSpeed: windSpeedKmH,
                weather: action.payload.weather[0].main
            };
            state.error = null
            return state
        })

        builder.addCase(getWeatherDataByLatAndLon.rejected, (state, action) => {
            state.isLoading = false;
            state.data = null;
            state.error = action.payload;
            return state
        })
    }
})

export default weatherSlice.reducer