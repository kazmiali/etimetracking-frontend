const toDate = (timestamp) => {
  return new Date(
    1e3 * timestamp.seconds + timestamp.nanoseconds / 1e6,
  );
};

export default toDate;
