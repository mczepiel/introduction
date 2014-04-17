var Component = require("montage/ui/component").Component;

exports.LabelPreview = Component.specialize({

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
            this.addPathChangeListener("person.mecard", this, "handleChange");
        }
    },

    handleChange: {
        value: function () {
            this.updateLabel();
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
                    value = person.mecard;
                }

                this.label.setObjectText(iFieldName, value ? value : " ");
            }

            this.needsDraw = true;
        }
    },

    draw: {
        value: function () {
            var imgData = this.label.render();
            this.imageData = "data:image/png;base64," + imgData;
        }
    }

});
