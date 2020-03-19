$(init);

function init() {
  // get current day and display on top of page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
  // color our time blocks and update every minute in case the hour changes
  updateTimeBlocks();
  setInterval(updateTimeBlocks, 60000);
  // attach our handler for the save buttons
  $(".saveBtn").on("click", handleSave);
}

function updateTimeBlocks() {
  // for each time block
  $(".time-block").each(function() {
    var blockId = $(this).attr("id");
    var blockHour = parseInt(blockId.replace("hour-", ""));
    var currentHour = parseInt(moment().format("H"));
    // color block based on past, present, future class
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour > currentHour) {
      $(this).addClass("future");
    } else {
      $(this).addClass("present");
    }
  
    // load saved data from local storage
    $("#" + blockId + " > textarea").text(localStorage.getItem(moment().format("DDDYYYY") + blockId));
  });
}

function handleSave(event) {
  // get the id of our parent
  var hourId = $(this).parent().attr("id");
  // save data in textarea in local storage
  localStorage.setItem(moment().format("DDDYYYY") + hourId, $("#" + hourId + " > textarea").val());
}
