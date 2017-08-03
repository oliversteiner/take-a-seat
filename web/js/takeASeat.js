/**
 *  takeASeat
 *
 */
var TakeASeat = (function () {
    /**
     *
     *
     * @param options
     */
    function TakeASeat(options) {
        // Version
        this.version = '0.1';
        // Status
        // Status
        this.isMobile = true;
        // Options
        this.check_for_mobile = true;
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
    TakeASeat.prototype.start = function () {
        this.loadComponents();
        this.update();
        this.addEventListeners();
    };
    TakeASeat.prototype.update = function () {
    };
    /**
     *
     *
     */
    TakeASeat.prototype.loadComponents = function () {
        this.consoleController = new ConsoleController();
    };
    /**
     * addEventsListeners
     *
     */
    TakeASeat.prototype.addEventListeners = function () {
        //
        $('.navigation-button-next').click(takeASeat.goToNext);
    };
    /**
     * addKeystrokes
     */
    TakeASeat.prototype.addKeystrokes = function () {
        // Pfeil nach Links
        key('left', function () {
            takeASeat.goToPrevious();
        });
    };
    // Version
    TakeASeat.prototype.setVersion = function () {
        $('.version').text(this.version);
        return this.version;
    };
    // Modal
    TakeASeat.openModalCenter = function () {
        // Modal öffnen
        $('#modal-center').modal('show');
    };
    TakeASeat.closeModalCenter = function () {
        // Modal öffnen
        $('#modal-center').modal('hide');
    };
    TakeASeat.prototype.detectMobile = function () {
        if (this.check_for_mobile === true) {
            $(document).ready(function () {
                var isMobile = window.matchMedia("only screen and (max-width: 760px)");
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
                        var countdown = [3, 2, 1, 0];
                        var speed = 1000;
                        var timer = setInterval(lineAfterLine, speed);
                        var length = countdown.length;
                        var index = 0;
                        function lineAfterLine() {
                            var counter = countdown[index];
                            $('.go-remote-contdown-number').text(counter);
                            index++;
                            // remove timer after interating through all articles
                            if (index >= length) {
                                clearInterval(timer);
                                var pikto = '<span class="glyphicon glyphicon-sort "></span>';
                                $('.go-remote-contdown-number').html(pikto);
                                // Modal nach 4 sekunden beenden
                                $('#modal-center').modal('hide');
                            }
                        }
                    });
                } // isMobile
            }); // ready
            return true;
        }
        else {
            return false;
        }
    };
    return TakeASeat;
}()); // Class
