var SeatSelectController = (function () {
    function SeatSelectController() {
        var _this = this;
        this.modus_maxiplan = false;
        this.modus_miniplan = false;
        this.updateModus = function () {
            var scope = _this;
            if ($(window).width() > 500) {
                // Desktop Screen
                _this.modus_maxiplan = false;
                _this.modus_miniplan = false;
                $('#plan-well').removeClass('modus-maxiplan');
            }
            else {
                // do something for small screens
                _this.modus_maxiplan = true;
                _this.modus_miniplan = false;
                $('#plan-well').addClass('modus-maxiplan');
                $('.abschnitt').addClass('modus-maxiplan-abschnitt-target');
                $('.modus-maxiplan-abschnitt-target').click(function () {
                    scope.showDetails(this);
                });
            }
            console.log('modus_maxiplan: ' + _this.modus_maxiplan);
            console.log('modus_miniplan: ' + _this.modus_miniplan);
        };
        /**
         *
         *
         *
         */
        this.addEventListeners = function () {
            // toggle
            var scope = _this;
            $('.sitz').click(function () {
                scope.waehleSitz(this);
            });
            $('table.preiskategorien tr').mouseover(_this, function () {
                scope.abschnittHervorheben(this);
            });
            $('.reihe div.sitz').mouseover(_this, function () {
                scope.hoverInfo(this);
            });
            $('#plan-content').mouseleave(function () {
                $('#sitz-hover-info').hide();
            });
        };
        /**
         *
         *
         * @param {any | HTMLElement} elem
         */
        this.waehleSitz = function (elem) {
            console.log(elem);
            elem.classList.toggle('ausgewaehlt');
        };
        console.log('seatSelectController');
    }
    SeatSelectController.prototype.start = function () {
        sitzeVierschieben('links');
        sitzeVierschieben('rechts');
        // Modus erkennen
        // init
        this.updateModus();
        this.addEventListeners();
        // after change
        var rtime;
        var timeout = false;
        var delta = 200;
        var scope = this;
        $(window).resize(function () {
            rtime = new Date();
            if (timeout === false) {
                timeout = true;
                setTimeout(resizeend, delta);
            }
        });
        function resizeend() {
            var next_date = new Date();
            if (next_date - rtime < delta) {
                setTimeout(resizeend, delta);
            }
            else {
                timeout = false;
                scope.updateModus();
            }
        }
    };
    /**
     *
     * @param elem
     */
    SeatSelectController.prototype.showDetails = function (elem) {
        var scope = this;
        // Anleitung ausblenden
        $('#sitzplan-content .block-anleitung').hide();
        // aufräumen
        $('.ausschnitt-aktuell').removeClass('ausschnitt-aktuell');
        var $well = $('#plan-well');
        var $abschnitt_container = $('#plan-ausschnitt-container');
        var $elem = $(elem);
        var modus_miniplan = 'modus-miniplan';
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
            var $clone = $elem.clone(true);
            $clone.find('.sitz').addClass('modus_miniplan');
            // Den Click-Event entfernen
            $clone.first().off();
            $clone.removeClass('modus-maxiplan-abschnitt-target');
            $clone.appendTo($abschnitt_container);
            // Im Mini-plan den Ausschnit hervorheben
            console.log($elem);
            $(elem).addClass('ausschnitt-aktuell');
            $('.sitz').off();
            var scope_1 = this;
            // neue click events:
            $('.sitz').click(function () {
                scope_1.waehleSitz(this);
            });
        }
    };
    /**
     *
     *
     * @param elem
     */
    SeatSelectController.prototype.hoverInfo = function (elem) {
        // Die ID des Sitzelements
        var elem_id = elem.getAttribute('id');
        // Daten extrahieren:
        var abschnitt = elem.parentNode.parentNode.dataset.abschnitt;
        var seite = elem.parentNode.parentNode.dataset.seite;
        var reihe_nummer = elem.parentNode.dataset.reihe;
        var sitz_nummer = '99';
        var preis = elem.dataset.preis;
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
            var abschnitt_hover_info = document.getElementById('abschnitt-hover-info');
            // die Position des sitz-elements speichern
            var offsets = elem.getBoundingClientRect();
            var top_1 = offsets.top;
            var left = offsets.left;
            // den Hover an dieser Position anzeigen
            $(abschnitt_hover_info).show();
            $(abschnitt_hover_info).css('top', top_1).css('left', left);
            var $abschnitt = elem.parentElement;
            console.log($abschnitt);
        }
        else {
            // Einzel-Sitz-Ansicht
            // als Hover anzeigen
            var sitz_hover_info = document.getElementById('sitz-hover-info');
            // die Position des sitz-elements speichern
            var offsets = elem.getBoundingClientRect();
            var top_2 = offsets.top;
            var left = offsets.left;
            // den Hover an dieser Position anzeigen
            $(sitz_hover_info).show();
            $(sitz_hover_info).css('top', top_2).css('left', left);
        }
    };
    SeatSelectController.prototype.abschnittHervorheben = function (elem) {
        // Aus Performancegründen kein JQuery nehmen !
        // Suche alle sizte.hervorbehoben und neutralisiere sie
        var nodeList_old = document.body.querySelectorAll('.hervorheben');
        for (var i = 0; i < nodeList_old.length; i++) {
            nodeList_old[i].classList.remove('hervorheben');
        }
        var abschnitt = $(elem).data('kat-abschnitt');
        var preis = $(elem).data('kat-preis');
        var searchstring_bereich = '.' + abschnitt;
        var searchstring_preis = '.p-' + preis;
        var searchstring = searchstring_bereich + '  ' + searchstring_preis;
        var nodelist = document.body.querySelectorAll(searchstring);
        for (var i = 0; i < nodelist.length; i++) {
            nodelist[i].classList.add('hervorheben');
        }
    };
    return SeatSelectController;
}());
