const user_get = async (req, res) => {
	res.json({ msg: "Welcome to User" });
};

module.exports = {
	user_get,
};
