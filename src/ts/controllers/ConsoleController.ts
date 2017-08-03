/**
 *  consoleController
 *
 */


// Class
class ConsoleController {

    private elem_Root: HTMLElement | any;
    private elem_Content: HTMLElement | any;
    public consoleModalOpen: boolean;

    /**
     * constructor
     */
    constructor() {

        // Vars
        this.elem_Root = document.getElementById('console-container');
        this.elem_Content = document.getElementById('console-content');
        this.consoleModalOpen = false;

        console.log('- Console load');

    }

    /**
     *
     *
     */
    start() {
        // Aktionen verknüpfen
        this.addKeystrokes();
        this.addEventListener();

        //
        console.log('- Console ready');
    }

    /**
     *
     *
     */
    addEventListener() {

        let scope = this;

        $('.console-button-toggle').click(scope.toggle);
        $('.console-test').click(scope.consoleTest);
        $('.console-clear').click(scope.consoleClear);

    }

    /**
     * addKeystrokes
     */
    addKeystrokes() {
        // kann bei clicks nicht immer mit 'this' umgehen
        let scope = this;

        key('c', function () {
            scope.toggle();
        });
    }


    /**
     * Fenster
     *
     */
    close = () => {
        // kann bei clicks nicht immer mit 'this' umgehen


        this.consoleModalOpen = false;
        $(this.elem_Content).hide();

    };

    open = () => {
        // kann bei clicks nicht immer mit 'this' umgehen


        this.consoleModalOpen = true;
        $(this.elem_Content).show();
    };

    toggle = () => {

        // kann bei clicks nicht immer mit 'this' umgehen

        if (this.consoleModalOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };


    /**
     * Console
     *
     */

    message(text: string, tab?: number) {
        status = 'default';
        this.addToConsole(text, status, tab);
    }

    ok(text: string, tab?: number) {
        status = 'ok';
        this.addToConsole(text, status, tab);
    }

    warning(text: string, tab?: number) {
        status = 'warning';
        this.addToConsole(text, status, tab);
    }


    error(text: string, tab?: number) {
        status = 'error';
        this.addToConsole(text, status, tab);
    }

    consoleClear() {
        let html = '<div id="console-prompt" class="console-prompt prompt-pulse">_</div>';
        $('#console-main').html(html);
        $('#console-toolbar-status').text('console');

    }

    addToConsole = (text: string, status?: any, tab?: number) => {
        let elem_prompt = '#console-prompt';
        let class_status: string;
        let class_tab: string;
        let message: string;

        // Die Class erstellen, die die Nachrichten formatiert
        // sass/utillities/_messages.scss
        class_status = 'message-' + status;


        // Spezielle Textauszeichnungen
        switch (text) {
            case '-':
                message = '<hr class="console">';
                break;
            default:
                message = text;
        }

        // Text einrücken
        if (tab) {
            class_tab = 'tab-' + tab;
        } else {
            class_tab = '';
        }


        // beim ersten Aufruf die Console mit dem Promt versehen
        if (!$(elem_prompt).length) {
            this.consoleClear();
        }
        // Zeile hinzufügen
        $(elem_prompt).before('<div class="' + class_status + ' ' + class_tab + '">' + message + '</div>');
    };

    consoleTest = () => {
        this.open();
        $('.console-status').text('test running...');

        let testmessages = [
            // ['status', 'text', 'tab'],
            ['default', 'Start Test'],
            ['default', '-'],
            ['default', 'da kommt was'],
            ['warning', 'sieht nicht gut aus'],
            ['default', 'oder doch?'],
            ['warning', 'nein, gar nicht gut'],
            ['error', 'Hilfe es kommt auf mich zu', 0],
            ['default', '3', 1],
            ['default', '2', 2],
            ['default', '1', 3],
            ['default', ''],
            ['warning', 'uff! knapp daneben'],
            ['ok', 'und wieder alles gut'],
            ['default', '-'],
            ['default', 'End Test <a onclick="consoleController.consoleClear()">[clear]</a>'],
            ['default', '-']
        ];

        const speed = 500;
        let timer = setInterval(lineAfterLine, speed);
        let length = testmessages.length;
        let index = 0;

        function lineAfterLine() {
            let message = testmessages[index];

            let text: any = message[1];
            let status: any = message[0];
            let tab: any = 0;
            if (message[2]) {
                tab = message[2];
            }
            consoleController.addToConsole(text, status, tab);

            index++;

            // remove timer after interating through all articles
            if (index >= length) {
                clearInterval(timer);
                $('.console-status').text('test end');

            }
        }

    }


}