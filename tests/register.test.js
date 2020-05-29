const request = require("supertest");
const app = require("../app");

describe("Test the Register path", () => {
	test("It should response the GET method", () => {
		return request(app)
			.get("/register")
			.then((response) => {
				expect(response.statusCode).toBe(200);
			});
	});
});

describe("Register Endpoints", () => {
	it("should create a new user", async () => {
		const res = await request(app).post("/register").send({
			name: "Robert",
			email: "rp@devrob.com",
			password: "password",
		});
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("name");
	});
});
