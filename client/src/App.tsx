import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />
        <main className='container mx-auto py-6 px-4'>
          <Routes>
            <Route path='/' element={<HomePage/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
