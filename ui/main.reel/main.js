/**
    @module "ui/main.reel"
    @requires montage
    @requires montage/ui/component
*/
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    Person = require("core/person").Person;

/**
    Description TODO
    @class module:"ui/main.reel".Main
    @extends module:ui/component.Component
*/
exports.Main = Montage.create(Component, /** @lends module:"ui/main.reel".Main# */ {

    // The person we're printing a badge for
    person: {
        value: null
    },

    // The available printers
    printers: {
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

    didCreate: {
        value: function () {

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

            this.person = Person.create();
        }
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

    prepareForDraw: {
        value: function () {
            this.introductionForm.addEventListener("submit", this, false);
            this.introductionForm.addEventListener("reset", this, false);
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
            this.person.reset();
        }
    },

    print: {
        value: function () {

            if (!this.activeLabel) {
                return;
            }

            var printers = dymo.label.framework.getPrinters();
            this.activePrinter = printers[0];
            this.activeLabel.print(this.activePrinter.name);
        }
    }

});
