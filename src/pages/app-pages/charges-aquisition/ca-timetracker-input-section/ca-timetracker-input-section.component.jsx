import React, { useState } from 'react';

import AutomaticInput from './ca-automatic-input.component';
import ManualInput from './ca-manual-input.component';

const CATimeTrackerInputSection = ({
  projects,
  categories,
  opeExps,
  matExps,
}) => {
  const [automatic, setAutomatic] = useState(true);

  const toggleAutomatic = () => {
    setAutomatic(true);
  };

  const toggleManual = () => {
    setAutomatic(false);
  };

  return (
    <div className='ca-tt-input-section'>
      {automatic ? (
        <AutomaticInput
          toggleManual={toggleManual}
          projects={projects}
          categories={categories}
          opeExps={opeExps}
          matExps={matExps}
        />
      ) : (
        <ManualInput
          toggleAutomatic={toggleAutomatic}
          projects={projects}
          categories={categories}
          opeExps={opeExps}
          matExps={matExps}
        />
      )}
    </div>
  );
};

export default CATimeTrackerInputSection;
