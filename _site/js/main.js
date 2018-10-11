function msToDays(value) {
  return Math.floor(value / (1000 * 3600 * 24));
}

function daysToMs(value) {
  return value * 1000 * 3600 * 24;
}

function msToHours(value) {
  return Math.floor(value / (1000 * 3600));
}

function hoursToMs(value) {
  return value * 1000 * 3600;
}

function msToMinutes(value) {
  return Math.floor(value / (1000 * 60));
}


function minutesToMs(value) {
  return value * 1000 * 60;
}

function msToSeconds(value) {
  return Math.floor(value / 1000);
}

function getDiffArray () {
  var targetDate = new Date(2018, 9, 30, 0, 0); // 30 October 12 AM
  var currentDate = new Date();

  var diff = targetDate - currentDate;

  var days = msToDays(diff);

  var daysMs = daysToMs(days);
  var hours = msToHours(diff - daysMs);

  var hoursMs = hoursToMs(hours);
  var minutes = msToMinutes(diff - daysMs - hoursMs);

  return [
    days,
    hours,
    minutes,
  ];
}

function decreaseCountdown($items) {
  var diff = getDiffArray();

  diff.forEach((item, index) => {
    $items.eq(index).text(item);
  });

  setTimeout(function() {
      decreaseCountdown($items);
  }, 1000);
}

$(document).ready(function() {
  var $headerTimers = $('.s-hero__form-timer-time-item'),
      $footerTimers = $('.s-form__form-timer-time-item');

  decreaseCountdown($headerTimers);
  decreaseCountdown($footerTimers);
});
