function generateOrderId(length) {
	const characters =
		"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	let orderId = "SA-";

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		orderId += characters.charAt(randomIndex);
	}

	return orderId;
}

module.exports = generateOrderId;
