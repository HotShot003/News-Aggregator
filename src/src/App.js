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



// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Navbar from './container/Navbar';
// import Content from './container/Content';
// import Dashboard from './container/Dashboard';
// import LikedArticles from './container/LikedArticles';
// import { LikedArticlesProvider } from './container/LikedArticlesContext';
// import Footer from '../src/container/Footer';

// function App() {
//   return (
//     <Router>
//       <LikedArticlesProvider>
//         <div className="App">
//           <Navbar />
//           <hr className="hr-custom" />
//           <div className="main-container">
//             <aside className="sidebar">
//               <Content />
//             </aside>
//             <main className="main-content">
//               <Switch>
//                 <Route exact path="/" component={Dashboard} />
//                 <Route path="/liked" component={LikedArticles} />
//               </Switch>
//             </main>
//           </div>
//           <Footer />
//         </div>
//       </LikedArticlesProvider>
//     </Router>
//   );
// }

// export default App;
