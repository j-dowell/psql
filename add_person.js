const input = process.argv.slice(2);
const first = input[0];
const last = input[1];
const birth = input[2];

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

knex('famous_people')
.insert({first_name : first, last_name : last, birthdate : birth })
.asCallback(function(err, rows) {
    if (err) {
        console.log('error');
        return err;
    } else {
        knex.select('*').from('famous_people')
        .asCallback(function(err, rows) {
            if (err) {
                console.log('error');
                return err;
            } else {
                console.log(`Added ${first} ${last} to the database!`);
                console.log(rows);
            }
        });
    }
})
.finally(function() {
    knex.destroy();
});;

