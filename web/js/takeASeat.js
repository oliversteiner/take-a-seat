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
    /**
     *  update
     *
     */
    TakeASeat.prototype.update = function () {
    };
    /**
     * loadComponents
     *
     */
    TakeASeat.prototype.loadComponents = function () {
    };
    /**
     * addEventsListeners
     *
     */
    TakeASeat.prototype.addEventListeners = function () {
        //
    };
    /**
     * addKeystrokes
     *
     */
    TakeASeat.prototype.addKeystrokes = function () {
    };
    /**
     * setVersion
     *
     * @returns {string}
     */
    TakeASeat.prototype.setVersion = function () {
        $('.version').text(this.version);
        return this.version;
    };
    /**
     * openModal
     *
     */
    TakeASeat.openModal = function () {
        // Modal öffnen
        $('#modal-center').modal('show');
    };
    /**
     * closeModal
     *
     */
    TakeASeat.closeModal = function () {
        // Modal schliessen
        $('#modal-center').modal('hide');
    };
    /**
     * detectMobile
     *
     * @returns {boolean}
     */
    TakeASeat.prototype.detectMobile = function () {
        if (this.check_for_mobile === true) {
            $(document).ready(function () {
                var isMobile = window.matchMedia("only screen and (max-width: 760px)");
                if (isMobile.matches) {
                    //Conditional script here
                    console.log('mobile detected');
                    // speichern
                    takeASeat.isMobile = true;
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
