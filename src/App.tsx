import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Grade3Exam1 from './components/grade3/Exam1';
import Grade4Exam1 from './components/grade4/Exam1';

import Grade3Section1Set1 from './components/grade3/Section1_DescriptiveStats_1';
import Grade3Section1Set2 from './components/grade3/Section1_DescriptiveStats_2';
import Grade3Section1Set3 from './components/grade3/Section1_DescriptiveStats_3';

import Grade3Section2Set1 from './components/grade3/Section2_Probability_1';
import Grade3Section2Set2 from './components/grade3/Section2_Probability_2';
import Grade3Section2Set3 from './components/grade3/Section2_Probability_3';

import Grade3Section3Set1 from './components/grade3/Section3_Inference_1';
import Grade3Section3Set2 from './components/grade3/Section3_Inference_2';
import Grade3Section3Set3 from './components/grade3/Section3_Inference_3';

import Grade3Section4Set1 from './components/grade3/Section4_Regression_1';
import Grade3Section4Set2 from './components/grade3/Section4_Regression_2';
import Grade3Section4Set3 from './components/grade3/Section4_Regression_3';

import Grade3Section5Set1 from './components/grade3/Section5_ANOVA_1';
import Grade3Section5Set2 from './components/grade3/Section5_ANOVA_2';
import Grade3Section5Set3 from './components/grade3/Section5_ANOVA_3';

import Grade3Section6Set1 from './components/grade3/Section6_DataCollection_1';
import Grade3Section6Set2 from './components/grade3/Section6_DataCollection_2';
import Grade3Section6Set3 from './components/grade3/Section6_DataCollection_3';

import Grade3Section7Set1 from './components/grade3/Section7_TimeSeries_1';
import Grade3Section7Set2 from './components/grade3/Section7_TimeSeries_2';
import Grade3Section7Set3 from './components/grade3/Section7_TimeSeries_3';

import Grade3Section8Set1 from './components/grade3/Section8_Multivariate_1';
import Grade3Section8Set2 from './components/grade3/Section8_Multivariate_2';
import Grade3Section8Set3 from './components/grade3/Section8_Multivariate_3';

import Grade3Section9Set1 from './components/grade3/Section9_AdvancedTesting_1';
import Grade3Section9Set2 from './components/grade3/Section9_AdvancedTesting_2';
import Grade3Section9Set3 from './components/grade3/Section9_AdvancedTesting_3';

import Grade3Section10Set1 from './components/grade3/Section10_Applied_1';
import Grade3Section10Set2 from './components/grade3/Section10_Applied_2';
import Grade3Section10Set3 from './components/grade3/Section10_Applied_3';

import Grade4Section1Set1 from './components/grade4/Section1_RepresentativeValues_1';
import Grade4Section1Set2 from './components/grade4/Section1_RepresentativeValues_2';
import Grade4Section1Set3 from './components/grade4/Section1_RepresentativeValues_3';

import Grade4Section2Set1 from './components/grade4/Section2_Dispersion_1';
import Grade4Section2Set2 from './components/grade4/Section2_Dispersion_2';
import Grade4Section2Set3 from './components/grade4/Section2_Dispersion_3';

import Grade4Section3Set1 from './components/grade4/Section3_FrequencyTable_1';
import Grade4Section3Set2 from './components/grade4/Section3_FrequencyTable_2';
import Grade4Section3Set3 from './components/grade4/Section3_FrequencyTable_3';

import Grade4Section4Set1 from './components/grade4/Section4_Graphs_1';
import Grade4Section4Set2 from './components/grade4/Section4_Graphs_2';
import Grade4Section4Set3 from './components/grade4/Section4_Graphs_3';

import Grade4Section5Set1 from './components/grade4/Section5_Probability_1';
import Grade4Section5Set2 from './components/grade4/Section5_Probability_2';
import Grade4Section5Set3 from './components/grade4/Section5_Probability_3';

import Grade4Section6Set1 from './components/grade4/Section6_Correlation_1';
import Grade4Section6Set2 from './components/grade4/Section6_Correlation_2';
import Grade4Section6Set3 from './components/grade4/Section6_Correlation_3';

import Grade4Section7Set1 from './components/grade4/Section7_BoxPlot_1';
import Grade4Section7Set2 from './components/grade4/Section7_BoxPlot_2';
import Grade4Section7Set3 from './components/grade4/Section7_BoxPlot_3';

import Grade4Section8Set1 from './components/grade4/Section8_Histogram_1';
import Grade4Section8Set2 from './components/grade4/Section8_Histogram_2';
import Grade4Section8Set3 from './components/grade4/Section8_Histogram_3';

import Grade4Section9Set1 from './components/grade4/Section9_Sample_1';
import Grade4Section9Set2 from './components/grade4/Section9_Sample_2';
import Grade4Section9Set3 from './components/grade4/Section9_Sample_3';

import Grade4Section10Set1 from './components/grade4/Section10_DataCollection_1';
import Grade4Section10Set2 from './components/grade4/Section10_DataCollection_2';
import Grade4Section10Set3 from './components/grade4/Section10_DataCollection_3';

function App() {
  return (
    <Router basename="/hypothesis-testing">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grade3/exam1" element={<Grade3Exam1 />} />
        <Route path="/grade4/exam1" element={<Grade4Exam1 />} />
        
        <Route path="/grade3/section1/set1" element={<Grade3Section1Set1 />} />
        <Route path="/grade3/section1/set2" element={<Grade3Section1Set2 />} />
        <Route path="/grade3/section1/set3" element={<Grade3Section1Set3 />} />
        
        <Route path="/grade3/section2/set1" element={<Grade3Section2Set1 />} />
        <Route path="/grade3/section2/set2" element={<Grade3Section2Set2 />} />
        <Route path="/grade3/section2/set3" element={<Grade3Section2Set3 />} />
        
        <Route path="/grade3/section3/set1" element={<Grade3Section3Set1 />} />
        <Route path="/grade3/section3/set2" element={<Grade3Section3Set2 />} />
        <Route path="/grade3/section3/set3" element={<Grade3Section3Set3 />} />
        
        <Route path="/grade3/section4/set1" element={<Grade3Section4Set1 />} />
        <Route path="/grade3/section4/set2" element={<Grade3Section4Set2 />} />
        <Route path="/grade3/section4/set3" element={<Grade3Section4Set3 />} />
        
        <Route path="/grade3/section5/set1" element={<Grade3Section5Set1 />} />
        <Route path="/grade3/section5/set2" element={<Grade3Section5Set2 />} />
        <Route path="/grade3/section5/set3" element={<Grade3Section5Set3 />} />
        
        <Route path="/grade3/section6/set1" element={<Grade3Section6Set1 />} />
        <Route path="/grade3/section6/set2" element={<Grade3Section6Set2 />} />
        <Route path="/grade3/section6/set3" element={<Grade3Section6Set3 />} />
        
        <Route path="/grade3/section7/set1" element={<Grade3Section7Set1 />} />
        <Route path="/grade3/section7/set2" element={<Grade3Section7Set2 />} />
        <Route path="/grade3/section7/set3" element={<Grade3Section7Set3 />} />
        
        <Route path="/grade3/section8/set1" element={<Grade3Section8Set1 />} />
        <Route path="/grade3/section8/set2" element={<Grade3Section8Set2 />} />
        <Route path="/grade3/section8/set3" element={<Grade3Section8Set3 />} />
        
        <Route path="/grade3/section9/set1" element={<Grade3Section9Set1 />} />
        <Route path="/grade3/section9/set2" element={<Grade3Section9Set2 />} />
        <Route path="/grade3/section9/set3" element={<Grade3Section9Set3 />} />
        
        <Route path="/grade3/section10/set1" element={<Grade3Section10Set1 />} />
        <Route path="/grade3/section10/set2" element={<Grade3Section10Set2 />} />
        <Route path="/grade3/section10/set3" element={<Grade3Section10Set3 />} />
        
        <Route path="/grade4/section1/set1" element={<Grade4Section1Set1 />} />
        <Route path="/grade4/section1/set2" element={<Grade4Section1Set2 />} />
        <Route path="/grade4/section1/set3" element={<Grade4Section1Set3 />} />
        
        <Route path="/grade4/section2/set1" element={<Grade4Section2Set1 />} />
        <Route path="/grade4/section2/set2" element={<Grade4Section2Set2 />} />
        <Route path="/grade4/section2/set3" element={<Grade4Section2Set3 />} />
        
        <Route path="/grade4/section3/set1" element={<Grade4Section3Set1 />} />
        <Route path="/grade4/section3/set2" element={<Grade4Section3Set2 />} />
        <Route path="/grade4/section3/set3" element={<Grade4Section3Set3 />} />
        
        <Route path="/grade4/section4/set1" element={<Grade4Section4Set1 />} />
        <Route path="/grade4/section4/set2" element={<Grade4Section4Set2 />} />
        <Route path="/grade4/section4/set3" element={<Grade4Section4Set3 />} />
        
        <Route path="/grade4/section5/set1" element={<Grade4Section5Set1 />} />
        <Route path="/grade4/section5/set2" element={<Grade4Section5Set2 />} />
        <Route path="/grade4/section5/set3" element={<Grade4Section5Set3 />} />
        
        <Route path="/grade4/section6/set1" element={<Grade4Section6Set1 />} />
        <Route path="/grade4/section6/set2" element={<Grade4Section6Set2 />} />
        <Route path="/grade4/section6/set3" element={<Grade4Section6Set3 />} />
        
        <Route path="/grade4/section7/set1" element={<Grade4Section7Set1 />} />
        <Route path="/grade4/section7/set2" element={<Grade4Section7Set2 />} />
        <Route path="/grade4/section7/set3" element={<Grade4Section7Set3 />} />
        
        <Route path="/grade4/section8/set1" element={<Grade4Section8Set1 />} />
        <Route path="/grade4/section8/set2" element={<Grade4Section8Set2 />} />
        <Route path="/grade4/section8/set3" element={<Grade4Section8Set3 />} />
        
        <Route path="/grade4/section9/set1" element={<Grade4Section9Set1 />} />
        <Route path="/grade4/section9/set2" element={<Grade4Section9Set2 />} />
        <Route path="/grade4/section9/set3" element={<Grade4Section9Set3 />} />
        
        <Route path="/grade4/section10/set1" element={<Grade4Section10Set1 />} />
        <Route path="/grade4/section10/set2" element={<Grade4Section10Set2 />} />
        <Route path="/grade4/section10/set3" element={<Grade4Section10Set3 />} />
      </Routes>
    </Router>
  );
}

export default App;

