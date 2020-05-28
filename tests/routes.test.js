const request = require("supertest");
const app = require("../app");
describe("Post Endpoints", () => {
	it("should create a new post", async () => {
		const res = await request(app).post("/user").send({
			userId: 1,
			title: "test is cool",
		});
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("post");
	});
});
