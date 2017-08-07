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
            scope.showDetails(this);
        });
        $('table.preiskategorien tr').mouseover(this, function () {
            scope.abschnittHervorheben(this);
        });
    };
    SeatSelectController.prototype.showDetails = function (elem) {
        var $elem = $(elem);
        var $clone = $elem.clone(true);
        $('#modal-plan').modal('show');
        $('#modal-abschnitt-solo').show();
        $('#solo-dock').empty();
        $clone.appendTo('#solo-dock');
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
