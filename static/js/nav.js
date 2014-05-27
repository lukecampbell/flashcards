/*
 * nav.js
 *
 * Functions for managing the content navigation
 */

function initNavbar() {
    $.get("/dict/list", function(listing) {
        $('#dictlist').empty()
        for(var i in listing) {
            var row = listing[i];
            var dictName = row[0];
            var displayName = row[1];
            $('#dictlist').append('<li><a href="/dict/random/' + dictName + '">' + displayName + '</a></li>');
        }
    });
}

