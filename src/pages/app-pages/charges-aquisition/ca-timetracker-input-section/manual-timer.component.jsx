import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';

const ManualTimer = ({
  setStartTime,
  setEndTime,
  setBreakMinutes,
  handleSubmit,
  handleTotal,
  setSelectedDay,
  startTime,
  endTime,
  selectedDay,
  breakMinutes,
  time,
}) => {
  const handleBreak = (e) => {
    const value = Number(e.target.value);
    if (value < 0) {
      return;
    }

    setBreakMinutes(value);
    handleTotal(startTime, endTime, value);
  };

  const handleStartTime = (date) => {
    setStartTime(date);
    handleTotal(date, endTime, breakMinutes);
  };

  const handleEndTime = (date) => {
    setEndTime(date);
    handleTotal(startTime, date, breakMinutes);
  };

  return (
    <Fragment>
      <div className='ca-tt-input-time-wrapper'>
        <DatePicker
          selected={startTime}
          onChange={(date) => handleStartTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption='Time'
          dateFormat='h:mm aa'
          className='manual-time-input'
        />
        <span>-</span>
        <DatePicker
          selected={endTime}
          onChange={(date) => handleEndTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption='Time'
          dateFormat='h:mm aa'
          className='manual-time-input'
        />
      </div>

      <div className='ca-tt-datepicker'>
        <DatePicker
          selected={selectedDay}
          onChange={(date) => setSelectedDay(date)}
        />
      </div>
      <div className='break-input-container'>
        <span>Break time (mins):</span>
        <input
          type='number'
          className='break-input'
          placeholder='in mins'
          value={breakMinutes}
          onChange={handleBreak}
        />
      </div>

      <p className='ca-tt-time-display'>
        {time.h >= 10 ? time.h : '0' + time.h}:
        {time.m >= 10 ? time.m : '0' + time.m}:
        {time.s >= 10 ? time.s : '0' + time.s}
      </p>

      <button className='ca-tt-add-btn' onClick={handleSubmit}>
        ADD
      </button>
    </Fragment>
  );
};

export default ManualTimer;
