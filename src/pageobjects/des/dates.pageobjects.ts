const datesfunction = () => {
  const initialDate = new Date();
  console.log('InitialDate:', new Date(initialDate.setDate(initialDate.getDate() + 3)).toUTCString());
};

const checkDateFunction = () => {
  const dateToCheck = '16 May 2022';
  const initialDate = new Date();
  const expectedDate = new Date(initialDate.setDate(initialDate.getDate() + 3));
  const month = expectedDate.toLocaleString('default', { month: 'long' });
  const expectedDateString = `${expectedDate.getDate()} ${month} ${expectedDate.getFullYear()}`;
  console.log('ExpextedDateString:', expectedDateString);
  console.log(dateToCheck === expectedDateString);
};

datesfunction();
checkDateFunction();
