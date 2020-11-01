import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Spatzenhrin {

    // Einreichungen
    let wikiEinreichungen: Mongo.Collection;
    // Wiki
    let vogelarten: Mongo.Collection;
    let wikiAufnahmen: Mongo.Collection;


    let port: number = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }

    // remote
    let databaseUrl: string = "mongodb+srv://Admin:4dm1n_L0g1n@spatzenhirn.uts2e.mongodb.net/Einreichungen?retryWrites=true&w=majority";
    // local
    // let databaseUrl: string = "mongodb://localhost:27017";


    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {

        let server: Http.Server = Http.createServer();
        console.log("server starting, port:" + _port);
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }

    async function connectToDatabase(_url: string): Promise<void> {

        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        // Einreichungen
        wikiEinreichungen = mongoClient.db("Einreichungen").collection("Wikieintraege");
        // Wiki
        vogelarten = mongoClient.db("Wiki").collection("Vogelarten");
        wikiAufnahmen = mongoClient.db("Wiki").collection("Aufnahmen");
    }

    function handleListen(): void {
        console.log("Listening");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {

        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let urlWithQuery: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let id: string = <string>urlWithQuery.query["id"];
            let objID: Mongo.ObjectId = new Mongo.ObjectId(id);

            switch (urlWithQuery.pathname) {
                case "/submitArticle":   // Artikel einreichen
                    wikiEinreichungen.insertOne(urlWithQuery.query);
                    break;
                case "/zeigeEinreichungen":   // Vogelarten zeigen
                    _response.write(JSON.stringify(await wikiEinreichungen.find().toArray()));
                    break;
                case "/includeArticle": // Artikel aufnehmen
                    wikiAufnahmen.insertOne(urlWithQuery.query);
                    break;
                case "/removeOne": // 1 Artikel löschen
                    wikiEinreichungen.deleteOne({ "_id": objID });
                    break;
                case "/zeigeVogelarten":   // Vogelarten zeigen
                    _response.write(JSON.stringify(await vogelarten.find().toArray()));
                    break;
                default:
                    _response.write(_request.url);
                    console.log("Pathname didn't match up with any of the cases.");
            }
        }
        _response.end();
    }

}