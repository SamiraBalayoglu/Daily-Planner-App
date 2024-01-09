$(document).ready(function () {
    function displayCurrentDay() {
      var currentDay = dayjs().format("dddd, MMMM D, YYYY");
      $("#currentDay").text(currentDay);
    }
  
    function generateTimeBlocks() {
      var businessHours = 9; // Assuming business hours start at 9 AM
      var totalHours = 9; // Assuming a 9-hour workday
  
      for (var i = 0; i < totalHours; i++) {
        var blockHour = businessHours + i;
        var timeBlock = $("<div>").addClass("time-block").attr("data-hour", blockHour);
  
        var row = $("<div>").addClass("row");
        var hourColumn = $("<div>").addClass("hour").text(formatHour(blockHour));
        var textArea = $("<textarea>").attr("placeholder", "Enter event here...");
        var saveBtn = $("<button>").addClass("saveBtn").html('<i class="fas fa-save"></i>');
  
        row.append(hourColumn, textArea, saveBtn);
        timeBlock.append(row);
        $(".container").append(timeBlock);
      }
    }
  
    function formatHour(hour) {
      return dayjs().hour(hour).format("h A");
    }
  
    function colorCodeTimeBlocks() {
      var currentHour = dayjs().hour();
  
      $(".time-block").each(function () {
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
  
    function loadEvents() {
      $(".time-block").each(function () {
        var blockHour = $(this).attr("data-hour");
        var savedEvent = localStorage.getItem(blockHour);
  
        if (savedEvent) {
          $(this).find("textarea").val(savedEvent);
        }
      });
    }
  
    $(".container").on("click", ".saveBtn", function () {
      var blockHour = $(this).closest(".time-block").attr("data-hour");
      var eventText = $(this).siblings("textarea").val();
  
      localStorage.setItem(blockHour, eventText);
    });
  
    function handleScroll() {
      var scrollPosition = $(window).scrollTop();
      var windowHeight = $(window).height();
  
      $(".time-block").each(function () {
        var blockPosition = $(this).offset().top;
  
        if (blockPosition < scrollPosition + windowHeight && blockPosition + $(this).height() > scrollPosition) {
          $(this).addClass("present-scroll");
        } else {
          $(this).removeClass("present-scroll");
        }
      });
    }
  
    displayCurrentDay();
    generateTimeBlocks();
    colorCodeTimeBlocks();
    loadEvents();
    $(window).on("scroll", handleScroll);
  });
  