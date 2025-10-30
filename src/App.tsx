import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Grade3Exam1 from './components/grade3/Exam1';
import Grade4Exam1 from './components/grade4/Exam1';

import Grade4Section1Set1 from './components/grade4/Section1_RepresentativeValues_1';
import Grade4Section1Set2 from './components/grade4/Section1_RepresentativeValues_2';
import Grade4Section1Set3 from './components/grade4/Section1_RepresentativeValues_3';

import Grade4Section2Set1 from './components/grade4/Section2_Dispersion_1';
import Grade4Section2Set2 from './components/grade4/Section2_Dispersion_2';
import Grade4Section2Set3 from './components/grade4/Section2_Dispersion_3';

function App() {
  return (
    <Router basename="/hypothesis-testing">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grade3/exam1" element={<Grade3Exam1 />} />
        <Route path="/grade4/exam1" element={<Grade4Exam1 />} />
        
        <Route path="/grade4/section1/set1" element={<Grade4Section1Set1 />} />
        <Route path="/grade4/section1/set2" element={<Grade4Section1Set2 />} />
        <Route path="/grade4/section1/set3" element={<Grade4Section1Set3 />} />
        
        <Route path="/grade4/section2/set1" element={<Grade4Section2Set1 />} />
        <Route path="/grade4/section2/set2" element={<Grade4Section2Set2 />} />
        <Route path="/grade4/section2/set3" element={<Grade4Section2Set3 />} />
      </Routes>
    </Router>
  );
}

export default App;

