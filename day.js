$(document).ready(function() {
    // Function to display current day in the header
    function displayCurrentDay() {
      var currentDay = dayjs().format("dddd, MMMM D, YYYY");
      $("#currentDay").text(currentDay);
    }
  
    // Function to color-code time blocks based on past, present, and future
    function colorCodeTimeBlocks() {
      var currentHour = dayjs().hour();
  
      $(".time-block").each(function() {
        var blockHour = parseInt($(this).attr("data-hour"));
  
        if (blockHour < currentHour) {
          $(this).addClass("past");
        } else if (blockHour === currentHour) {
          $(this).removeClass("past");
          $(this).addClass("present");
        } else {
          $(this).removeClass("past present");
          $(this).addClass("future");
        }
      });
    }
  
    // Function to load events from local storage
    function loadEvents() {
      $(".time-block").each(function() {
        var blockHour = $(this).attr("data-hour");
        var savedEvent = localStorage.getItem(blockHour);
  
        if (savedEvent) {
          $(this).find("textarea").val(savedEvent);
        }
      });
    }
  
    // Function to save events to local storage
    $(".saveBtn").on("click", function() {
      var blockHour = $(this).parent().attr("data-hour");
      var eventText = $(this).siblings("textarea").val();
  
      localStorage.setItem(blockHour, eventText);
    });
  
    // Initialize the app
    displayCurrentDay();
    colorCodeTimeBlocks();
    loadEvents();
  });
  