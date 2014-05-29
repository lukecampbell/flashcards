function initCatalog() {
    $("#navsel a").text("Catalog");
    initDictionary(renderCatalog);
    initNavbar();
}

function renderCatalog() {
    $(".container").html('<table class="table table-striped catalog"></table>');
    for(var key in dictionary) {
        var yomi = parseFuri(dictionary[key]["yomi"]);
        var answer = dictionary[key]["english"];
        var examples = dictionary[key]["examples"];
        var example = null;
        if(examples.length > 0) {
            example = examples[0];
        }
        var row = definitionRow(key, yomi, answer, examples);
        $(".catalog").append(row);
        
    }
}


function definitionRow(key, yomi, answer, examples) {
    var retval = "<tr>";
    retval += '<td>';
    retval +=   '<div class="key">';
    retval +=     key;
    retval +=   '</div>';
    retval += '</td>';
    retval += '<td>';
    retval +=   '<div class="yomi">';
    retval +=     yomi;
    retval +=   '</div>';
    retval += '</td>';
    retval += '<td>';
    retval +=   '<div class="answer">';
    retval +=     answer;
    retval +=   '</div>';
    retval += '</td>';
    retval += '<td>';
    retval +=   '<div class="example">';
    if(examples.length == 0) {
        retval += "-";
    } else {
        for(var i in examples) {
            var sentence = parseFuri(examples[i][0]);
            var translation = examples[i][1];
            if(i>0) {
                retval += '<br>';
            }
            retval += '<div class="sentence">';
            retval += sentence;
            retval += '</div>';
            retval += '<br>';
            retval += '<div class="translation">';
            retval += translation;
            retval += '</div>';
        }
    }
    retval += '</td>';
    retval += '</tr>';

    return retval;
}


