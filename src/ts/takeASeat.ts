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

    /**
     *  update
     *
     */
    update() {

    }


    /**
     * loadComponents
     *
     */
    loadComponents() {

    }


    /**
     * addEventsListeners
     *
     */
    addEventListeners() {

        //

    }

    /**
     * addKeystrokes
     *
     */
    addKeystrokes() {


    }


    /**
     * setVersion
     *
     * @returns {string}
     */
    setVersion() {
        $('.version').text(this.version);
        return this.version;
    }


    /**
     * openModal
     *
     */
    static openModal() {

        // Modal öffnen
        $('#modal-center').modal('show');
    }


    /**
     * closeModal
     *
     */
    static closeModal() {

        // Modal schliessen
        $('#modal-center').modal('hide');
    }


    /**
     * detectMobile
     *
     * @returns {boolean}
     */
    detectMobile() {
        if (this.check_for_mobile === true) {

            $(document).ready(function () {
                let isMobile = window.matchMedia("only screen and (max-width: 760px)");

                if (isMobile.matches) {
                    //Conditional script here
                    console.log('mobile detected');

                    // speichern
                    takeASeat.isMobile = true;

                }  // isMobile

            }); // ready

            return true;

        } else {

            return false;
        }
    }


} // Class



