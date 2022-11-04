import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FaDollarSign } from 'react-icons/fa';
import { linearAlertBottom } from '../../../../utils/swalMixins';
import moment from 'moment';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

import SelectProjectWithPopOver from '../../../../components/select-project-popover/select-project-popover.component';
import SelectCategoryWithPopOver from '../../../../components/select-category-popover/select-category-popover.component';
import AddImageModal from '../../../../components/add-image-modal/add-image-modal.component';
import ManualTimer from './manual-timer.component';
import AddMaterialExpenses from '../../../../components/add-material-expenses/add-material-expenses.component';
import AddOperatingExpenses from '../../../../components/add-operational-expenses/add-operational-expenses.component';

import { addTimeEntryStart } from '../../../../redux/time-entry/time-entry.actions';
import { ReactComponent as AddImagesIcon } from '../../../../assets/icons/timetracker/add-image.svg';

import { IoMdAddCircleOutline } from 'react-icons/io';

import 'react-datepicker/dist/react-datepicker.css';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    background: '#000',
  },
}))(Badge);

const CAManualInput = ({
  toggleAutomatic,
  addTimeEntryStart,
  selectedWorkspaceData,
  projects,
  categories,
  opeExps,
  matExps,
  currentUser,
}) => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [startTimeDate, setStartTimeDate] = useState(new Date());
  const [endTimeDate, setEndTimeDate] = useState(new Date());

  const [open, setOpen] = useState(false);
  const [meOpen, setMeOpen] = useState(false);
  const [oeOpen, SetOeOpen] = useState(false);
  // const [billable, setBillable] = useState(false);

  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });

  const [entryNote, setEntryNote] = useState('');
  const [project, setProject] = useState({});
  const [categoriesArr, setCategoriesArr] = useState([...categories]);
  const [images, setImages] = useState([]);

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [ME, setME] = useState([]);
  const [OE, setOE] = useState([]);

  useEffect(() => {
    setCategoriesArr(categories);
  }, [categories]);

  useEffect(() => {
    setProject({});
  }, [projects]);

  const resetState = () => {
    setEntryNote('');
    setProject({});
    setImages([]);
    // setBillable(false);
    setStartTime(new Date());
    setEndTime(new Date());
    setBreakMinutes(0);
    setSelectedDay(new Date());
    setME([]);
    setOE([]);

    const cats = categories.map((item) => {
      if (item.selected) {
        item.selected = false;
      }

      return item;
    });
    setCategoriesArr(cats);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMeOpen = () => {
    setMeOpen(true);
  };

  const handleMeClose = () => {
    setMeOpen(false);
  };

  const handleOeOpen = () => {
    SetOeOpen(true);
  };

  const handleOeClose = () => {
    SetOeOpen(false);
  };

  // const handleBillable = () => {
  //   setBillable(!billable);
  // };

  const handleTotal = (startTime, endTime, breakMinutes) => {
    const start = moment(startTime);
    const end = moment(endTime);

    let total = end.diff(start);
    total = moment.utc(total);
    if (breakMinutes > 0) {
      total = total.subtract(breakMinutes, 'm');
    }

    const timeObj = {
      ms: total.millisecond(),
      s: total.second(),
      m: total.minute(),
      h: total.hour(),
    };

    setTime(timeObj);

    return total;
  };

  const handleSubmit = () => {
    const total = handleTotal(startTime, endTime, breakMinutes);

    if (!entryNote) {
      linearAlertBottom.fire({
        icon: 'warning',
        title: 'Please write something in text field',
      });
      return;
    }

    const entry = {
      workspaceId: selectedWorkspaceData.workspaceId,
      createdAt: selectedDay,
      createdBy: currentUser.userId,
      displayName: currentUser.displayName,
      email: currentUser.email,
      entryNote: entryNote ? entryNote : null,
      project: project ? project : null,
      images: images ? images : null,
      categories:
        categoriesArr.length > 0
          ? categoriesArr.filter((item) => item.selected === true)
          : null,
      materialExps: ME,
      operatingExps: OE,
      // billable,
      startTime: selectedDay,
      endTime,
      totalTime: total._d,
      timeEntryType: 'manual',
    };

    addTimeEntryStart({ entry, path: 'caTimeEntries' });
    resetState();
  };

  return (
    <div className='ca-man-grid'>
      <input
        type='text'
        name=''
        className='ca-tt-input'
        placeholder='What are you working on?'
        value={entryNote}
        onChange={(e) => setEntryNote(e.target.value)}
      />

      <SelectProjectWithPopOver
        classAsProp='ca-tt-project-btn'
        projects={projects}
        setProject={setProject}
        project1={project}
      />

      <div className='add-images-container'>
        {images.length > 0 ? (
          <StyledBadge badgeContent={images.length} color='secondary'>
            <AddImagesIcon
              className='add-images'
              onClick={handleOpen}
            />
          </StyledBadge>
        ) : (
          <AddImagesIcon
            className='add-images'
            onClick={handleOpen}
          />
        )}
      </div>

      <SelectCategoryWithPopOver
        classAsProp='ca-tt-categories-btn'
        categoriesArr={categoriesArr}
        setCategoriesArr={setCategoriesArr}
      />

      <div className='ca-add-exp material-exp' onClick={handleOeOpen}>
        <IoMdAddCircleOutline />
        <span>Operational Exp</span>
      </div>

      <div
        className='ca-add-exp operational-exp'
        onClick={handleMeOpen}
      >
        <IoMdAddCircleOutline />

        <span>Material Exp</span>
      </div>
      {/* 
      <FaDollarSign
        className={`tt-billable ${
          billable ? 'fill-white' : 'fill-grey'
        }`}
        onClick={handleBillable}
      /> */}

      <ManualTimer
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        setBreakMinutes={setBreakMinutes}
        setSelectedDay={setSelectedDay}
        handleSubmit={handleSubmit}
        handleTotal={handleTotal}
        startTime={startTime}
        endTime={endTime}
        selectedDay={selectedDay}
        breakMinutes={breakMinutes}
        time={time}
      />

      <div className='ca-tt-switch non-selectable'>
        <img
          src={require('../../../../assets/icons/clock.png')}
          alt='some'
          onClick={toggleAutomatic}
        />

        <img
          src={require('../../../../assets/icons/timetracker/thumbnails.png')}
          alt='some'
        />
      </div>
      <AddImageModal
        open={open}
        handleClose={handleClose}
        images={images}
        setImages={setImages}
      />
      <AddMaterialExpenses
        open={meOpen}
        handleClose={handleMeClose}
        matExps={matExps}
        ME={ME}
        setME={setME}
      />
      <AddOperatingExpenses
        open={oeOpen}
        handleClose={handleOeClose}
        opeExps={opeExps}
        OE={OE}
        setOE={setOE}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspaceData: state.workspace.selectedWorkspaceData,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  addTimeEntryStart: (payload) =>
    dispatch(addTimeEntryStart(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CAManualInput);
