import moment from 'moment';
import toDate from './toDate';

export const convertTimeStampToGivenFormat = (
  fireTimestamp,
  format,
  utc,
) => {
  if (Object.keys(fireTimestamp).length > 0) {
    let time = toDate(fireTimestamp);
    if (utc === true) {
      time = moment.utc(time);
    } else {
      time = moment(time);
    }

    time = time.format(format);

    return time;
  }
  let time;

  if (utc === true) {
    time = moment.utc(fireTimestamp);
  } else {
    time = moment(fireTimestamp);
  }

  time = time.format(format);

  return time;
};
