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
    let vogelhausEinreichungen;
    let bewertungen;
    let kommentare;
    // Shop
    let futter;
    let vogelhaeuser;
    let moebel;
    let deko;
    // Wiki
    let vogelarten;
    let fuetterung;
    let vogelnestVogelhaus;
    let nachwuchs;
    let verletzteVoegel;
    let port = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }
    // remote
    // let databaseUrl: string = "mongodb+srv://Admin:4dm1n_L0g1n@spatzenhirn.uts2e.mongodb.net/Einreichungen?retryWrites=true&w=majority";
    // local
    let databaseUrl = "mongodb://localhost:27017";
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
        vogelhausEinreichungen = mongoClient.db("Einreichungen").collection("Vogelhaeuser");
        bewertungen = mongoClient.db("Einreichungen").collection("Bewertungen");
        kommentare = mongoClient.db("Einreichungen").collection("Kommentare");
        // Shop
        futter = mongoClient.db("Shop").collection("Futter");
        vogelhaeuser = mongoClient.db("Shop").collection("Vogelhaeuser");
        moebel = mongoClient.db("Shop").collection("Moebel");
        deko = mongoClient.db("Shop").collection("Deko");
        // Wiki
        vogelarten = mongoClient.db("Wiki").collection("Vogelarten");
        fuetterung = mongoClient.db("Wiki").collection("Fuetterung");
        vogelnestVogelhaus = mongoClient.db("Wiki").collection("Vogelnest-Vogelhaus");
        nachwuchs = mongoClient.db("Wiki").collection("Nachwuchs");
        verletzteVoegel = mongoClient.db("Wiki").collection("verletzte_Voegel");
        // console.log("Database connection" + orders != undefined);
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
                case "/submitBirdhouse": // Vogelhausbild einreichen
                    vogelhausEinreichungen.insertOne(urlWithQuery.query);
                    break;
                case "/submitReview": // Bewertung einreichen
                    bewertungen.insertOne(urlWithQuery.query);
                    break;
                case "/submitComment": // Kommentar einreichen
                    kommentare.insertOne(urlWithQuery.query);
                    break;
                case "/zeigeVogelarten": // zeigen
                    _response.write(JSON.stringify(await vogelarten.find().toArray()));
                    break;
                /*
                case "/showShopFeed":   // zeigen
                    _response.write(JSON.stringify(await orders.find().toArray()));
                    break;
                */
                /*
                case "/show":   // zeigen
                    _response.write(JSON.stringify(await orders.find().toArray()));
                    break;
                case "/deleteAll":   // Alle Bestellungen löschen
                    orders.deleteMany({});
                    break;
                case "/addStatusFinished":   // Status einer Bestellung auf "fertig" setzen
                    await orders.updateOne({ "_id": objID }, { $set: { status: "fertig" } });
                    break;
                case "/removeOne":   // Eine bestimmte Bestellung löschen
                    await orders.deleteOne({ "_id": objID });
                    break;
                */
                default:
                    _response.write(_request.url);
                    console.log("Pathname didn't match up with any of the cases.");
            }
        }
        _response.end();
    }
})(Spatzenhrin = exports.Spatzenhrin || (exports.Spatzenhrin = {}));
//# sourceMappingURL=server.js.map