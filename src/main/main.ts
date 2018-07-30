import r = require("rethinkdb");
import * as fs from "fs";

const query = async () => {
    var conn = await r.connect({db: 'zerodha', host:'localhost', port: 28015});
    console.log("Connected");
    var cursor = await r.table('feed').filter({
        underlying: 'NIFTY',
        tradeDate:20180727
    }).run(conn);
    return cursor.toArray();
}

const asJSON = async(name, response) => {
    await fs.writeFile('data/'+name, JSON.stringify(response), 'utf8', console.log);
}
export const main = async () => {
    const results = await query();
    await asJSON('20180727_NIFTY.json', results);
    return;
}
main().then(console.log);

import repl = require("repl");

/**var replServer = repl.start({
  prompt: "my-app > ",
});**/