import './App.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LandingPage from './pages/LandingPage/LandingPage';
import EmployeeInformationContext from './shared/contexts/EmployeeInformationContext';

function App() {
  return (
    <EmployeeInformationContext>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <LandingPage />
      </LocalizationProvider>
    </EmployeeInformationContext>
  );
}

export default App;
