const input = process.argv[2];
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1", [input], (err, result) => {
      console.log("Searching...")
      console.log(`Found ${result.rows.length} person(s) by the name ${input}`)
    if (err) {
      return console.error("error running query", err);
    }
    infoPrinter(result.rows);
    client.end();
  });
});


function infoPrinter(array) {
    if (array) {
        let count = 1;
        array.forEach(function(item) {
            console.log(`${count} - ${item.first_name} ${item.last_name}, born ${item.birthdate.toDateString()}`);
            count++;
        })
    } else {
        console.log('No results');
    }
}