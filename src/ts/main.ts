

// Main
declare let takeASeat: any;

// Service
declare let pouchDBService: any;

// Editor
declare let tasEditor: any;

// Panels
declare let panels: any;

// Console
declare let consoleController: any;

// seatSelect
declare let seatSelectController: any;


// others


let options = {
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

    const $target = $('#plan-container');

    $('#plan-content').appendTo($target);

});