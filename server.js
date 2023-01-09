const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

//items in the global namespace are accessible throught out the node application
global.db = new sqlite3.Database('./database.db',function(err){
  if(err){
    console.error(err);
    process.exit(1); //Bail out we can't connect to the DB
  }else{
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
  }
});


const articleRouter = require('./routes/articles');

//set the app to use ejs for rendering
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

  const articles = [{
    title: 'Test Article 1',
    createdAt: new Date(),
    description: 'Test description 1'
  },

  {
    title: 'Test Article 2',
    createdAt: new Date(),
    description: 'Test description 2'
  }];

  res.render('articles/index', {articles: articles})
});

//this adds all the articleRouter to the app under the path /articles
app.use('/articles', articleRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

