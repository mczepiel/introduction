/**
    @module "ui/label-preview.reel"
    @requires montage
    @requires montage/ui/component
*/
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component;

/**
    Description TODO
    @class module:"ui/label-preview.reel".LabelPreview
    @extends module:montage/ui/component.Component
*/
exports.LabelPreview = Montage.create(Component, /** @lends module:"ui/label-preview.reel".LabelPreview# */ {

    person: {
        value: null
    },

    label: {
        value: null
    },

    imageData: {
        value: null
    },

    didCreate: {
        value: function () {
            this.addPropertyChangeListener("person.name", this);
            this.addPropertyChangeListener("person.title", this);
            this.addPropertyChangeListener("person.company", this);
            this.addPropertyChangeListener("person.email", this);
            this.addPropertyChangeListener("person.twitterHandle", this);
        }
    },

    handleChange: {
        value: function () {
            this.updateLabel();
            this.needsDraw = true;
        }
    },

    updateLabel: {
        value: function () {
            if (!this.label) {
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

            labelFieldNames = this.label.getObjectNames();

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

                this.label.setObjectText(iFieldName, value ? value : "");
            }
        }
    },

    draw: {
        value: function () {
            var imgData = this.label.render();
            this.imageData = "data:image/png;base64," + imgData;
        }
    }

});
