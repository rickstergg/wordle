export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

export const isLetter = (keyCode: number) => {
  return (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) ? true : false
}

export const isDelete = (keyCode: number) => {
  return keyCode === 8;
}

export const isEnter = (keyCode: number) => {
  return keyCode === 13;
}
