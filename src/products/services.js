const productsModel = require("./models/model");
const discountModel = require("../discount/model");
const cartModel = require("./models/cartModel");
const messages = require("../utils/messages");
const { validationResult } = require("express-validator");
const orderModel = require("./models/orderModel");
const couponModel = require("../coupons/model");
const { ObjectId } = require("mongodb");

module.exports = {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Starting of product services~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    addProduct: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { name, description, productCode, featured, amount } =
                    req.body;

                const imageUrls = await Promise.all(
                    req.files.map((item) => item.path)
                );

                const globalDiscount = await discountModel.findOne({
                    global: true,
                    status: true,
                });

                const newProduct = new productsModel({
                    images: imageUrls,
                    name,
                    description,
                    productCode,
                    featured,
                    amount,
                    discount: globalDiscount?._id,
                });

                const product = await newProduct.save();

                return resolve({
                    success: true,
                    message: messages.products.PRODUCT_CREATED_SUCCESS,
                    result: product,
                });
            } catch (error) {
                console.error(error, "<<-- Error in add product");
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    updateProduct: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { productId } = req.params;
                const { name, description, productCode, featured } = req.body;
                const product = await productsModel.findByIdAndUpdate(
                    productId,
                    {
                        name,
                        description,
                        productCode,
                        featured,
                    },
                    { new: true }
                );

                return resolve({
                    success: true,
                    message: messages.products.PRODUCT_UPDATED_SUCCESS,
                    result: product,
                });
            } catch (error) {
                console.error(error, "<<-- Error in update product");
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    changeProductStatus: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { productId } = req.params;
                const product = await productsModel.findByIdAndUpdate(
                    productId,
                    {
                        status: req.body.status,
                    },
                    { new: true }
                );

                return resolve({
                    success: true,
                    message:
                        messages.products.PRODUCT_STATUS_UPDATED_SUCCESS.replace(
                            "{{status}}",
                            product.status ? "activated" : "deactivated"
                        ),
                    result: product,
                });
            } catch (error) {
                console.error(error, "<<-- Error in update product");
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    setFeaturedProductStatus: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { productId } = req.params;
                const product = await productsModel.findByIdAndUpdate(
                    productId,
                    {
                        featured: req.body.featured,
                    },
                    { new: true }
                );

                return resolve({
                    success: true,
                    message: req.body.featured
                        ? messages.products.PRODUCT_FEATURED_SUCCESS
                        : messages.products.PRODUCT_UNFEATURED_SUCCESS,
                    result: product,
                });
            } catch (error) {
                console.error(error, "<<-- Error in update product");
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    getProducts: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    isDeleted: false,
                };

                if (req.query.status) {
                    query.status = req.query.status;
                }
                if (req.query.featured) {
                    query.featured = req.query.featured;
                }
                if (req.query.search) {
                    query["$or"] = [
                        { name: { $regex: req.query.search, $options: "i" } },
                        {
                            productCode: {
                                $regex: req.query.search,
                                $options: "i",
                            },
                        },
                    ];
                }

                const products = await productsModel
                    .find(query)
                    .sort({ createdAt: -1 });

                return resolve({
                    success: true,
                    message: messages.products.PRODUCTS_FETCHED_SUCCESS,
                    result: products,
                });
            } catch (error) {
                console.error(error, "<<-- Error in get products");
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    getProductDetails: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { productId } = req.params;
                const product = await productsModel.findOne({
                    _id: new ObjectId(productId),
                    isDeleted: false,
                });

                if (!product) {
                    return resolve({
                        success: false,
                        message: messages.products.PRODUCT_NOT_FOUND,
                    });
                }

                return resolve({
                    success: true,
                    message: messages.products.PRODUCT_FOUND_SUCCESSFUL,
                    result: product,
                });
            } catch (error) {
                console.error(error, "<<-- Error in get product details");
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    getFeaturedProducts: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    featured: true,
                    isDeleted: false,
                };

                if (req.query.status) {
                    query.status = req.query.status;
                }
                if (req.query.search) {
                    query["$or"] = [
                        { name: { $regex: req.query.search, $options: "i" } },
                        {
                            productCode: {
                                $regex: req.query.search,
                                $options: "i",
                            },
                        },
                    ];
                }

                const products = await productsModel.find(query);
                return resolve({
                    success: true,
                    message:
                        messages.products.FEATURED_PRODUCTS_FETCHED_SUCCESS,
                    result: products,
                });
            } catch (error) {
                console.error(error, "<<-- Error in get featured products");
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    deleteProducts: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { productId } = req.params;
                const deletedProd = await productsModel.findOneAndUpdate(
                    { _id: productId },
                    { isDeleted: true, deletedAt: new Date() },
                    { new: true }
                );
                return resolve({
                    success: true,
                    result: deletedProd,
                    message: messages.products.PRODUCTS_DELETED_SUCCESS,
                });
            } catch (error) {
                console.error(error, "<<-- Error in delete products");
                return reject({
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Ending of product services~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Starting of cart services~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    addToCart: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { product, quantity } = req.body;
                const cart = await cartModel.findOne({
                    user: req.user._id,
                    product,
                });

                if (!cart) {
                    const newCart = new cartModel({
                        user: req.user._id,
                        product,
                        quantity,
                    });

                    const savedCart = await newCart.save();
                    return resolve({
                        status: 200,
                        success: true,
                        message: messages.products.PRODUCT_ADDED_TO_CART,
                        result: savedCart,
                    });
                } else {
                    cart.quantity = quantity;

                    const updatedCart = await cart.save();

                    return resolve({
                        status: 200,
                        success: true,
                        message: messages.products.PRODUCT_ADDED_TO_CART,
                        result: updatedCart,
                    });
                }
            } catch (error) {
                console.error(error, "<<-- Error in adding item to cart");
                return reject({
                    status: 500,
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    getCarts: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const carts = await cartModel.find({
                    user: req.user._id,
                });
                return resolve({
                    status: 200,
                    success: true,
                    message: messages.products.CARTS_FETCHED_SUCCESS,
                    result: carts,
                });
            } catch (error) {
                console.error(error, "<<-- Error in get carts");
                return reject({
                    status: 500,
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Ending of cart services~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Starting of order services~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    createOrder: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = validationResult(req);

                if (!result.isEmpty()) {
                    const extractedErrors = [];
                    result.array().map((err) => {
                        console.log(err, "<<-- Error");
                        extractedErrors.push({ [err.path]: err.msg });
                    });

                    return reject({
                        status: 422,
                        success: false,
                        message: extractedErrors,
                    });
                }

                const { products, totalPrice, coupon } = req.body;
                const order = new orderModel({
                    products,
                    totalPrice,
                    coupon,
                    customer: req.user._id,
                });

                if (coupon) {
                    await couponModel.findOneAndUpdate(
                        { _id: coupon },
                        { isDeleted: true },
                        { new: true }
                    );
                }

                const savedOrder = await order.save();

                if (!savedOrder) {
                    return reject({
                        status: 400,
                        success: false,
                        message: messages.products.ORDER_CREATE_FAILED,
                    });
                } else {
                    return resolve({
                        status: 200,
                        success: true,
                        message: messages.products.ORDER_CREATE_SUCCESS,
                        result: savedOrder,
                    });
                }
            } catch (error) {
                console.error(error, "<<-- Error in create order");
                return reject({
                    status: 500,
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    orderStatusUpdate: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { orderId } = req.params;
                const { status } = req.body;
                const order = await orderModel.findOne({
                    _id: orderId,
                    status: "Pending",
                });
                order.status = status;
                const updatedOrder = await order.save();
                return resolve({
                    status: 200,
                    success: true,
                    message: messages.products.ORDER_STATUS_UPDATE_SUCCESS,
                    result: updatedOrder,
                });
            } catch (error) {
                console.error(error, "<<-- Error in order status update");
                return reject({
                    status: 500,
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    getOrders: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    customer: req.user._id,
                };
                let sort = {
                    createdAt: -1,
                };

                const orders = await orderModel.find(query).sort(sort);

                return resolve({
                    status: 200,
                    success: true,
                    message: messages.products.ORDERS_FETCHED_SUCCESS,
                    result: orders,
                });
            } catch (error) {
                console.error(error, "<<-- Error in get orders");
                return reject({
                    status: 500,
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    getAllOrders: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    customer: req.user._id,
                };
                let sort = {
                    createdAt: -1,
                };

                if (req.query.status) {
                    query.status = req.query.status;
                }

                if (req.query.status) {
                    query.status = req.query.status;
                }
                if (req.query.search) {
                    query.orderId = { $regex: req.query.search, $options: "i" };
                }
                if (req.query.orderDate) {
                    query.orderDate = new Date(req.query.orderDate);
                }

                if (req.query.sort === "asc") {
                    sort.createdAt = -1;
                } else if (req.query.sort === "desc") {
                    sort.createdAt = 1;
                }

                const orders = await orderModel.find(query).sort(sort);

                return resolve({
                    status: 200,
                    success: true,
                    message: messages.products.ORDERS_FETCHED_SUCCESS,
                    result: orders,
                });
            } catch (error) {
                console.error(error, "<<-- Error in get all orders");
                return reject({
                    status: 500,
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    getOrderDetails: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { orderId } = req.params;
                const order = await orderModel.findOne({
                    _id: orderId,
                });
                return resolve({
                    status: 200,
                    success: true,
                    message: messages.products.ORDER_DETAILS_FETCHED_SUCCESS,
                    result: order,
                });
            } catch (error) {
                console.error(error, "<<-- Error in getting order details");
                return reject({
                    status: 500,
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    cancelOrder: (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { orderId } = req.params;
                const { cancelMessage } = req.body;
                const order = await orderModel.findOne({
                    $or: [{ orderId: orderId }, { _id: orderId }],
                });
                order.status = "Canceled";
                order.cancelMessage = cancelMessage;
                const updatedOrder = await order.save();
                return resolve({
                    status: 200,
                    success: true,
                    message: messages.products.ORDER_CANCELED_SUCCESS,
                    result: updatedOrder,
                });
            } catch (error) {
                console.error(error, "<<-- Error in cancel order");
                return reject({
                    status: 500,
                    success: false,
                    message: messages.common.INTERNAL_SERVER_ERROR,
                    err: error.message ?? error.toString(),
                });
            }
        });
    },

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Ending of order services~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
};
