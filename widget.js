class Fundraiser {
  goal = 1000;
  alreadyFunded = 0;
  goalFundedPercent = 0;

  init() {
    this.showControls(true);
    this.refreshData();
  }

  showControls(show = true) {
    document.getElementById('fundraise_amount').hidden = !show;
    document.getElementById('fundraise_pledgeButton').hidden = !show;
    document.getElementById('thanksNote').hidden = show;
  }

  refreshData() {
    document.getElementById('fundraise_currentFundingText').innerText = `$${this.alreadyFunded}`;
    document.getElementById('fundraise_remainingText').innerText = `${this.goalFundedPercent.toFixed(2)}%`;
    document.getElementById('fundraise_progressBar').style.width = `${this.goalFundedPercent}%`;
    document.getElementById('fundraise_progressBar').style.backgroundColor = this.alreadyFunded === this.goal ? '#1CBC2C' : '#EF5F3C';
    document.getElementById('invalidInput').hidden = true;
  }

  fund() {
    const amount = Number(document.getElementById('fundraise_amount').value);
    if (!this.amountIsValid(amount)) {
      document.getElementById('invalidInput').hidden = false;
      return;
    }
    this.setFundedAmount(amount);
    this.refreshData();
    this.showControls(false);
  }

  setFundedAmount(amount) {
    this.alreadyFunded += amount;
    this.goalFundedPercent = (this.alreadyFunded / this.goal) * 100;
  }

  amountIsValid(value) {
    return /^[1-9]\d*$/.test(value) && value <= (this.goal - this.alreadyFunded);
  }

  closeNote() {
    this.init();
    document.getElementById('fundraise_amount').value = '';
  }

}

var instance = new Fundraiser();

window.onload = function () {
  instance.init();
};

function fund() {
  instance.fund();
}

function closeNote() {
  instance.closeNote();
}
