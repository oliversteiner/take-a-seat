function _reset() {
    console.log('***** reset');
    // Datenbank leeren
    //   pouchDBService.eraseDB();
    // Datenbank neu einlesen
    PouchDBService.loadDefault();
    // Zeige die Prozess-bar
    $('#init-DB-message-wrapper').hide();
    $('#init-DB-progress-wrapper').show();
    // Animiere die Prozessbar
    $('.progress-bar').each(function () {
        var $bar = $(this);
        var progress = setInterval(function () {
            var currWidth = parseInt($bar.attr('aria-valuenow'));
            var maxWidth = parseInt($bar.attr('aria-valuemax'));
            var maxtimer = maxWidth + 25;
            //update the progress
            $bar.width(currWidth + '%');
            $bar.attr('aria-valuenow', currWidth + 5);
            //clear timer when max is reach
            if (currWidth >= maxtimer) {
                clearInterval(progress);
                // Seite neu initialisieren
                takeASeat.closeModalCenter();
                // alert('Einträge erstellt. Bitte Seite neu laden');
                window.location.replace(window.location.pathname);
            }
        }, 100);
    });
    return false;
}
// prozent_runden(100 * (b - a) / b);
function prozent_runden(quelle) {
    var wert = Math.round(quelle * 10);
    var wert2 = wert / 10;
    var wert3 = wert2 - Math.round(wert2);
    if (wert3 == 0) {
        return wert2 + "." + wert3;
    }
    else {
        return wert2;
    }
}
function sitzeVierschieben(position) {
    var richtung = '-';
    if (position == 'links') {
        richtung = '+';
    }
    // Links verschieben
    var abschnitt = '.' + position + '.abgewinkelt div.reihe';
    var elem_array = $(abschnitt);
    // reihe
    $.each(elem_array, function (index, value) {
        var position = 0;
        //  jeden sitz
        var alle_sitze = $(value).children();
        $.each(alle_sitze, function (index, value) {
            var new_position = richtung + position + 'px';
            $(value).css('top', new_position);
            // nächste spalte um X pixel nach unten verschieben
            position = position + 8;
        });
    });
}
