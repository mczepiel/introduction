var Montage = require("montage/core/core").Montage;

exports.Person = Montage.specialize({

    constructor: {
        value: function Person () {
            this.defineBinding("isPopulated", {"<-": "name || email || title || company || twitterHandle || image"});


            ["name", "email", "title", "company", "twitterHandle", "image"].forEach(function (property) {
                this.addPathChangeListener(property, this, "_meCardWillChange", true);
                this.addPathChangeListener(property, this, "_meCardDidChange");
            }, this);
        }
    },

    isPopulated: {
        value: false
    },

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

   _meCardWillChange: {
        value: function () {
            this.dispatchBeforeOwnPropertyChange("mecard", this.mecard);
        }
    },

    _meCardDidChange: {
        value: function () {
            this.dispatchOwnPropertyChange("mecard", this.mecard);
        }
    },

    mecard: {
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
