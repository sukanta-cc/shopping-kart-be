module.exports = {
    common: {
        INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",
        UNAUTHORIZED: "You are not authorized.",
    },

    auth: {
        SIGNUP_FAILED: "Failed to sign up. Please try again.",
        USER_EXISTS: "A user already exists with this email address.",
        USER_CREATE_FAILED: "Failed to create user. Please try again.",
        USER_CREATED_SUCCESS: "User created successfully.",
        USER_NOT_FOUND: "User not found.",
        USER_LOGGEDIN_SUCCESS: "User logged in successfully.",
        PASSWORD_MISMATCH_ERROR:
            "Password mismatch. Please check your credentials.",
        USERS_FOUND_SUCCESSFUL: "Users retrieved successfully.",
        USER_FOUND_SUCCESSFUL: "User retrieved successfully.",
        NO_USERS_FOUND: "No users found.",
        PASSWORD_RESET: "Password reset successful.",
        USER_ACTIVATION: "User {{status}} successfully.",
        USER_UPDATED_SUCCESS: "User Updated successfully",
        USER_DELETED_SUCCESS: "User deleted successfully",
        PASSWORD_CHANGED: "Password changed successfully",
        TWO_FACTOR_ENABLED: "Two factor authentication enabled successfully",
        TWO_FACTOR_DISABLED: "Two factor authentication disabled successfully",
        VERIFY_OTP:
            "A otp has been sent to your email id. Please verify your email address.",
    },

    products: {
        PRODUCT_CREATED_SUCCESS: "Product created successfully.",
        PRODUCT_UPDATED_SUCCESS: "Product updated successfully.",
        PRODUCTS_FETCHED_SUCCESS: "Products retrieved successfully.",
        PRODUCT_FOUND_SUCCESSFUL: "Product retrieved successfully.",
        PRODUCT_NOT_FOUND: "Product not found.",
        FEATURED_PRODUCTS_FETCHED_SUCCESS:
            "Featured products retrieved successfully.",
        PRODUCTS_DELETED_SUCCESS: "Products deleted successfully.",
        PRODUCT_ADDED_TO_CART: "Products added to cart successfully.",
        CARTS_FETCHED_SUCCESS: "Carts fetched successfully.",
        ORDER_CREATE_FAILED: "Failed to create order.",
        ORDER_CREATE_SUCCESS: "Order created successfully.",
        ORDER_STATUS_UPDATE_SUCCESS: "Order status updated successfully.",
        ORDERS_FETCHED_SUCCESS: "Orders fetched successfully.",
        ORDER_CANCELED_SUCCESS: "Order canceled successfully.",
        ORDER_DETAILS_FETCHED_SUCCESS: "Order details fetched successfully.",
        PRODUCT_STATUS_UPDATED_SUCCESS: "Product {{status}} successfully.",
        PRODUCT_FEATURED_SUCCESS: "The product has been featured successfully.",
        PRODUCT_UNFEATURED_SUCCESS:
            "The product has been removed from featured.",
    },

    discount: {
        DISCOUNT_CREATED_SUCCESS: "Discount created successfully.",
        DISCOUNT_UPDATED_SUCCESS: "Discount updated successfully.",
        DISCOUNTS_FETCHED_SUCCESS: "Discounts retrieved successfully.",
        DISCOUNT_FOUND_SUCCESSFUL: "Discount retrieved successfully.",
        DISCOUNTS_DELETED_SUCCESS: "Discounts deleted successfully.",
        DISCOUNT_CREATED_FAILED: "Failed to create discount.",
    },

    coupon: {
        COUPON_CREATE_FAILED: "Failed to create coupon.",
        COUPON_CREATED: "Coupon created successfully.",
        COUPON_STATUS_SUCCESS: "Coupon {{status}} successfully.",
        COUPON_STATUS_FAILED: "Coupon {{status}} failed.",
        COUPONS_FETCHED_FAILED: "Failed to fetch coupons.",
        COUPONS_FETCHED_SUCCESS: "Coupons fetched successfully.",
        COUPON_NOT_FOUND: "Coupon not found.",
        COUPON_FOUND: "Coupon retrieved successfully.",
    },

    store: {
        LOGO_UPLOADED: "Logo uploaded successfully.",
        BANNER_UPLOADED: "Banner uploaded successfully.",
    },
};
