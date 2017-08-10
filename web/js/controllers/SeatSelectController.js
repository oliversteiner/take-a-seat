var SeatSelectController = (function () {
    function SeatSelectController() {
        console.log('seatSelectController');
    }
    SeatSelectController.prototype.start = function () {
        this.addEventListeners();
        sitzeVierschieben('links');
        sitzeVierschieben('rechts');
    };
    SeatSelectController.prototype.addEventListeners = function () {
        // toggle
        var scope = this;
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
    };
    SeatSelectController.prototype.showDetails = function (elem) {
        var $plan = $('#plan-content');
        var $abschnitt_container = $('#abschnitt-container');
        var $elem = $(elem);
        var class_uebersicht = 'uebersicht-modus';
        // übersichts Modus?
        if ($plan.hasClass(class_uebersicht)) {
            $plan.removeClass(class_uebersicht);
            $abschnitt_container.empty();
        }
        else {
            $abschnitt_container.empty();
            $plan.addClass(class_uebersicht);
            var $clone = $elem.clone(true);
            $clone.appendTo($abschnitt_container);
            $plan.addClass(class_uebersicht);
            console.log(elem);
        }
    };
    SeatSelectController.prototype.waehleSitz = function (elem) {
        console.log(elem);
        elem.classList.toggle('ausgewaehlt');
    };
    SeatSelectController.prototype.hoverInfo = function (elem) {
        var elem_hover_info = document.getElementById('sitz-hover-info');
        // Die ID des Sitzelements
        var elem_id = elem.getAttribute('id');
        // die Position des sitz-elements speichern
        var offsets = elem.getBoundingClientRect();
        var top = offsets.top;
        var left = offsets.left;
        // den Hover an dieser Position anzeigen
        $(elem_hover_info).show();
        $(elem_hover_info).css('top', top).css('left', left);
        // Daten extrahieren:
        var abschnitt = elem.parentNode.parentNode.dataset.abschnitt;
        var seite = elem.parentNode.parentNode.dataset.seite;
        var reihe_nummer = elem.parentNode.dataset.reihe;
        //  const sitz_nummer = elem_id.slice(3);
        var sitz_preis = elem.dataset.preis;
        // das HTML an den
        console.log(elem);
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
