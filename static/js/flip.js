/*
 * flip.js
 *
 * Content control and view-controller for the random dictionary portion of flashcards
 */

/* Adds the click event handler for clicking in the card's context/frame */
function initFlip() {
    $("#card").on("click", flipCard);
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
          flipCard();
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

var dictionary = null; // The loaded dictionary
var currentKey = null; // Global to ensure we don't repeat cards

/* Initializes the dictionary for this view/controller
 * Note: should only be called once per page load
 */
function initDictionary() {
    var dictName = getDictName();
    getDictionary(dictName, function(dict) {
        dictionary = dict["contents"];
        updateTitle(dict["display"]);
        updateRandomCard();
    });
}

function updateTitle(newTitle) {
    $("title").text(newTitle);
}

/* Picks a <different> random entry from the dictionary to display */
function updateRandomCard() {
    
    if (dictionary === null)  {
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

function getDictionary(dictName,success,failure) {
    var getHandler = $.get("/dict/json/" + dictName + ".json", success);
    if (typeof failure === "undefined") {
        getHandler.fail(failure);
    }
}


/* Determines the dictionary name using the URL string */
function getDictName() {
    var ref = window.location.toString();
    var name = ref.substring(ref.lastIndexOf('/')+1);
    return name;
}

/* From stack overflow, length of associative array */
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

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

/*
 * Parses furigana escapes in dictionary entries.
 * Surrounding string entries in {bottom}{furigana} causes appropriate HTML
 * ruby tags to be generated for the entry.
 */
function parseFuri(inputString) {
    if(inputString.length <= 0) {
        return "";
    }
    /*
     * First occurrence of the { escape
     */
    var esc = inputString.indexOf("{");
    if(esc == -1) {
        return inputString;
    }
    /*
     * Get the end of the escaped section
     */
    var endPart = inputString.indexOf("}", esc+1);
    if(endPart == -1) {
        return inputString;
    }

    /*
     * Surround what we have so far in a ruby tag
     */
    var retval = inputString.substring(0, esc);
    retval += "<ruby><rb>" + inputString.substring(esc+1, endPart) + "</rb>";

    /* Check if there's another {} */
    var secondEnd = inputString.indexOf("}", endPart+1);
    if((inputString[endPart+1] == '{') && (secondEnd != -1)) {
        retval += "<rt>" + inputString.substring(endPart+2, secondEnd) + "</rt>";
    }
    retval += "</ruby>";
    /* Recursion makes my life so much easier here */
    retval += parseFuri(inputString.substring(secondEnd+1));
    return retval;
}


