const { response } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const https = require("https");
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

//Importing date,time from utils folder
const date = require(__dirname+"/utils/day.js");
const time = require(__dirname+'/utils/time.js');

//Setting initial deta to empty string
let cityname = "" ;
let country = "" ;
let icon_url = "" ;
let desc = "";
let feels = "";

app.set('view engine','ejs');

app.get('/',function(req,res){
        res.locals.date = date.getday();
        res.locals.time =time.getTime();
        res.locals.cityname = cityname;
        res.locals.country = country;
        res.locals.icon_url = icon_url;
        res.locals.description = desc ; 
        res.locals.feels = feels;
        res.render("home");
    
})


app.post('/',function(req,res){
    const baseurl = "https://api.openweathermap.org/data/2.5/weather?q=";
    const key = "YOUR_SECRET_KEY" ;
    const metrics = "&units=metric" ; 
    cityname = req.body.city;
  

    let url = baseurl + cityname + key + metrics;


    const request = https.get(url,function(response){
      
        response.on('data', (chunk) => {
          
            let info = JSON.parse(chunk);
            // console.log(info);

            //Error code are above 400 ,bydefault JSON parsed data is string
            //For comparison of error code , first change to Int via ParseInt
            let errorcode = parseInt(info.cod);

            //IF ERROR
            if(errorcode>=400) {
                // console.log('Error');
                cityname="INVALID CITY ";
                icon_id = "";
                desc = "";
                feels="";
                icon_url="";
                country ="";
                res.redirect('/');
            }


            else{
                cityname = cityname.toLocaleUpperCase() + ' ,';
                country = info.sys.country;
                icon_id = info.weather[0].icon;
                desc = (info.weather[0].description).toLocaleUpperCase();
                feels = info.main.feels_like + ' °C';
                icon_url = "http://openweathermap.org/img/wn/" + icon_id + "@4x.png";
                res.redirect('/');
            }
          });

          
    });
    request.end();
    
});

app.listen(port,()=>console.log(`Listening at ${port}`));
