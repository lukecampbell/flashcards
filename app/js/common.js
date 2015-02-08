var dictionary = null; // The loaded dictionary
var currentKey = null; // Global to ensure we don't repeat cards

/* Initializes the dictionary for this view/controller
 * Note: should only be called once per page load
 */
function initDictionary(done) {
    var dictName = getDictName();
    getDictionary(dictName, function(dict) {
        dictionary = dict["contents"];
        updateTitle(dict["display"]);
        done();
    });
}

function updateTitle(newTitle) {
    $("title").text(newTitle);
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
