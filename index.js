const { response, request } = require("express");
//initialization
const express = require("express");

const OurAPP = express();

OurAPP.get("/", (request, response) => {
response.json({message: "Request Served!!!..."});
});

OurAPP.listen(4000, () => console.log("server is running"));