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
    return SeatSelectController;
}());
