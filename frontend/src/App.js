import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PaymentSuccess from './pages/PaymentSuccess';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/paymentsuccess" element={<PaymentSuccess/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
