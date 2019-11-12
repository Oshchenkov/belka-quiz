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
  const $quizMainLiElement = $(".question-content-ul__li");
  const $nutActionBlockListUl = $("");
  const $nutActionBlockListLi = $(".question-content-ul__li-action-block").find(
    ".nut-rating__li"
  );
  const $nutActionBlockCheckbox = $(
    ".question-content-ul__li-action-block"
  ).find(".difficult-to-answer-label__checkbox");

  //
  // First Nut quiz validation
  //

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

  // nutActionBlockCheckbox
  $.each($nutActionBlockCheckbox, function(index, el) {
    $(el).click(function(e) {
      const currentMainLi = $(this).parents(".question-content-ul__li")[0];
      const currentNutList = $(currentMainLi).find(".nut-rating__li");

      if (this.checked) {
        removeValidationClass(currentMainLi);
        disableNutList(currentNutList);
      } else {
        checkNutRatingList(currentNutList);
      }
    });
  });

  // nutActionBlockList

  $.each($nutActionBlockListLi, function(index, el) {
    $(el).click(function(e) {
      const currentMainLi = $(this).parents(".question-content-ul__li")[0];
      const currentNutCheckbox = $(currentMainLi).find(
        ".difficult-to-answer-label__checkbox"
      );
      if ($($(currentMainLi).find(".nut-rating__li")[0]).hasClass("checked")) {
        disableCheckbox(currentNutCheckbox);
        removeValidationClass(currentMainLi);
      }
    });
  });

  function disableNutList(currentNutList) {
    $(currentNutList).removeClass("checked");
  }

  function disableCheckbox(currentCheckbox) {
    $(currentCheckbox).prop("checked", false);
  }

  function removeValidationClass(currentContainer) {
    $(currentContainer).removeClass("invalid");
  }

  function addInvalidClass(currentContainer) {
    $(currentContainer).addClass("invalid");
  }

  function checkNutRatingList(currentNutList) {
    const currentMainLi = $(currentNutList).parents(
      ".question-content-ul__li"
    )[0];
    if (!$(currentNutList).hasClass("checked")) {
      addInvalidClass(currentMainLi);
    }
  }

  //
  // Second TextArea quiz validation
  //

  textareaElement.addEventListener("input", e => {
    if (e.currentTarget.value.replace(/\s/g, "")) {
      validateTextareaQuiz();
    }
  });

  function validateTextareaQuiz() {
    let validateState = true;

    if (textareaElement.value.replace(/\s/g, "")) {
      $(textareaElement).removeClass("invalid");
      validateState = true;
    } else {
      $(textareaElement).addClass("invalid");
      validateState = false;
    }
    console.log("validateTextareaQuiz", validateState);
    return validateState;
  }

  //
  // Third Acorn range slider quiz validation
  //

  const $acornMainRowContainer = $(".quiz-sub-row");
  const $acornRangeSlider = $(".acorn-range-container__slider");
  const $acornCheckbox = $(
    ".quiz-sub-row .difficult-to-answer-label__checkbox"
  );

  function validateAcornRangeQuiz() {
    let validateState = true;

    $.each($acornMainRowContainer, function(index, currentRow) {
      const acornRangeSlider = $(currentRow).find(
        ".acorn-range-container__slider"
      )[0];
      const acornOtherVote = $(currentRow).find(
        ".difficult-to-answer-label__checkbox"
      )[0];

      if (
        !($(acornRangeSlider).slider("value") > 0) &&
        !acornOtherVote.checked
      ) {
        addInvalidClass(currentRow);
        validateState = false;
      } else {
        validateState = true;
        removeValidationClass(currentRow);
      }
    });

    console.log("validateAcornRangeQuiz", validateState);
    return validateState;
  }

  $.each($acornCheckbox, function(index, el) {
    $(el).click(function(e) {
      const currentContainer = $(this).parents(".quiz-sub-row")[0];
      const currentRangeSlider = $(currentContainer).find(
        ".acorn-range-container__slider"
      );

      if (this.checked) {
        removeValidationClass(currentContainer);
        setRangeSliderToInitialValue(currentRangeSlider);
      } else {
        checkNutRatingList(currentNutList);
      }
    });
  });

  function setRangeSliderToInitialValue(sliderRangeElement) {
    $(sliderRangeElement).slider("value", 0);
  }

  //
  // Submit and validate all Quiz
  //
  $submitBtn.click(function(event) {
    event.preventDefault();

    validateNutRatingQuiz();
    validateTextareaQuiz();
    validateAcornRangeQuiz();
    // $quizForm.slideUp();
    // $congratMessage.slideDown();
  });
});
