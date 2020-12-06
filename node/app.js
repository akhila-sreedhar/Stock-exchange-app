var express = require('express')
var app = express()
var request = require('request')
const cors = require('cors');
//const newsapi = new NewsAPI('8a56f5ee55814b13940b20f023103676');
var connect = require("connect");
app.use(cors());
const port = 8080

//var datetime = new Date();
//var dateinp = datetime.toISOString().slice(0,10);


app.get('/search/:stock',function(req,res) {
var requestOptions = {
        'url': 'https://api.tiingo.com/tiingo/daily/' +req.params.stock+ '?token=4384f3e3de1ccddb51805eaf956b71edb0e7b25c',
        'headers': {
            'Content-Type': 'application/json'
            }
        };

request(requestOptions,
        function(error,response, body) {
            console.log(body);
            res.send(body);
       }
)

});  

app.get('/autocomplete/:stock',function(req,res) {
    var requestOptions = {
            'url': 'https://api.tiingo.com/tiingo/utilities/search?query='+req.params.stock+'&token=4384f3e3de1ccddb51805eaf956b71edb0e7b25c',
            'headers': {
                'Content-Type': 'application/json'
                }
            };
    
    request(requestOptions,
            function(error,response, body) {
                console.log(body);
                res.send(body);
           }
    )
    
    });    

app.get('/find/:stock',function(req,res) {
    var requestOptions = {
            'url': 'https://api.tiingo.com/iex?tickers=' +req.params.stock+ '&token=4384f3e3de1ccddb51805eaf956b71edb0e7b25c',
            'headers': {
                'Content-Type': 'application/json'
                }
            };
    
    request(requestOptions,
            function(error,response, body) {
                console.log(body);
                res.send(body);
           }
    )
    
    });   

app.get('/chart/:ticker', (req,res) => {
  var startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 2);
  startDate = startDate.toISOString().split('T')[0];
  request('https://api.tiingo.com/iex/' + req.params.ticker + '/prices?startDate=' + startDate + '&resampleFreq=12hour&columns=open,high,low,close,volume&token=4384f3e3de1ccddb51805eaf956b71edb0e7b25c', { json: true }, (err, response, body) => {
    if (err) 
      { return console.log(err); }
    res.send(body);
    });
});

     app.get('/news/:stock',function(req,res) {
         var requestOptions = {
                  'url': 'https://newsapi.org/v2/everything?apiKey=8a56f5ee55814b13940b20f023103676&q=' +req.params.stock ,
                  'headers': {
                      'Content-Type': 'application/json'
                     }
                  };
        
          request(requestOptions,
                  function(error,response, body) {
                     console.log(body);
                      res.send(body);
                 }
          )
        
          });        
           
app.listen(port, function (error) {
	if(error){
    console.log('Something went wrong', error)
}
else {
        console.log('Server is listening on port' + port)
    }
})



module.exports=app