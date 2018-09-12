const getDays = (date) => {
  return Math.floor(date/(1000*60*60*24));
}

const getDiffArray = () => {
  var targetDate = new Date(Date.UTC(2018, 8, 29, 00, 00)), // 29 September 12 AM
      currentDate = new Date(),
      diff = new Date(targetDate - currentDate);

  return [
      Math.floor(getDays(diff)) * 24 + new Date(diff).getHours(),
      new Date(diff).getMinutes(),
      new Date(diff).getSeconds()
  ];
}

const decreaseCountdown = ($items) => {
  const diff = getDiffArray();

  if (!diff) { return false; }

  diff.forEach((item, index) => {
    $items.eq(index).text(item);
  })
  
  setTimeout(() => {
      decreaseCountdown($items);
  }, 1000);
}

$(document).ready(function() {
  var $headerTimers = $('.s-hero__form-timer-time-item'),
      $footerTimers = $('.s-form__form-timer-time-item');

  decreaseCountdown($headerTimers);
  decreaseCountdown($footerTimers);



})