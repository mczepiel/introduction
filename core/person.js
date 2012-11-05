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
    }

});
