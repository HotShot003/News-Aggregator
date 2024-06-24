import './App.css';
import Navbar from './container/Navbar';
import Content from './container/Content'; 
import Dashboard from './container/Dashboard';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './container/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="main-container">
          <aside className="sidebar">
            <Content />
          </aside>
          <main className="main-content">
            <Dashboard />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
