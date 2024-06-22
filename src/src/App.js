import React from 'react';
import './App.css';
import Dashboard from './container/Dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My React News App</h1>
      </header>
      <main>
        <Dashboard />
      </main>
      {/* <footer>
        <p>Footer content here</p>
      </footer> */}
    </div>
  );
}

export default App;
