"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spatzenhrin = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Spatzenhrin;
(function (Spatzenhrin) {
    let orders;
    let port = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }
    let databaseUrl = "mongodb+srv://Admin:4dm1n_L0g1n@SPATZENHIRN.dvjdj.mongodb.net/Einreichungen?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("server starting, port:" + _port);
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Eisdiele").collection("Bestellungen");
        console.log("Database connection" + orders != undefined);
    }
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let urlWithQuery = Url.parse(_request.url, true);
            let id = urlWithQuery.query["id"];
            let objID = new Mongo.ObjectId(id);
            switch (urlWithQuery.pathname) {
                case "/send": // Bestellung absenden
                    orders.insertOne(urlWithQuery.query);
                    break;
                case "/show": // Bestellungen anzeigen
                    _response.write(JSON.stringify(await orders.find().toArray()));
                    break;
                case "/deleteAll": // Alle Bestellungen löschen
                    orders.deleteMany({});
                    break;
                case "/addStatusFinished": // Status einer Bestellung auf "fertig" setzen
                    await orders.updateOne({ "_id": objID }, { $set: { status: "fertig" } });
                    break;
                case "/addStatusDelivered": // Status einer Bestellung auf "geliefert" setzen
                    await orders.updateOne({ "_id": objID }, { $set: { status: "geliefert" } });
                    break;
                case "/removeOne": // Eine bestimmte Bestellung löschen
                    await orders.deleteOne({ "_id": objID });
                    break;
                default:
                    _response.write(_request.url);
                    console.log("Pathname didn't match up with any of the cases.");
            }
        }
        _response.end();
    }
})(Spatzenhrin = exports.Spatzenhrin || (exports.Spatzenhrin = {}));
//# sourceMappingURL=server.js.map