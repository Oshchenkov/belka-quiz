$(document).ready(function() {
  //
  //       nut-rating
  //

  const $nutRatingElement = $(".nut-rating .nut-rating__li");

  /* 1. Visualizing element on Hover - See next part for action on click */
  $nutRatingElement
    .on("mouseover", function() {
      var onStar = parseInt($(this).data("value"), 10); // The star currently mouse on

      // Now highlight all the li element that's not after the current hovered element
      $(this)
        .parent()
        .children("li")
        .each(function(e) {
          if (e < onStar) {
            $(this).addClass("hover");
          } else {
            $(this).removeClass("hover");
          }
        });
    })
    .on("mouseout", function() {
      $(this)
        .parent()
        .children("li")
        .each(function(e) {
          $(this).removeClass("hover");
        });
    });

  /* 2. Action to perform on click */
  $nutRatingElement.on("click", function() {
    const onNutElement = parseInt($(this).data("value"), 10); // The element currently checked
    const thisNutElement = $(this)
      .parent()
      .children("li");

    for (let i = 0; i < thisNutElement.length; i++) {
      $(thisNutElement[i]).removeClass("checked");
    }

    for (let i = 0; i < onNutElement; i++) {
      $(thisNutElement[i]).addClass("checked");
    }
  });

  //
  //            acorn-range-slider
  //

  // add value for acorn acorn-range-slider

  const [
    $rangeSlider1,
    $rangeSlider2,
    $rangeSlider3,
    $rangeSlider4,
    $rangeSlider5,
    $rangeSlider6,
    $rangeSlider7,
    $rangeSlider8
  ] = [
    $("#quiz-sub-range-3-1"),
    $("#quiz-sub-range-3-2"),
    $("#quiz-sub-range-3-3"),
    $("#quiz-sub-range-3-4"),
    $("#quiz-sub-range-3-5"),
    $("#quiz-sub-range-3-6"),
    $("#quiz-sub-range-3-7"),
    $("#quiz-sub-range-3-8")
  ];

  const rangeSliderInitSettings = {
    orientation: "horizontal",
    range: "min",
    max: 5,
    value: 0,
    slide: setAcornRange,
    change: setAcornRange
  };

  // initialize acorn-range-slider

  $rangeSlider1.slider(rangeSliderInitSettings);
  $rangeSlider2.slider(rangeSliderInitSettings);
  $rangeSlider3.slider(rangeSliderInitSettings);
  $rangeSlider4.slider(rangeSliderInitSettings);
  $rangeSlider5.slider(rangeSliderInitSettings);
  $rangeSlider6.slider(rangeSliderInitSettings);
  $rangeSlider7.slider(rangeSliderInitSettings);
  $rangeSlider8.slider(rangeSliderInitSettings);

  // change acorn-range value
  function setAcornRange(event, ui) {
    ui.handle.querySelector(".acorn-range-container__slider-value").innerHTML =
      ui.value;
  }

  // add element for acorn current value selector
  $(".acorn-range-container__slider")
    .children(".ui-slider-handle")
    .append("<b class='acorn-range-container__slider-value'>0</b>");

  // initial value vor acorn-range-slider
  $rangeSlider1.slider("value", 0);
  $rangeSlider2.slider("value", 3);
  $rangeSlider3.slider("value", 2);
  $rangeSlider4.slider("value", 4);
  $rangeSlider5.slider("value", 5);
  $rangeSlider6.slider("value", 2);
  $rangeSlider7.slider("value", 1);
  $rangeSlider8.slider("value", 4);

  //
  //            Validation
  //

  const $quizForm = $(".belka-quiz-container");
  const $congratMessage = $(".footer-congratulation");
  const $submitBtn = $("#quiz-submit-btn");
  const textareaElement = document.querySelector(
    ".quiz-question-textarea__element"
  );
  const $quizContainerRow = $(".quiz-question-row-1");
  const $quizMainLiElement = $(".question-content-ul__li");

  $submitBtn.click(function(event) {
    event.preventDefault();

    validateNutRatingQuiz();
    validateTextareaQuiz();
    // $quizForm.slideUp();
    // $congratMessage.slideDown();
  });

  const $nutActionBlockListLi = $(".question-content-ul__li-action-block").find(
    ".nut-rating__li"
  );
  const $nutActionBlockCheckbox = $(
    ".question-content-ul__li-action-block"
  ).find(".difficult-to-answer-label__checkbox");

  // First Nut quiz validation
  $.each($nutActionBlockCheckbox, function(index, el) {
    $(el).click(function(e) {
      const currentMainLi = $(this).parents(".question-content-ul__li")[0];
      const currentNutList = $(currentMainLi).find(".nut-rating__li");

      console.log("TCL: currentMainLi", currentMainLi);
      console.log("TCL: currentNutList", currentNutList);

      if (this.checked) {
        removeNutValidationClass(currentMainLi);
        disableNutList(currentNutList);
      } else {
        checkNutRatingList(currentNutList);
      }
    });
  });

  function disableNutList(el) {
    console.log("disableNutList");
  }

  function removeNutValidationClass(currentMainLi) {
    $(currentMainLi).removeClass("invalid");
  }
  function checkNutRatingList(checkboxElement) {
    console.log(checkboxElement.checked);
  }

  function validateNutRatingQuiz() {
    let validateState = true;

    $.each($quizMainLiElement, function(index, liElement) {
      const nutRating = $(liElement).find(".nut-rating>li")[0];
      const otherVote = $(liElement).find(
        ".difficult-to-answer-label__checkbox"
      )[0];

      if (!$(nutRating).hasClass("checked") && !otherVote.checked) {
        $(liElement).addClass("invalid");
        validateState = false;
      } else {
        $(liElement).removeClass("invalid");
        validateState = true;
      }
    });

    console.log("validateNutRatingQuiz", validateState);
    return validateState;
  }

  // Second TextArea quiz validation
  textareaElement.addEventListener("change", e => {
    validateTextareaQuiz();
  });

  function validateTextareaQuiz() {
    let validateState = true;

    if (textareaElement.value) {
      $(textareaElement).removeClass("invalid");
      validateState = true;
    } else {
      $(textareaElement).addClass("invalid");
      validateState = false;
    }
    console.log("validateTextareaQuiz", validateState);
    return validateState;
  }
});
