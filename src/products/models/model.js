const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        images: [
            {
                type: String,
            },
        ],
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        productCode: {
            type: String,
            required: true,
            trim: true,
        },
        featured: {
            // This field is used for featured product
            type: Boolean,
            default: false,
        },
        discount: {
            type: Schema.Types.ObjectId,
            ref: "discounts",
        },
        amount: {
            type: Number,
            required: true,
            trim: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

productSchema.pre("save", async function (next) {
    await this.populate("discount", ["_id", "name", "discount", "type"]);
    next();
});

productSchema.pre("find", function (next) {
    this.populate("discount", ["_id", "name", "discount", "type"]);
    next();
});

productSchema.pre("findOne", function (next) {
    this.populate("discount", ["_id", "name", "discount", "type"]);
    next();
});

module.exports = mongoose.model("products", productSchema);
