module.exports = {
	common: {
		INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",
		UNAUTHORIZE: "You are not authorized.",
	},

	auth: {
		SIGNUP_FAILED: "Failed to sign up. Please try again.",
		USER_EXISTS: "User already exists with this email address.",
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
		USER_ACTIVATION: "User {{status}} successfully",
	},

	products: {
		PRODUCT_CREATED_SUCCESS: "Product created successfully",
		PRODUCT_UPDATED_SUCCESS: "Product updated successfully",
		PRODUCTS_FETCHED_SUCCESS: "Products retrieved successfully",
		PRODUCT_FOUND_SUCCESSFUL: "Product retrieved successfully",
		FEATURED_PRODUCTS_FETCHED_SUCCESS:
			"Featured Products retrieved successfully",
		PRODUCTS_DELETED_SUCCESS: "Products deleted successfully",
	},

	discount: {
		DISCOUNT_CREATED_SUCCESS: "Discount created successfully",
		DISCOUNT_UPDATED_SUCCESS: "Discount updated successfully",
		DISCOUNTS_FETCHED_SUCCESS: "Discounts retrieved successfully",
		DISCOUNT_FOUND_SUCCESSFUL: "Discount retrieved successfully",
		DISCOUNTS_DELETED_SUCCESS: "Discounts deleted successfully",
		DISCOUNT_CREATED_FAILED: "Failed to create discount",
	},

	coupon: {
		COUPON_CREATE_FAILED: "Failed to create coupon.",
		COUPON_CREATED: "Coupon created successfully",
		COUPON_STATUS_SUCCESS: "Coupon {{status}} successfully",
		COUPON_STATUS_FAILED: "Coupon {{status}} failed",
		COUPONS_FETCHED_FAILED: "Coupons fetched failed",
		COUPONS_FETCHED_SUCCESS: "Coupons fetched successfully",
	},

	store: {
		LOGO_UPLOADED: "Logo uploaded successfully",
		BANNER_UPLOADED: "Banner uploaded successfully",
	},
};
