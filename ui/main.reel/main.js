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
            this.person.addPropertyChangeListener("name", this);
            this.person.addPropertyChangeListener("title", this);
            this.person.addPropertyChangeListener("company", this);
            this.person.addPropertyChangeListener("email", this);
            this.person.addPropertyChangeListener("twitterHandle", this);
        }
    },

    handleChange: {
        value: function (notification) {
            console.log("change", notification);
            this.updatePreview();
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
            this.updatePreview();
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

    updateLabel: {
        value: function () {
            if (!this.activeLabel) {
                return;
            }

            var labelFieldNames,
                i,
                iFieldName,
                personPropertyName,
                personProperty,
                value,
                person = this.person,
                title,
                company,
                email,
                twitterHandle;

            labelFieldNames = this.activeLabel.getObjectNames();

            for (i = 0; (iFieldName = labelFieldNames[i]); i++) {

                if ("personName" === iFieldName) {
                    //Apparently null or empty strings clear the text styles
                    value = this.person.name ? this.person.name : " ";
                } else if ("content" === iFieldName) {

                    value = "";

                    title = person.title;
                    company = person.company;
                    email = person.email;
                    twitterHandle = person.twitterHandle;

                    if (title) {
                        value += title + "\n";
                    }
                    if (company) {
                        value += company + "\n";
                    }

                    if (email || twitterHandle) {
                        value += "\n";
                    }

                    if (email) {
                        value += "email " + email + "\n";
                    }
                    if (twitterHandle) {
                        value += "twitter @" + twitterHandle + "\n";
                    }

                    if ("" === value) {
                        // Preserve any formatting
                        value = " ";
                    }

                } else if ("Barcode" === iFieldName) {
                    if (twitterHandle) {
                        value = "http://twitter.com/" + twitterHandle
                    } else if (email) {
                        value = "mailto://" + email;
                    } else {
                        value = "";
                    }
                }

                this.activeLabel.setObjectText(iFieldName, value ? value : "");
            }
        }
    },

    updatePreview: {
        value: function () {
            if (!this.activeLabel) {
                return;
            }

            this.updateLabel();

            var imgData = this.activeLabel.render();
            this.printPreview.src = "data:image/png;base64," + imgData;
        }
    },

    print: {
        value: function () {

            if (!this.activeLabel) {
                return;
            }

            this.updateLabel();

            var printers = dymo.label.framework.getPrinters();
            this.activePrinter = printers[0];
            this.activeLabel.print(this.activePrinter.name);
        }
    }

});
