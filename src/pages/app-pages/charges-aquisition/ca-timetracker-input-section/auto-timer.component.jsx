import React, { Fragment, useState } from 'react';

import { ReactComponent as PlayIcon } from '../../../../assets/icons/timetracker/play.svg';
import { ReactComponent as PauseIcon } from '../../../../assets/icons/timetracker/pause.svg';
import { ReactComponent as StopIcon } from '../../../../assets/icons/timetracker/stop.svg';
import { linearAlertBottom } from '../../../../utils/swalMixins';

const AutoTimer = ({ handleSubmit, setStartTime, entryNote }) => {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  // Not started = 0
  // started = 1
  // stopped = 2

  const start = () => {
    run();
    setStatus(1);
    setStartTime(new Date());
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({
      ms: updatedMs,
      s: updatedS,
      m: updatedM,
      h: updatedH,
    });
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };

  const handleStop = () => {
    if (!entryNote) {
      linearAlertBottom.fire({
        icon: 'warning',
        title: 'Please write something in text field',
      });
      return;
    }

    const endTime = new Date();
    const totalTime = time;

    handleSubmit(endTime, totalTime);
    reset();
  };

  const resume = () => start();

  return (
    <Fragment>
      <p className='ca-tt-time-display'>
        {time.h >= 10 ? time.h : '0' + time.h}:
        {time.m >= 10 ? time.m : '0' + time.m}:
        {time.s >= 10 ? time.s : '0' + time.s}
        {/* {time.ms >= 10 ? time.ms : '0' + time.ms} */}
      </p>

      <div className='action-buttons'>
        {status === 0 && (
          <PlayIcon className='action-icon' onClick={start} />
        )}

        {status === 1 && (
          <Fragment>
            <PauseIcon className='action-icon' onClick={stop} />
            <StopIcon
              className='action-icon action-stop'
              onClick={handleStop}
            />
          </Fragment>
        )}

        {status === 2 && (
          <Fragment>
            <PlayIcon className='action-icon' onClick={resume} />
            <StopIcon
              className='action-icon action-stop'
              onClick={handleStop}
            />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default AutoTimer;
