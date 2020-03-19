$(init);

function init() {
  // get current day and display on top of page
  var now = moment();
  $("#currentDay").text(now.format("dddd, MMMM Do"))

  // get current hour
  var currentHour = now.format("H");
  // paint our hour divs by adding appropriate class
  for (var i = 9; i <= 17; i++) {
    if (i < currentHour) {
      // past
      $("#hour-" + i).addClass("past");
    } else if (i > currentHour) {
      // future
      $("#hour-" + i).addClass("future");
    } else {
      // present
      $("#hour-" + i).addClass("present");
    }
    // load saved data from local storage
    $("#hour-" + i + " > textarea").text(localStorage.getItem("hour-" + i));
  }

  $(".saveBtn").on("click", handleSave);
}

function handleSave(event) {
  // get the id of our parent
  var hourId = $(this).parent().attr("id");
  // save data in textarea in local storage
  localStorage.setItem(hourId, $("#" + hourId + " > textarea").val())
}