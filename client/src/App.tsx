import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import PostPage from './pages/PostPage'
import CategoryPage from './pages/CategoryPage'

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />
        <main className='container mx-auto py-6 px-4'>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/post/:slug' element={<PostPage/>} />
            <Route path='/categoria/:slug' element={<CategoryPage/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
