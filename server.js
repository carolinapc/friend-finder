var express = require("express");
const PORT = process.env.PORT || 3000;

app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function () {
    console.log(`App listen on PORT ${PORT}...`); 
});
