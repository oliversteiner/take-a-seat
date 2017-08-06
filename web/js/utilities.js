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
