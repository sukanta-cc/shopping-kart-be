const messages = require("../utils/messages");
const discountModel = require("./model");
const productModel = require("../products/models/model");

module.exports = {
    addDiscount: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { name, description, discount, product, type } = req.body;

                const globalDiscountQuery = {
                    global: true,
                    status: true,
                    isDeleted: false,
                };
                const productDiscountQuery = {
                    product,
                    status: true,
                    isDeleted: false,
                };

                const globalDiscount = await discountModel
                    .findOne(globalDiscountQuery)
                    .sort({ createdAt: -1 });
                const productDiscount = await discountModel.findOne(
                    productDiscountQuery
                );

                const newDiscount = new discountModel({
                    name,
                    description,
                    discount,
                    type,
                    global: !product,
                    product: !product ? null : product,
                });

                const savedDiscount = await newDiscount.save();

                if (!savedDiscount) {
                    return reject({
                        status: 400,
                        success: false,
                        message: messages.discount.DISCOUNT_CREATED_FAILED,
                    });
                }

                // Update product table with the new discount
                const updateProductQuery = { isDeleted: false };

                if (product) {
                    updateProductQuery._id = savedDiscount.product;
                    productDiscountQuery.discount = savedDiscount._id;

                    // Changing status of the old product discount
                    productDiscount.status = false;
                    await productDiscount.save();
                } else {
                    globalDiscountQuery.discount = savedDiscount._id;

                    // Changing status of the old global discount
                    globalDiscount.status = false;
                    await globalDiscount.save();
                }

                await productModel.updateMany(updateProductQuery, {
                    discount: savedDiscount._id,
                });

                return resolve({
                    status: 200,
                    success: true,
                    message: messages.discount.DISCOUNT_CREATED_SUCCESS,
                    result: savedDiscount,
                });
            } catch (error) {
                console.error(error, "<<-- Error in addDiscount");
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    getDiscounts: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const discounts = await discountModel
                    .find({
                        status: true,
                        isDeleted: false,
                    })
                    .populate("product", ["name", "_id", "productCode"])
                    .sort({ createdAt: -1 });

                return resolve({
                    status: 200,
                    success: true,
                    message: messages.discount.DISCOUNTS_FETCHED_SUCCESS,
                    result: discounts,
                });
            } catch (error) {
                console.error(error, "<<-- Error in getDiscounts");
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    updateDiscount: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { discountId } = req.params;
                const { name, description, discount, product } = req.body;

                const updatedDiscount = await discountModel.findByIdAndUpdate(
                    discountId,
                    {
                        name,
                        description,
                        discount,
                        product,
                    },
                    { new: true }
                );

                return resolve({
                    status: 200,
                    success: true,
                    message: messages.discount.DISCOUNT_UPDATED_SUCCESS,
                    result: updatedDiscount,
                });
            } catch (error) {
                console.error(error, "<<-- Error in updateDiscount");
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    deleteDiscount: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { discountId } = req.params;

                const deletedDiscount = await discountModel.findByIdAndUpdate(
                    discountId,
                    {
                        isDeleted: true,
                        deletedAt: new Date(),
                    },
                    { new: true }
                );

                return resolve({
                    status: 200,
                    success: true,
                    message: messages.discount.DISCOUNTS_DELETED_SUCCESS,
                    result: deletedDiscount,
                });
            } catch (error) {
                console.error(error, "<<-- Error in deleteDiscount");
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },
};
