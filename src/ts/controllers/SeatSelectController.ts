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
            scope.showDetails(this);
        });


        $('table.preiskategorien tr').mouseover(this, function () {

            scope.abschnittHervorheben(this);
        })
        ;

    }

    showDetails(elem: any) {

        const $elem = $(elem);
        const $clone = $elem.clone(true);

        $('#modal-plan').modal('show');
        $('#modal-abschnitt-solo').show();
        $('#solo-dock').empty();

        $clone.appendTo('#solo-dock');

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



