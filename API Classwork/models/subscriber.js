const mongoose = require("mongoose"),
    Course = require("./course"),
    subscriberSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        zipCode: {
            type: Number,
            min: [10000, "Zipcode too short"],
            max: 99999
        },
        courses: [{ type: mongoose.Schema.Types.ObjectId, ref: Course }]
    }, {
        timestamps: true
    });

subscriberSchema.methods.getInfo = function () {
    return `Name: ${this.name} Email: ${this.email} Zipcode: ${this.zipCode}`;
}

module.exports = mongoose.model("Subscriber", subscriberSchema);