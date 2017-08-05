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
});
