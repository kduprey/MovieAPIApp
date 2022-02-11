const express = require("express");
const app = express();
const morgan = require("morgan");
const got = require("got");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("search");
});

app.get("/results", async (req, res) => {
	let query = req.query.search;
	let url = `https://omdbapi.com/?s=${query}&apikey=${process.env.API_KEY}`;
	try {
		let data = await got(url, {
			responseType: "json",
		});
		res.render("results", { data: data.body });
	} catch (error) {
		console.log(error);
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Listning on port ${process.env.PORT}...`);
});
