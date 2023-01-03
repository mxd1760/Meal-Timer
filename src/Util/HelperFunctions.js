export const formatTitle = (str) => {
  let out = "";
  for (let word of str.split(" ")) {
    out += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + " ";
  }
  return out.trim();
};

export const formatTime = (time) => {
  return `${time} minutes`;
};
