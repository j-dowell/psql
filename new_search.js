const input = process.argv[2];
const settings = require("./settings"); // settings.json

var knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password : settings.password,
      database : settings.database
    }
  });


knex.select('*').from('famous_people')
.where('first_name', '=', input)
.asCallback(function(err, rows) {
    if (err) {
        return console.error(err);
    } else {
    console.log('Searching...');
    console.log(`Found ${rows.length} person(s) by the name ${input}`)
    infoPrinter(rows);
    }
  })
.finally(function() {
    knex.destroy();
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