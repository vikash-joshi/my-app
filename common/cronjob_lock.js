// utils/lock.js
let isLocked = false;

const acquireLock = () => {
  if (isLocked) {
    return false;
  } else {
    isLocked = true;
    return true;
  }
};

const releaseLock = () => {
  isLocked = false;
};

module.exports = { acquireLock, releaseLock };
