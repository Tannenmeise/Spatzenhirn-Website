"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spatzenhrin = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Spatzenhrin;
(function (Spatzenhrin) {
    // Einreichungen
    let wikiEinreichungen;
    // Wiki
    let vogelarten;
    let wikiAufnahmen;
    let port = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }
    // remote
    let databaseUrl = "mongodb+srv://Admin:4dm1n_L0g1n@spatzenhirn.uts2e.mongodb.net/Einreichungen?retryWrites=true&w=majority";
    // local
    // let databaseUrl: string = "mongodb://localhost:27017";
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
        // Einreichungen
        wikiEinreichungen = mongoClient.db("Einreichungen").collection("Wikieintraege");
        // Wiki
        vogelarten = mongoClient.db("Wiki").collection("Vogelarten");
        wikiAufnahmen = mongoClient.db("Wiki").collection("Aufnahmen");
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
                case "/submitArticle": // Artikel einreichen
                    wikiEinreichungen.insertOne(urlWithQuery.query);
                    break;
                case "/zeigeEinreichungen": // Vogelarten zeigen
                    _response.write(JSON.stringify(await wikiEinreichungen.find().toArray()));
                    break;
                case "/includeArticle": // Artikel aufnehmen
                    wikiAufnahmen.insertOne(urlWithQuery.query);
                    break;
                case "/removeOne": // 1 Artikel löschen
                    wikiEinreichungen.deleteOne({ "_id": objID });
                    break;
                case "/zeigeVogelarten": // Vogelarten zeigen
                    _response.write(JSON.stringify(await vogelarten.find().toArray()));
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