const createEmailAddress = () => {
  const date = new Date();
  const dateInMilliseconds = date.getTime();
  return `qa_test${dateInMilliseconds}@tester.com`;
};

module.exports = {
  createEmailAddress,
  testFirstName: 'Test',
  testLastName: 'Test',
  testPassword: 'New1111'
};
