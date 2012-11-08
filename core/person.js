var Montage = require("montage").Montage;

exports.Person = Montage.create(Montage, {

    name: {
        value: null
    },

    email: {
        value: null
    },

    title: {
        value: null
    },

    company: {
        value: null
    },

    twitterHandle: {
        value: null
    },

    image: {
        value: null
    },

    reset: {
        value: function () {
            this.name = null;
            this.email = null;
            this.title = null;
            this.company = null;
            this.twitterHandle = null;
            this.image = null;
        }
    },

    mecard: {
        dependencies: ["name", "email", "title", "company", "twitterHandle", "image"],
        get: function () {

            var card = "MECARD:";

            if (this.name) {
                card += ":N:" + this.name + ";";
            }

            if (this.title) {
                card += "TITLE:" + this.title + ";";
            }

            if (this.company) {
               card += "ORG:" + this.company + ";";
            }

            if (this.email) {
                card += "EMAIL:" + this.email + ";";
            }

            if (this.twitterHandle) {
                card += "URL:twitter.com/" + this.twitterHandle + ";";
            }

            card += ";";

            return card;
        }
    }

});
