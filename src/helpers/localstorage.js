let lsTestResult = null;

export const lsTest = () => {
  if (lsTestResult !== null) {
    return lsTestResult;
  }
  const test = "Test.vue";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    lsTestResult = true;
    return true;
  } catch (e) {
    lsTestResult = false;
    return false;
  }
};
