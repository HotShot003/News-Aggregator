// App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './container/Navbar';
import Content from './container/Content';
import Dashboard from './container/Dashboard';
import Contact from './container/ContactUs/Contact'; // Import Contact component
import Footer from './container/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <hr className="hr-custom" />
        <div className="main-container">
          <aside className="sidebar">
            <Content />
          </aside>
          <main className="main-content">
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
