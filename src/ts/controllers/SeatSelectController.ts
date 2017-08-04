class SeatSelectController {


    constructor() {
        console.log('seatSelectController');


    }

    start() {
        this.addEventListeners();

        }


    addEventListeners() {

        // toggle
        let scope = this;
        $('.abschnitt').click(function () {
            scope.showDetails(this);
        });

    }

    showDetails(elem: any) {

        const $elem = $(elem);
        const $clone = $elem.clone( true );

        $('#modal-center').modal('show');
        $('#modal-abschnitt-solo').show();
        $('#solo-dock').empty();

        $clone.appendTo('#solo-dock');

        console.log(elem);






    }
}



