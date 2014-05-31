/*
 * flip.js
 *
 * Content control and view-controller for the random dictionary portion of flashcards
 */

/* Adds the click event handler for clicking in the card's context/frame */
function initFlip() {
    $("#card").on("click", function() {
          flipCard();
          showExamples();
          showSide();
    });
    initDictionary(updateRandomCard);
    initKeyHandlers();
    initNavbar();
    $('.glyphicon-arrow-right').on("click", function() {
        updateRandomCard();
    });

    $("#navsel a.dropdown-toggle").text("Flashcard Mode");
    $("#modelist-current a").text("Flashcard Mode");
    $("#modelist-alt0 a").text("Catalog Mode");
    var dictName = getDictName();
    $("#modelist-alt0 a").attr("href", "/dict/catalog/" + dictName);

}

/* Initializes keyboard handlers for this view
 *
 * Up: resets the side-bar and bottom content
 * Right: new card
 * Down: Shows bottom and side-bar content
 * Enter: Flips the card
 * Space: Flips the card and shows bottom content
 */
function initKeyHandlers() {
    $(document).keydown(function(e) {
      switch(e.which) {
        case 37: // Left
          break;
        case 38: // Up
          $(".footer-content").empty();
          $(".side-content").empty();
          break;
        case 39: // Right
          updateRandomCard();
          break;
        case 40: // Down
          showExamples();
          showSide();
          break;
        case 13: // Enter
          updateRandomCard();
          break;
        case 32: // Space
          flipCard();
          showExamples();
          showSide();
          break;
        default: console.log(e.keyCode);
      }
    });
}

/* Picks a <different> random entry from the dictionary to display */
function updateRandomCard() {
    
    if (dictionary === null)  {
        console.log("大変");
        return initDictionary();
    }
    // Pick a random entry
    var keys = Object.keys(dictionary);
    var choice = keys[Math.floor(keys.length * Math.random())];
    if (Object.size(dictionary) != 1) {
        while (currentKey === choice) {
            choice = keys[Math.floor(keys.length * Math.random())];
        }
    }
    currentKey = choice;

    // Update the content
    var entry = dictionary[choice];
    $(".front").text(choice);
    $(".back").text(entry["english"]);
    $(".footer-content").empty();
    $(".side-content").empty();
}



function flipCard() {
    $("#card").toggleClass("flipped");
}



/* Displays the side content
 * Note: comes from the "yomi" in the dictionary
 */
function showSide() {
    if (dictionary === null) {
        initDictionary();
    }
    $(".side-content").empty();
    var yomi = dictionary[currentKey]["yomi"];
    $(".side-content").append(parseFuri(yomi));
}

/*
 * Shows the bottom content, which comes from the "examples"
 */
function showExamples() {
    if (dictionary === null) {
        initDictionary();
    }
    $(".footer-content").empty();
    var examples = dictionary[currentKey]["examples"];
    for(var i in examples) {
        var key = parseFuri(examples[i][0]);
        var value = examples[i][1];
        $(".footer-content").append('<div class="top-part"></div>')
        $($(".top-part")[i]).append(key);
        $(".footer-content").append('<div class="bot-part"></div>')
        $($(".bot-part")[i]).append(value);
    }
}

