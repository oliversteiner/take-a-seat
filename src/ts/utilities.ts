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
        let $bar = $(this);
        let progress = setInterval(function () {

            let currWidth = parseInt($bar.attr('aria-valuenow'));
            let maxWidth = parseInt($bar.attr('aria-valuemax'));
            let maxtimer = maxWidth + 25;
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


function prozent_runden(quelle: number) {
    let wert = Math.round(quelle * 10);
    let wert2 = wert / 10;
    let wert3 = wert2 - Math.round(wert2);
    if (wert3 == 0) {
        return wert2 + "." + wert3;
    } else {
        return wert2;
    }
}


function sitzeVierschieben(position:string){

    let richtung = '-';
    if(position == 'links'){
        richtung = '+';
    }


    // Links verschieben
    let abschnitt = '.'+position+'.abgewinkelt div.reihe';

    let elem_array = $(abschnitt);


    // reihe
    $.each(elem_array, function (index, value) {

        let position: number = 0;


        //  jeden sitz
        let alle_sitze = $(value).children();

        $.each(alle_sitze, function (index, value) {

            let new_position: string = richtung + position + 'px';

            $(value).css('top', new_position);

            // nächste spalte um X pixel nach unten verschieben
            position = position +8;

        });

    });
}