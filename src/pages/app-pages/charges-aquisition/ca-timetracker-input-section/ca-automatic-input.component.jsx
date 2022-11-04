import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { FaDollarSign } from 'react-icons/fa';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

import SelectProjectWithPopOver from '../../../../components/select-project-popover/select-project-popover.component';
import SelectCategoryWithPopOver from '../../../../components/select-category-popover/select-category-popover.component';
import AddImageModal from '../../../../components/add-image-modal/add-image-modal.component';
import AddMaterialExpenses from '../../../../components/add-material-expenses/add-material-expenses.component';
import AddOperatingExpenses from '../../../../components/add-operational-expenses/add-operational-expenses.component';
import AutoTimer from './auto-timer.component';

import { ReactComponent as AddImagesIcon } from '../../../../assets/icons/timetracker/add-image.svg';
import { IoMdAddCircleOutline } from 'react-icons/io';

import { addTimeEntryStart } from '../../../../redux/time-entry/time-entry.actions';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    background: '#000',
  },
}))(Badge);

const CAAutomaticInput = ({
  toggleManual,
  addTimeEntryStart,
  selectedWorkspaceData,
  projects,
  categories,
  opeExps,
  matExps,
  currentUser,
}) => {
  const [open, setOpen] = useState(false);
  const [meOpen, meSetOpen] = useState(false);
  const [oeOpen, SetOeOpen] = useState(false);

  const [entryNote, setEntryNote] = useState('');
  const [project, setProject] = useState({});
  const [categoriesArr, setCategoriesArr] = useState([...categories]);
  const [images, setImages] = useState([]);

  const [startTime, setStartTime] = useState(null);

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
    setCategoriesArr([]);
    setImages([]);
    setStartTime(null);
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
    meSetOpen(true);
  };

  const handleMeClose = () => {
    meSetOpen(false);
  };

  const handleOeOpen = () => {
    SetOeOpen(true);
  };

  const handleOeClose = () => {
    SetOeOpen(false);
  };

  const handleSubmit = (endTime, totalTime) => {
    let totalTimeStamp = moment.utc(0);

    totalTimeStamp.add(totalTime.ms, 'ms');
    totalTimeStamp.add(totalTime.s, 's');
    totalTimeStamp.add(totalTime.m, 'm');
    totalTimeStamp.add(totalTime.h, 'h');

    const entry = {
      workspaceId: selectedWorkspaceData.workspaceId,
      createdAt: new Date(),
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
      startTime,
      endTime,
      totalTime: totalTimeStamp._d,
      timeEntryType: 'automatic',
    };
    addTimeEntryStart({ entry, path: 'caTimeEntries' });
    resetState();
  };

  return (
    <div className='ca-auto-grid'>
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

      {/* <FaDollarSign
        className={`tt-billable ${
          billable ? 'fill-white' : 'fill-grey'
        }`}
        onClick={handleBillable}
        title='Click to change billable status'
      /> */}

      <AutoTimer
        setStartTime={setStartTime}
        handleSubmit={handleSubmit}
        entryNote={entryNote}
      />

      <div className='ca-tt-switch non-selectable'>
        <img
          src={require('../../../../assets/icons/clock.png')}
          alt='some'
        />
        <img
          src={require('../../../../assets/icons/timetracker/thumbnails.png')}
          alt='some'
          onClick={toggleManual}
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
)(CAAutomaticInput);
