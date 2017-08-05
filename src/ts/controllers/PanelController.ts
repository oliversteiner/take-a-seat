/**
 *  Nicer Panel Controller
 *  v 1.0.1
 *
 *  History:
 *
 *  v 1.0.1
 *  - ""toggle-button" gewechselt zu "button-toggle"
 */


interface Panel {
    show(): void;

    hide(): void;

    toggle(): void;

}


class Panel {

    private name: string;
    private $panel: any;  // jQuery

    constructor(name: string) {
        console.log('PanelController: ' + name);

        this.name = name;
        const panel = '#nicer-panel-' + this.name;
        this.$panel = $(panel);
    }

    hide() {
        this.$panel.hide();
    }

    show() {
        this.$panel.show();
    }

    toggle() {
        this.$panel.toggle();
    }


}


class PanelController {

    public panels: any;

    constructor() {

        this.panels = [];
        this.searchPanels();

        return this.panels;

    }


    searchPanels() {

        let $panels = $('.nicer-panel');
        let panels: string[] = [];

        for (let i = 0; i < $panels.length; i++) {

            let panel_ID = $($panels[i]).attr('id');
            let panel_Key = $($panels[i]).data('keystroke');

            // den Namen kürzen und in die Variable stellen
            let panel_name = panel_ID.replace('nicer-panel-', '');
            panels[i] = panel_name;

            // EventListener aktivieren
            this.activate(panel_ID, panel_Key);

            // dynamische Objekte erstellen
            this.generate(panel_name);
        }


        return panels;

    }

    generate(panel_name: string) {

        let panel = new Panel(panel_name);

        this.panels.push(panel_name);
        this.panels[panel_name] = panel;

    }


    activate(panel_id: string, panel_Key?: string) {

        let $panel = $('#' + panel_id);
        let panel_name = panel_id.replace('-content', '');
        $panel.hide();


        // Close
        let closeButton = '.' + panel_id + ' .-button-close';
        let $closeButton = $(closeButton);

        // -- add EventListener
        $closeButton.click(function () {
            $panel.hide();
        });


        // Toggle toggle
        let toggleButton = '.' + panel_id + '-button-toggle';
        let $toggleButton = $(toggleButton);

        // -- add EventListener
        $toggleButton.click(function () {
            $panel.toggle();
        });


        // minimize
        let miniButton = '#' + panel_id + ' .nicer-panel-header';
        let $miniButton = $(miniButton);

        // content
        let main = '#' + panel_id + ' .nicer-panel-main';
        let $main = $(main);

        // -- add EventListener
        $miniButton.dblclick(function () {
            $main.slideToggle('fast');
            $miniButton.toggleClass('closed');

        });


        // section
        // --------------------------------------
        let section_header = '#' + panel_id + ' .nicer-panel-section-header';
        let $section_header = $(section_header);

        // -- add EventListener
        $section_header.dblclick(function () {

            let $section_main = $(this).parent().children('.nicer-panel-section-main');
            console.log($section_main);
            $section_main.slideToggle('fast');
            $(this).toggleClass('closed');
        });


        // options
        // --------------------------------------
        let options_button = '#' + panel_id + ' .nicer-panel-button-options';
        let $options_button = $(options_button);


        // -- add EventListener
        $options_button.click(function () {

            let $section_option = $(this).parent().parent().find('.nicer-panel-section-options');
            console.log($(this).parent().parent());
            console.log($section_option);

            $section_option.slideToggle('fast');
            $(this).toggleClass('closed');
        });


        // close
        // -- add EventListener
        $('.nicer-panel-button-close').click(function () {

            let $close_button = $(this).parent().parent();
            console.log($close_button);
            $close_button.hide();
        });


        // Draggable
        $panel.draggable();

        if (panel_Key) {
            // Keystroke
            key(panel_Key, function () {
                $panel.toggle();
            });
        }


        // flip
        let flipConteiner = '#' + panel_id + ' .flip-container';
        let $flipConteiner = $(flipConteiner);

        if ($flipConteiner) {

            // content
            let flipButton = '#' + panel_id + ' .flip-button-toggle';
            let $flipButton = $(flipButton);

            // -- add EventListener
            $flipButton.click(function () {
                $flipConteiner.toggleClass('flip');
            });


        }

    }

}