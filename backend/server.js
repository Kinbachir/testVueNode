const express = require("express");
const bodyParser = require("body-parser");
const swaggersJsDoc = require("swagger-jsdoc");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const app = express();
const route=require('./app/routes/auth.routes');
const options={
  definition:{
    openapi:"3.0.0",
    info : {
      title: "Library API",
      version: "1.0.0.",
      description: "Test Vue Js node Js"
    },
    servers:[
      {
        url:"http://127.0.0.1:8080"
      }
    ]
  },
  apis:["./app/routes/*.js"]
}
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
});

// routes
app.use("/users", route);
const spec=swaggersJsDoc(options)
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(spec))
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});