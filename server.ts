import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Spatzenhrin {

    let orders: Mongo.Collection;

    let port: number = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }

    let databaseUrl: string = "mongodb+srv://Admin:4dm1n_L0g1n@SPATZENHIRN.dvjdj.mongodb.net/Einreichungen?retryWrites=true&w=majority";

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
        orders = mongoClient.db("Eisdiele").collection("Bestellungen");
        console.log("Database connection" + orders != undefined);
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
                case "/send":   // Bestellung absenden
                    orders.insertOne(urlWithQuery.query);
                    break;
                case "/show":   // Bestellungen anzeigen
                    _response.write(JSON.stringify(await orders.find().toArray()));
                    break;
                case "/deleteAll":   // Alle Bestellungen löschen
                    orders.deleteMany({});
                    break;
                case "/addStatusFinished":   // Status einer Bestellung auf "fertig" setzen
                    await orders.updateOne({ "_id": objID }, { $set: { status: "fertig" } });
                    break;
                case "/addStatusDelivered":   // Status einer Bestellung auf "geliefert" setzen
                    await orders.updateOne({ "_id": objID }, { $set: { status: "geliefert" } });
                    break;
                case "/removeOne":   // Eine bestimmte Bestellung löschen
                    await orders.deleteOne({ "_id": objID });
                    break;
                default:
                    _response.write(_request.url);
                    console.log("Pathname didn't match up with any of the cases.");
            }
        }
        _response.end();
    }

}