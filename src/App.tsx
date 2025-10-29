import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Grade3Exam1 from './components/grade3/Exam1';
import Grade4Exam1 from './components/grade4/Exam1';

function App() {
  return (
    <Router basename="/hypothesis-testing">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grade3/exam1" element={<Grade3Exam1 />} />
        <Route path="/grade4/exam1" element={<Grade4Exam1 />} />
      </Routes>
    </Router>
  );
}

export default App;

