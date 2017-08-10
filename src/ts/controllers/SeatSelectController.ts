class SeatSelectController {


    constructor() {
        console.log('seatSelectController');


    }

    start() {
        this.addEventListeners();


        sitzeVierschieben('links');
        sitzeVierschieben('rechts');


    }


    addEventListeners() {

        // toggle
        let scope = this;


        $('.abschnitt').click(function () {

            if ($(window).width() < 500) {
                // do something for small screens
                scope.showDetails(this);
            }
        });


        $('.sitz').click(function () {


            if ($(window).width() > 500) {
                // do something for small screens

                scope.waehleSitz(this);

            }
            else {

                scope.showDetails(this);

            }

            // Wenn nur Abschnitt zu sehen ist

        });


        $('table.preiskategorien tr').mouseover(this, function () {

            scope.abschnittHervorheben(this);
        });


        $('.reihe div.sitz').mouseover(this, function () {

            scope.hoverInfo(this);
        });

        $('#plan-content').mouseleave(function () {
            $('#sitz-hover-info').hide();
        });


    }

    showDetails(elem: any) {

        const $plan = $('#plan-content');
        const $abschnitt_container = $('#abschnitt-container');
        const $elem = $(elem);
        const class_uebersicht = 'uebersicht-modus';

        // übersichts Modus?
        if( $plan.hasClass(class_uebersicht)){

            $plan.removeClass(class_uebersicht);
            $abschnitt_container.empty();

        }
        else{
            $abschnitt_container.empty();

            $plan.addClass(class_uebersicht);

            const $clone = $elem.clone(true);

            $clone.appendTo($abschnitt_container);

            $plan.addClass(class_uebersicht);

            console.log(elem);


        }




    }

    waehleSitz(elem: any | HTMLElement) {

        console.log(elem);
        elem.classList.toggle('ausgewaehlt');

    }

    hoverInfo(elem: any) {


        const elem_hover_info = document.getElementById('sitz-hover-info');

        // Die ID des Sitzelements
        const elem_id = elem.getAttribute('id');

        // die Position des sitz-elements speichern
        const offsets = elem.getBoundingClientRect();
        const top = offsets.top;
        const left = offsets.left;

        // den Hover an dieser Position anzeigen
        $(elem_hover_info).show();
        $(elem_hover_info).css('top', top,).css('left', left,);


        // Daten extrahieren:
        const abschnitt = elem.parentNode.parentNode.dataset.abschnitt;
        const seite = elem.parentNode.parentNode.dataset.seite;
        const reihe_nummer = elem.parentNode.dataset.reihe;
        //  const sitz_nummer = elem_id.slice(3);
        const sitz_preis = elem.dataset.preis;


        // das HTML an den
        console.log(elem);


    }


    abschnittHervorheben(elem: any) {

        // Aus Performancegründen kein JQuery nehmen !

        // Suche alle sizte.hervorbehoben und neutralisiere sie
        let nodeList_old = document.body.querySelectorAll('.hervorheben');

        for (let i = 0; i < nodeList_old.length; i++) {
            nodeList_old[i].classList.remove('hervorheben');
        }


        const abschnitt = $(elem).data('kat-abschnitt');
        const preis = $(elem).data('kat-preis');

        let searchstring_bereich = '.' + abschnitt;
        let searchstring_preis = '.p-' + preis;

        let searchstring = searchstring_bereich + '  ' + searchstring_preis;

        let nodelist = document.body.querySelectorAll(searchstring);

        for (let i = 0; i < nodelist.length; i++) {

            nodelist[i].classList.add('hervorheben');
        }

    }

}



