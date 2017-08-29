var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs')

var app = express();

var questions = {
  'coronado-bridge':{
    question: "Who was the first person to ever drive over the Coronado bridge?",
    answer: "Ronald Reagan"
  },
  'hotel-del':{
    question: "What is the largest wooden structure in the United States?  (Hint, its located in San Diego)",
    answer: "Hotel Del Coronado"
  },
  'san-diego-county-fair':{
    question: "What was the original name of the San Diego County Fair?",
    answer: "Del Mar Fair"
  },
  'mission-bay':{
    question: "How many visitors come to Mission Bay Park every year?",
    answer: "More than 5 million"
  },
  'la-jolla-playhouse':{
    question: "What famous actor founded the La Jolla Playhouse?",
    answer: "Gregory Peck"
  }
};

//tell Express that well keep files in the /public directory
//recognize this is a middleware function - as are all things in express
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

// see ejs templating site http://www.embeddedjs.com
// ejs uses erb-like <%= %> tags to execute js code
app.set('view engine', 'ejs');

// just like yesterday, our router at work taking in a requested address and mapping it to the appropriate response
// ... but in this case the respose is a page, not simple text
//notice the change from "send" to "render"
// app.get('/', function (request, response) {
//     response.render('index');
// });

app.get('/', function (request, response) {
  response.render('index', {'questions': questions});
});

app.get('/hello/:text', function (request, response) {
    var text = request.params['text'];
    response.send('Hello ' + text);
});

app.get('/trivia/:question', function(request, response){
  var questionKey = request.params.question;
  var triviaQuestion = questions[questionKey];
  response.render('trivia-question', {'question': triviaQuestion.question, 'answerkey': questionKey});
});

app.get('/trivia/answer/:question', function(request, response){
  var questionKey = request.params.question;
  var triviaQuestion = questions[questionKey];
  response.render('trivia-answer', {'question': triviaQuestion.question, 'answer': triviaQuestion.answer});
});

app.get('/form', function(request, response){
    response.render('simple-form');
});

app.post('/day-update', function(request, response){
  let responses = request.body
  var dayUpdates = undefined;

  //open the data.json file, and parse into a JSON Object
  var rawFile = fs.readFileSync('data.json')
  var dayUpdates = JSON.parse(rawFile);

  dayUpdates.push(responses)

  //time to save the data back to disk
  fs.writeFileSync('data.json', JSON.stringify(dayUpdates))

  response.render('day-update', { responses: dayResponses } )
})

// extra notes: Express knew to automatically look in the /views directory for our template. Notice that we left off the file extension. Express knows what type of file we are looking for because we declared EJS as our template engine above.

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
