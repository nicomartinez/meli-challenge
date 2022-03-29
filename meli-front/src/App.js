import './App.scss';
import React from 'react';
import NavBar from './NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import ProductListPage from './pages/ProductListPage';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <div className="App">
      <NavBar />
      <section className='App-results'>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<ProductListPage />} />
            <Route path="/items/:id" element={<ProductDetail />} />
            <Route element={Home}/>
        </Routes>
      </section>
    </div>
    </Router>
        
  );
}

export default App;
