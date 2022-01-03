const express = require('express')
const app = express()

const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql')

const faker = require('faker');

app.get('/', (req, res) => {
  const connection = mysql.createConnection(config)
  const sqlForCreateTable = "CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT, name varchar(255), PRIMARY KEY(id))"
  connection.query(sqlForCreateTable)

  const randomName = faker.name.firstName()
 
  const sqlForInsert = `INSERT INTO people(name) values('${randomName}')`
  connection.query(sqlForInsert)
  
  const sqlForSelect = `SELECT * FROM people`;
  connection.query(sqlForSelect, (err, results, fields) => {
    if (err) throw err;
    let people = [];

    for (let index = 0; index < results.length; index++) {
      const element = results[index];
      people.push({ name: element.name, id: element.id })
    }

    return res.send(`
    <h1>Full Cycle Rocks!</h1>
  
    <ul>
      ${people.map((people => `<li>${people.name}</li>` ))}
    </ul>
    `)
  });  
})

app.listen(port, () => {
  console.log('Running on port ' + port)
})
