import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Login from './components/login/Login';
import MusicList from './components/music/MusicList';
import Slider from './components/slide/Slider';


function App() {
  return (
    <Router> {/* Add the Router component here */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Slider />} />
        <Route path="/login" element={<Login />} />
        <Route path="/musiclist" element={<MusicList/>} />
      </Routes>
    </Router> 

  );
}

export default App;