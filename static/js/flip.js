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
    if (Object.size(dictionary) == 1) {
        currentKey = choice; // only have one entry so it's not random
    } else {
        while (currentKey === choice) {
            choice = keys[Math.floor(keys.length * Math.random())];
        }
    }

    var entry = dictionary[choice];
    $(".front").text(choice);
    $(".back").text(entry["english"]);
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

