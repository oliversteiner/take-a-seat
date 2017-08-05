class TasEditor {
    //  private editorDevicesController: EditorDevicesController;


    constructor() {
        console.log('TasEditor');

    }


    test() {
        console.log('TasEditor:test');

        return false;
    }

    start() {
        console.log('TasEditor:start');

        this.addEventListeners();
        return false;
    }


    addEventListeners() {
        console.log('TasEditor: addEventListeners');

        const scope = this;

        // activateEditor
        $('.editor-button-toggle').click(
            scope.activateEditor
        );

        return false;
    }

    /**
     * activateEditor
     *
     */
    activateEditor() {
        console.log('Editor aktiviert');
        // editor modus einschalten
        $('#editor').toggle();
        $('body').toggleClass('editor-active');
    }

}



