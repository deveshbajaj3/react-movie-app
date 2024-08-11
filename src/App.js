import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Movie from './components/Movie';
import MovieDetails from './components/MovieDetails';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Movie />} />
          <Route path="movie/:id" element={<MovieDetails />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
