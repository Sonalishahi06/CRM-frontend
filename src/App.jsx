
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from "./components/ProtectedRoute"
import Customer from "./pages/Customer";
import Lead from "./pages/Lead";

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route
           path="/dashboard" 
           element={
           <ProtectedRoute>
           <Dashboard/>
          </ProtectedRoute>
          }
           />
          <Route path="/customers"element={<Customer />}/>
          <Route path="/leads" element={<Lead/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
