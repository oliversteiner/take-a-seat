class SeatSelectController {

    public modus_maxiplan: boolean = false;
    public modus_miniplan: boolean = false;

    constructor() {
        console.log('seatSelectController');


    }

    start() {


        sitzeVierschieben('links');
        sitzeVierschieben('rechts');


        // Modus erkennen

        // init
        this.updateModus();
        this.addEventListeners();

        // after change


        let rtime: any;
        let timeout = false;
        let delta = 200;
        let scope = this;

        $(window).resize(function () {
            rtime = new Date();
            if (timeout === false) {
                timeout = true;
                setTimeout(resizeend, delta);
            }
        });

        function resizeend() {
            let next_date: any = new Date();

            if (next_date - rtime < delta) {
                setTimeout(resizeend, delta);
            } else {
                timeout = false;
                scope.updateModus();


            }
        }


    }


    updateModus = () => {

        const scope = this;

        if ($(window).width() > 500) {
            // Desktop Screen

            this.modus_maxiplan = false;
            this.modus_miniplan = false;

            $('#plan-well').removeClass('modus-maxiplan');
        }
        else {
            // do something for small screens

            this.modus_maxiplan = true;
            this.modus_miniplan = false;

            $('#plan-well').addClass('modus-maxiplan');
            $('.abschnitt').addClass('modus-maxiplan-abschnitt-target');
            $('.modus-maxiplan-abschnitt-target').click(function () {
                scope.showDetails(this);
            });

        }

        console.log('modus_maxiplan: ' + this.modus_maxiplan);
        console.log('modus_miniplan: ' + this.modus_miniplan);

    };

    /**
     *
     *
     *
     */
    addEventListeners = () => {

        // toggle
        let scope = this;


        $('.sitz').click(function () {
            scope.waehleSitz(this);
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

    /**
     *
     * @param elem
     */
    showDetails(elem: any) {


        let scope = this;

        // Anleitung ausblenden
        $('#sitzplan-content .block-anleitung').hide();

        // aufräumen
        $('.ausschnitt-aktuell').removeClass('ausschnitt-aktuell');


        const $well = $('#plan-well');
        const $abschnitt_container = $('#plan-ausschnitt-container');
        const $elem = $(elem);
        const modus_miniplan = 'modus-miniplan';

        // übersichts Modus?
        if (this.modus_miniplan) {


            $well.removeClass(modus_miniplan);
            $abschnitt_container.empty();


            this.modus_miniplan = false;


        }
        else {

            // Setze das System in den MIniplan:

            this.modus_miniplan = true;



            // Der Abschnitt darf


            $abschnitt_container.empty();

            $well.addClass(modus_miniplan);

            const $clone = $elem.clone(true);

            $clone.find('.sitz').addClass('modus_miniplan');

            // Den Click-Event entfernen
            $clone.first().off();
            $clone.removeClass('modus-maxiplan-abschnitt-target');


            $clone.appendTo($abschnitt_container);


            // Im Mini-plan den Ausschnit hervorheben
            console.log($elem);
            $(elem).addClass('ausschnitt-aktuell');

            $('.sitz').off();

            let scope = this;
            // neue click events:
            $('.sitz').click(function () {
                scope.waehleSitz(this);
            });

        }


    }

    /**
     *
     *
     * @param {any | HTMLElement} elem
     */
    waehleSitz = (elem: any | HTMLElement) => {

        console.log(elem);
        elem.classList.toggle('ausgewaehlt');

    };

    /**
     *
     *
     * @param elem
     */
    hoverInfo(elem: any) {


        // Die ID des Sitzelements
        const elem_id = elem.getAttribute('id');


        // Daten extrahieren:
        let abschnitt: string = elem.parentNode.parentNode.dataset.abschnitt;
        let seite: string = elem.parentNode.parentNode.dataset.seite;
        let reihe_nummer: string = elem.parentNode.dataset.reihe;
        let sitz_nummer: string = '99';
        let preis: string = elem.dataset.preis;


        if (elem_id) {
            sitz_nummer = elem_id.replace('sitz-', '');
        }


        // felder füllen:
        $('.container-hover-info-abschnitt').html(abschnitt);
        $('.container-hover-info-seite').html(seite);
        $('.container-hover-info-reihe-nummer').html(reihe_nummer);
        $('.container-hover-info-sitz-nummer').html(sitz_nummer);
        $('.container-hover-info-preis').html(preis);

        // nicht im uebersichts-modus

        if (this.modus_maxiplan) {

            // Abschnitt-Ansicht


            // als Hover anzeigen
            const abschnitt_hover_info = document.getElementById('abschnitt-hover-info');

            // die Position des sitz-elements speichern
            const offsets = elem.getBoundingClientRect();
            const top = offsets.top;
            const left = offsets.left;

            // den Hover an dieser Position anzeigen
            $(abschnitt_hover_info).show();
            $(abschnitt_hover_info).css('top', top,).css('left', left,);


            const $abschnitt = elem.parentElement;

            console.log($abschnitt);

        } else {

            // Einzel-Sitz-Ansicht

            // als Hover anzeigen
            const sitz_hover_info = document.getElementById('sitz-hover-info');

            // die Position des sitz-elements speichern
            const offsets = elem.getBoundingClientRect();
            const top = offsets.top;
            const left = offsets.left;

            // den Hover an dieser Position anzeigen
            $(sitz_hover_info).show();
            $(sitz_hover_info).css('top', top,).css('left', left,);

        }


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



