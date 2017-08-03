// others
var options = {
    check_for_mobile: false // true, false
};
$(document).ready(function () {
    // ostConsole
    consoleController = new ConsoleController();
    consoleController.start();
    // A Nicer Way
    takeASeat = new TakeASeat(options);
    takeASeat.start();
    // Services:
    pouchDBService = new PouchDBService();
    panels = new PanelController();
    // Editor
    tasEditor = new TasEditor();
    tasEditor.start();
    // ------- Start Debug
    // ------- End Debug
    // toggle Editor
    $('.tumbnails-area-toggle-button-2').click(function () {
        // editor modus einschalten
        $('#editor').toggle();
        $('body').toggleClass('editor-active');
    });
    sitzeVierschieben('links');
    sitzeVierschieben('rechts');
});
