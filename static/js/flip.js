function initFlip() {
    $("#card").on("click", flipCard);
}

function initKeyHandlers() {
    $(document).keydown(function(e) {
      switch(e.which) {
        case 37: // Left
          break;
        case 38: // Up
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
        default: console.log(e.keyCode);
      }
    });
}

var dictionary = null; // The loaded dictionary
var currentKey = null; // Global to ensure we don't repeat cards

function initDictionary() {
    var dictName = getDictName();
    getDictionary(dictName, function(dict) {
        dictionary = dict["contents"];
        updateRandomCard();
    });
}

function updateRandomCard() {
    if (dictionary === null)  {
        return initDictionary();
    }
    var keys = Object.keys(dictionary);
    var choice = keys[Math.floor(keys.length * Math.random())];
    if (Object.size(dictionary) != 1) {
        while (currentKey === choice) {
            choice = keys[Math.floor(keys.length * Math.random())];
        }
    }
    currentKey = choice;

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


function getDictName() {
    var ref = window.location.toString();
    var name = ref.substring(ref.lastIndexOf('/')+1);
    return name;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function showSide() {
    if (dictionary === null) {
        initDictionary();
    }
    var kanji = dictionary[currentKey]["kanji"];
    $(".side-content").text(parseFuri(kanji));
}

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
        $(".top-part").append(key);
        $(".footer-content").append('<div class="bot-part"></div>')
        $(".bot-part").append(value);
    }
}

function parseFuri(inputString) {
    if(inputString.length <= 0) {
        return;
    }
    /*
     * First occurrence of the \f escape
     */
    var esc = inputString.indexOf("{");
    if(esc == -1) {
        return inputString;
    }
    // find the end of the }
    var endPart = inputString.indexOf("}", esc+1);
    if(endPart == -1) {
        return inputString;
    }

    /* right off the bat this part up until the \f
     * warrants a <ruby> */

    var retval = inputString.substring(0, esc);
    retval += "<ruby><rb>" + inputString.substring(esc+1, endPart) + "</rb>";

    /* Check if there's another {} */
    var secondEnd = inputString.indexOf("}", endPart+1);
    if((inputString[endPart+1] == '{') && (secondEnd != -1)) {
        retval += "<rt>" + inputString.substring(endPart+2, secondEnd) + "</rt>";
    }
    retval += "</ruby>";
    retval += parseFuri(inputString.substring(secondEnd+1));
    return retval;
}


