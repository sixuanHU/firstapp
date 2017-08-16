var http =require('http');
// var express = require('express');
// var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({ extended:false });
//
// var app = express();

var server = http.createServer()
// app.post('/save-subscription/',urlencodedParser,function(req,res){
//   // res.set('Content-Type', 'text/plain')
//   // res.send('You sent'+req.body)
//   console.log('yayy');
//   // res.redirect('/');
// })

// .lisen(8080);

// http.post('/save-subscription/', function (req, res) {
//   if (!isValidSaveRequest(req, res)) {
//     return;
//   }});

server.listen(8080);
//
//   return saveSubscriptionToDatabase(req.body)
//   .then(function(subscriptionId) {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify({ data: { success: true } }));
//   })
//   .catch(function(err) {
//     res.status(500);
//     res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify({
//       error: {
//         id: 'unable-to-save-subscription',
//         message: 'The subscription was received but we were unable to save it to our database.'
//       }
//     }));
//   });
// });
