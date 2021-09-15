export const randomNumber = () => {
  return Math.floor(Math.random() * 6);
};

export const getTimeFormat = (seconds) => {
  var minutes = Math.floor(seconds / 60)
  minutes = ("0" + minutes).slice(-2);
  seconds -= minutes * 60;
  seconds = ("0" + seconds).slice(-2);
  return minutes + ":" + seconds;
};
