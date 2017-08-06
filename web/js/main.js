// others
var options = {
    check_for_mobile: false // true, false
};
$(function () {
    // ostConsole
    consoleController = new ConsoleController();
    consoleController.start();
    // A Nicer Way
    takeASeat = new TakeASeat(options);
    takeASeat.start();
    // Services:
    pouchDBService = new PouchDBService();
    // Panels
    panels = new PanelController();
    // Editor
    tasEditor = new TasEditor();
    tasEditor.start();
    // seatSelectController
    seatSelectController = new SeatSelectController();
    seatSelectController.start();
    // den Sitzplan an die richtige Stelle verschieben
    var $target = $('#plan-container');
    $('#plan-content').appendTo($target);
    buchen();
});
// gehe zu
function goTo(seitenname) {
    // check ob ok zu wechseln
    // Alle seiten ausblenden
    $('section.section-ticket').hide();
    // neue Seite einblenden
    $('#' + seitenname + '-content').show();
    window.scrollTo(0, 0);
}
// gehe zu
function buchen() {
    $('#modal-buchen').modal('show');
}
function goToWebsite() {
    $('#modal-buchen').modal('hide');
}
