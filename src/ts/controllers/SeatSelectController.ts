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

    }

    showDetails(elem: any) {

        const $elem = $(elem);
        const $clone = $elem.clone( true );

        $('#modal-plan').modal('show');
        $('#modal-abschnitt-solo').show();
        $('#solo-dock').empty();

        $clone.appendTo('#solo-dock');

        console.log(elem);


    }
}



