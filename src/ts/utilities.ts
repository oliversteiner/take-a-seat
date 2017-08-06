
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