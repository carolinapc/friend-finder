var path = require("path");

module.exports = app => {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
    
    app.get("/survey", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    app.get("/assets/:folder/:file", (req, res) => {
        res.sendFile(path.join(__dirname, `../public/assets/${req.params.folder}/${req.params.file}`));
    });
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
}