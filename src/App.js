import './App.css';
import { Container , Typography } from '@mui/material';
import MainBox from './components/Mainbox';



function App() {
  return (
    <Container maxWidth="sm">
     <Typography mt={2} variant="h3" sx={{ textAlign: 'center', margin: '20px 0',color: '#da1b60' }}>
        Mk Weather App
      </Typography>
      <MainBox />
    </Container>
   
    
  );
}

export default App;
