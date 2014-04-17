var Component = require("montage/ui/component").Component,
    Person = require("core/person").Person;

exports.Main = Component.specialize({

    constructor: {
        value: function Main () {

            this.super();

            if (!dymo) {
                console.log("DYMO library not available.");
                return;
            }

            var layoutUrl = require.location + "assets/labels/hello.label";

            this.isLoadingLabels = true;
            var req = new XMLHttpRequest();
            req.identifier = "labelRequest";
            req.open("GET", layoutUrl);
            req.addEventListener("load", this, false);
            req.addEventListener("error", this, false);
            req.send();

            this.person = new Person();
        }
    },

    // The person we're printing a badge for
    person: {
        value: null
    },

    // The available printers
    printers: {
        value: null
    },

    nameField: {
        value: null
    },

    // The current printer being used
    activePrinter: {
        value: null
    },

    // The label that will be used to print the badge
    activeLabel: {
        value: null
    },

    // The badge form element
    introductionForm: {
        value: null
    },

    // The image used to preview the badge
    printPreview: {
        value: null
    },

    handleLabelRequestLoad:{
        value:function (evt) {
            this.activeLabel = dymo.label.framework.openLabelXml(evt.target.responseText);
            this.isLoadingLabels = false;
        }
    },

    handleLabelRequestError:{
        value:function (evt) {
            console.error("handleLabelRequestError", evt);
            this.isLoadingLabels = false;
        }
    },

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.introductionForm.addEventListener("submit", this, false);
                this.introductionForm.addEventListener("reset", this, false);

                this.nameField.element.focus();
            }
        }
    },

    handleSubmit: {
        value: function (evt) {
            evt.preventDefault();
            this.print();
        }
    },

    handleReset:{
        value:function (evt) {
            evt.preventDefault();
            this.reset();
        }
    },

    reset: {
        value: function () {
            this.person.reset();
            this.nameField.element.focus();
        }
    },

    print: {
        value: function () {

            if (!(this.activeLabel && this.person.isPopulated)) {
                return;
            }

            var printers = dymo.label.framework.getPrinters();
            this.activePrinter = printers[0];
            this.activeLabel.print(this.activePrinter.name);
            this.reset();
        }
    }

});
