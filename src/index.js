const express = require("express");
const path = require("path");
const hbs = require("hbs");
const request = require('request');
const app = express();

const staticPath = path.join(__dirname, "../public"); 
//directory path name of templates
const templatePath = path.join(__dirname, "../templates/views"); 
const partialsPath = path.join(__dirname, "../templates/partials"); 
//building middleware
//app.use(express.static(staticPath));

app.set("view engine", "hbs");
//css path
app.use(express.static('.'));
//change directory views name and define own path or name
app.set("views", templatePath);
hbs.registerPartials(partialsPath);
app.get('/', (req, res) => {
  res.render('index', {
    nameThis : "Gaurav Sharma",
    title    : "Home",
  });
});

app.get('/about', (req, res) => {
  const queryStrVal = req.query;


  const requestOptions = {
    url: `http://api.openweathermap.org/data/2.5/weather?q=${queryStrVal.name}&appid=d10dd1a6be922645de6cc1b238b5dac9`,
    method: 'GET',
    json: {},
    qs: {
      offset: 20
    }
  };
  request(requestOptions, (err, response, body) => {
    if (err) {
      console.log(err);
    } else if (response.statusCode === 200) {
      console.log(body);
      res.render('about', {
        title : "About",
        city  : body.name,
        temp : body.main.temp,
      });
    } else {
      console.log(response.statusCode);
    }
  });
  
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title : "Contact",
  });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/about', (req, res) => {
  res.send('This is a about page');
});


app.get('/about/*', (req, res) => {
  
  
  res.render('404', {
    title : "404",
    message : "The About Page You Are Looking For Doesn't Exist.",
    back : "Back To Home Page",
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title : "404",
    message : "The Page You Are Looking For Doesn't Exist.",
    back : "Back To Home Page",
  });
});

app.listen(3000, () => {
    console.log("liting the port at 3000");
})
