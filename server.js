// Module Imports
const express       = require('express');
const app           = express();
const routes        = require('./routes/routes');

// Routing
app.use("/", routes);

// Server Start
app.listen(3000, function() {
    console.log("===================================================================\n| -------- Hot Wheels Warehouse running on Port 3000... --------- |\n===================================================================");
})