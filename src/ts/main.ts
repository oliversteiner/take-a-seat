

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


    goTo('sitzplan');

});

// gehe zu

function goTo(seitenname:string){

    // check ob ok zu wechseln

    // Alle seiten ausblenden

    $('section.section-ticket').hide();

    // neue Seite einblenden
    $('#'+seitenname+'-content').show();
    window.scrollTo(0,0);

}

// gehe zu

function buchen(){

    $('#modal-buchen').modal('show');

}


function goToWebsite(){
    $('#modal-buchen').modal('hide');

}

function showAbschnittNames(){

    // Button name
    const $show_name_button = $('.show-name-button-toggle');
    let button_text;

    // add Class to Root Elem
    const $bestuhlungs_layout = $('#bestuhlungs-layout');
    const class_name = 'abschnitt-name-ein';

    $bestuhlungs_layout.toggleClass(class_name);


    // Button ändern
    if ($bestuhlungs_layout.hasClass( class_name )){
        button_text = 'Namen ausblenden'
    }
    else {
        button_text = 'Namen einblenden'
    }
    $show_name_button.html( button_text);


}


