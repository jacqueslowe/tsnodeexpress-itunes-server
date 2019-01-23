import * as express from 'express'
import * as request from 'request'
import ItemModel from './ItemModel'

class App {
    public express

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: "Hello: usage 'http://localhost:3000/music?term=boston' where 'boston' is the album, song, artist your looking for"
            })
        });
        router.get('/music', (req, res) => {
            const itunesUrl = 'https://itunes.apple.com/search?';
            const limit = "&limit=25";
            const term = (req.query.term) ? req.query.term : "boston";
           // const term = "boston";
            const urlExtras = 'term=' + term + limit;

            request(itunesUrl + urlExtras, { json: true }, function (err, response, body) {
                if (body) {
                    console.log('GET music: success');
                    res.writeHead(200);
                    var items = [];
                    for (var i = 0, len = body.results.length; i < len; i++) {
                        let item = new ItemModel(
                            body.results[i].artistName,
                            body.results[i].trackName,
                            body.results[i].genre,
                            body.results[i].artworkUrl30,
                            body.results[i].artworkUrl100,
                            body.results[i].previewUrl
                        );
                        items.push(item);
                    }
                    res.write(JSON.stringify(items));
                    res.end();
                    return;
                }
                if (err) {
                    console.log('GET music: error');
                    res.writeHead(500);
                    res.write("an error occurred: " + err);
                    res.end();
                    console.log(err);
                    return;
                }

            });
        });

        this.express.use('/', router)
    }
}

export default new App().express