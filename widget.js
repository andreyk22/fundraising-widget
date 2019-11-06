const Fundraiser = (function () {
  let goal = 0;
  let alreadyFunded = 0;
  let goalFundedPercent = 0;

  const init = () => {
    showControls();
    refreshData();
  };


  const setDefaulGoal = (value) => {
    goal = value;
    refreshData();
  };

  const setDefaultPercentage = (percent) => {
    goalFundedPercent = percent;
    alreadyFunded = (goalFundedPercent / 100) * goal;
    refreshData();
  };

  const showControls = (show = true) => {
    document.getElementById('fundraise_amount').hidden = !show;
    document.getElementById('fundraise_pledgeButton').hidden = !show;
    document.getElementById('thanksNote').hidden = show;
  };

  const refreshData = () => {
    document.getElementById('fundraise_currentFundingText').innerText = `$${alreadyFunded}`;
    document.getElementById('fundraise_remainingText').innerText = `${goalFundedPercent.toFixed(2)}%`;
    document.getElementById('invalidInput').hidden = true;
    document.getElementById('fundraise_goalText').innerText = `$${goal}`;
    setProgressBar();
    showControls();
  };

  const setProgressBar = () => {
    document.getElementById('fundraise_progressBar').style.width = `${goalFundedPercent}%`;
    document.getElementById('fundraise_progressBar').style.backgroundColor = alreadyFunded === goal ? '#1CBC2C' : '#EF5F3C';
  };

  const fund = () => {
    const amount = Number(document.getElementById('fundraise_amount').value);
    if (!amountIsValid(amount)) {
      document.getElementById('invalidInput').hidden = false;
      return;
    }
    setFundedAmount(amount);
    refreshData();
    showControls(false);
  };

  const setFundedAmount = (amount) => {
    alreadyFunded += amount;
    goalFundedPercent = (alreadyFunded / goal) * 100;
  };

  const amountIsValid = (value) => {
    return /^[1-9]\d*$/.test(value) && value <= (goal - alreadyFunded);
  };

  const closeNote = () => {
    init();
    document.getElementById('fundraise_amount').value = '';
  };

  return {
    fund: () => {
      return fund()
    },
    setDefaulGoal: (value) => {
      return setDefaulGoal(value)
    },
    setDefaulPercentage: (value) => {
      return setDefaultPercentage(value)
    },
    closeNote: () => {
      return closeNote()
    }
  }
});
