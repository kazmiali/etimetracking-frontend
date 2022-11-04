import React, { useState } from 'react';

import AutomaticInput from './automatic-input.component';
import ManualInput from './manual-input.component';

const TimeTrackerInputSection = ({ projects, categories }) => {
  const [automatic, setAutomatic] = useState(true);

  const toggleAutomatic = () => {
    setAutomatic(true);
  };

  const toggleManual = () => {
    setAutomatic(false);
  };

  return (
    <div className='tt-input-section'>
      {automatic ? (
        <AutomaticInput
          toggleManual={toggleManual}
          projects={projects}
          categories={categories}
        />
      ) : (
        <ManualInput
          toggleAutomatic={toggleAutomatic}
          projects={projects}
          categories={categories}
        />
      )}
    </div>
  );
};

export default TimeTrackerInputSection;
