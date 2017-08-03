/**
 *  takeASeat
 *
 */


class TakeASeat {


    // Version
    public version: string = '0.1';

    // Status


    // Status
    public isMobile: boolean = true;

    // Options
    public check_for_mobile: boolean = true;

    // Controllers
    public consoleController: ConsoleController;


    // DB
    private db: any;


    /**
     *
     *
     * @param options
     */
    constructor(options?: {
        check_for_mobile?: boolean
    }) {

        // Optionen
        if (options.check_for_mobile === false) {
            this.check_for_mobile = false;
        }


        // DB
        this.db = new PouchDB('takeaseat');


        // Init
        this.setVersion();
        this.addKeystrokes();
        this.detectMobile();
    }

    start() {
        this.loadComponents();
        this.update();
        this.addEventListeners();
    }

    update() {

    }


    /**
     *
     *
     */
    loadComponents() {

        this.consoleController = new ConsoleController();

    }


    /**
     * addEventsListeners
     *
     */
    addEventListeners() {

        //
        $('.navigation-button-next').click(takeASeat.goToNext);

    }

    /**
     * addKeystrokes
     */
    addKeystrokes() {

        // Pfeil nach Links
        key('left', function () {
            takeASeat.goToPrevious();
        });


    }




// Version
    setVersion() {
        $('.version').text(this.version);
        return this.version;
    }

// Modal
    static openModalCenter() {

        // Modal öffnen
        $('#modal-center').modal('show');
    }

    static closeModalCenter() {

        // Modal öffnen
        $('#modal-center').modal('hide');

    }


    detectMobile() {
        if (this.check_for_mobile === true) {

            $(document).ready(function () {
                let isMobile = window.matchMedia("only screen and (max-width: 760px)");

                if (isMobile.matches) {
                    //Conditional script here
                    console.log('mobile detected');

                    // speichern
                    takeASeat.isMobile = true;

                    // Anzeige starten, ob zu Remote-Seite wechseln
                    takeASeat.openModalCenter();
                    $('#remote-modal-change-directly').show();
                    $('#modal-center').modal('show').on('shown.bs.modal', function () {


                        // Timer ablaufen lassen

                        let countdown = [3, 2, 1, 0];

                        const speed = 1000;
                        let timer = setInterval(lineAfterLine, speed);
                        let length = countdown.length;
                        let index = 0;

                        function lineAfterLine() {
                            let counter = countdown[index];

                            $('.go-remote-contdown-number').text(counter);

                            index++;

                            // remove timer after interating through all articles
                            if (index >= length) {
                                clearInterval(timer);
                                let pikto = '<span class="glyphicon glyphicon-sort "></span>';
                                $('.go-remote-contdown-number').html(pikto);

                                // Modal nach 4 sekunden beenden
                                $('#modal-center').modal('hide');

                            }
                        }

                    })

                }  // isMobile
            }); // ready

            return true;

        } else {

            return false;
        }
    }


} // Class



