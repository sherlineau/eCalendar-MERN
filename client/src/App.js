import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Login from "./views/Login";
import Main from './views/Main';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Login />} />
        <Route path="/dashboard" element={ <Main/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
