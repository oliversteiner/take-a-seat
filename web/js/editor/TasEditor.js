var TasEditor = (function () {
    //  private editorDevicesController: EditorDevicesController;
    function TasEditor() {
        console.log('TasEditor');
    }
    TasEditor.prototype.test = function () {
        console.log('TasEditor:test');
        return false;
    };
    TasEditor.prototype.start = function () {
        console.log('TasEditor:start');
        this.addEventListeners();
        return false;
    };
    TasEditor.prototype.addEventListeners = function () {
        console.log('TasEditor: addEventListeners');
        var scope = this;
        // activateEditor
        $('.editor-button-toggle').click(scope.activateEditor);
        return false;
    };
    /**
     * activateEditor
     *
     */
    TasEditor.prototype.activateEditor = function () {
        console.log('Editor aktiviert');
        // editor modus einschalten
        $('#editor').toggle();
        $('body').toggleClass('editor-active');
    };
    return TasEditor;
}());
