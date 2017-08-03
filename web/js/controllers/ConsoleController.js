/**
 *  consoleController
 *
 */
// Class
var ConsoleController = (function () {
    /**
     * constructor
     */
    function ConsoleController() {
        var _this = this;
        /**
         * Fenster
         *
         */
        this.close = function () {
            // kann bei clicks nicht immer mit 'this' umgehen
            _this.consoleModalOpen = false;
            $(_this.elem_Content).hide();
        };
        this.open = function () {
            // kann bei clicks nicht immer mit 'this' umgehen
            _this.consoleModalOpen = true;
            $(_this.elem_Content).show();
        };
        this.toggle = function () {
            // kann bei clicks nicht immer mit 'this' umgehen
            if (_this.consoleModalOpen) {
                _this.close();
            }
            else {
                _this.open();
            }
        };
        this.addToConsole = function (text, status, tab) {
            var elem_prompt = '#console-prompt';
            var class_status;
            var class_tab;
            var message;
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
            }
            else {
                class_tab = '';
            }
            // beim ersten Aufruf die Console mit dem Promt versehen
            if (!$(elem_prompt).length) {
                _this.consoleClear();
            }
            // Zeile hinzufügen
            $(elem_prompt).before('<div class="' + class_status + ' ' + class_tab + '">' + message + '</div>');
        };
        this.consoleTest = function () {
            _this.open();
            $('.console-status').text('test running...');
            var testmessages = [
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
            var speed = 500;
            var timer = setInterval(lineAfterLine, speed);
            var length = testmessages.length;
            var index = 0;
            function lineAfterLine() {
                var message = testmessages[index];
                var text = message[1];
                var status = message[0];
                var tab = 0;
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
        };
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
    ConsoleController.prototype.start = function () {
        // Aktionen verknüpfen
        this.addKeystrokes();
        this.addEventListener();
        //
        console.log('- Console ready');
    };
    /**
     *
     *
     */
    ConsoleController.prototype.addEventListener = function () {
        var scope = this;
        $('.console-button-toggle').click(scope.toggle);
        $('.console-test').click(scope.consoleTest);
        $('.console-clear').click(scope.consoleClear);
    };
    /**
     * addKeystrokes
     */
    ConsoleController.prototype.addKeystrokes = function () {
        // kann bei clicks nicht immer mit 'this' umgehen
        var scope = this;
        key('c', function () {
            scope.toggle();
        });
    };
    /**
     * Console
     *
     */
    ConsoleController.prototype.message = function (text, tab) {
        status = 'default';
        this.addToConsole(text, status, tab);
    };
    ConsoleController.prototype.ok = function (text, tab) {
        status = 'ok';
        this.addToConsole(text, status, tab);
    };
    ConsoleController.prototype.warning = function (text, tab) {
        status = 'warning';
        this.addToConsole(text, status, tab);
    };
    ConsoleController.prototype.error = function (text, tab) {
        status = 'error';
        this.addToConsole(text, status, tab);
    };
    ConsoleController.prototype.consoleClear = function () {
        var html = '<div id="console-prompt" class="console-prompt prompt-pulse">_</div>';
        $('#console-main').html(html);
        $('#console-toolbar-status').text('console');
    };
    return ConsoleController;
}());
