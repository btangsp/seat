import React, { useState } from 'react';

import './css/components.css';

import MultiStepSurvey from './components/MultiPageSurvey';

const App = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="user-study">
      <MultiStepSurvey />
    </div>
  );
};

export default App;
