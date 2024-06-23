import './App.css';
import Navbar from '../src/container/Navbar';
import Content from '../src/container/Content'; 
import Dashboard from '../src/container/Dashboard';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from '../src/container/Footer';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Navbar />
        <hr className="hr-custom"/>
        <div className="main-container">
          <aside className="sidebar">
            <Content />
          </aside>
          <main className="main-content">
            <Dashboard />
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;

