const getRewards = require('./rewardsData.js')();

// Sample Response from rewards/accounts
const rewardsAccounts = getRewards.accounts;

// sample response from /rewards/accounts/:id
const rewardsDetails = getRewards.details;


// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

var languageStrings = {
    'en': {
        'translation': {
            'WELCOME': "Welcome to your great escape!",
            'TITLE': "Get me out of here",
            'HELP': "This skill will recommend a great vacation based on your Capital One rewards.",
            'STOP': "Okay, see you next time! ",
            'WORKING': "I'm checking flight prices for you!"
        }
    }
    // , 'de-DE': { 'translation' : { 'WELCOME'   : "Guten Tag etc." } }
};
var data = {
    "destinations": [
        { "name": "maui", "miles": "20000", "type": "beach" },
        { "name": "los angeles", "miles": "10000", "type": "urban" },
        { "name": "orlando", "miles": "15000", "type": "beach" },
        { "name": "toronto", "miles": "30000", "type": "cold" },
        { "name": "portland", "miles": "20000", "type": "cold" },
        { "name": "anchorage", "miles": "30000", "type": "cold" },
        { "name": "chicago", "miles": "10000", "type": "urban" },
        { "name": "new york", "miles": "20000", "type": "artsy" },
        { "name": "vancouver", "miles": "30000", "type": "artsy" },
        { "name": "albuquerque", "miles": "10000", "type": "mountains" },
        { "name": "houston", "miles": "15000", "type": "urban" },
        { "name": "nashville", "miles": "12000", "type": "artsy" },
        { "name": "DC", "miles": "20000", "type": "east" },
        { "name": "charlotte", "miles": "10000", "type": "mountains" },
        { "name": "st louis", "miles": "15000", "type": "urban" },
        { "name": "san francisco", "miles": "20000", "type": "artsy" },
        { "name": "salt lake city", "miles": "10000", "type": "mountains" },
        { "name": "las vegas", "miles": "15000", "type": "urban" },
    ]

};

var welcomeCardImg = {
    smallImageUrl: 'https://s3.amazonaws.com/capitalone-hackathon/tableflip.png',
    largeImageUrl: 'https://s3.amazonaws.com/capitalone-hackathon/tableflip.png'
};
// 2. Skill Code =======================================================================================================

var Alexa = require('alexa-sdk');

var AWS = require('aws-sdk'); // this is defined to enable a DynamoDB connection from local testing
var AWSregion = 'us-east-1'; // eu-west-1
AWS.config.update({
    region: AWSregion
});

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
    // alexa.dynamoDBTableName = 'RecipeSkillTable'; // creates new table for session.attributes

    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();

};

function resolveUrgency(phrase) {
    // arrays
    let low = ['whenever', 'in a month', 'in a few months', 'later'];
    let high = ['now', 'immediately', 'tomorrow', 'this week', 'today'];

    let urgency = "medium";
    if (low.indexOf(phrase) >= 0) {
        urgency = "low";
    } else if (high.indexOf(phrase) >= 0) {
        urgency = "high";
    }
    return urgency;
}

var handlers = {
    'LaunchRequest': function() {
        //TO DO: add options for random selection
        let prompt = ' How soon are you trying to get out?';

        var say = this.t('WELCOME') + ' ' + this.t('HELP') + prompt;
        this.emit(':askWithCard', say, say, this.t('TITLE'), this.t('WELCOME'), welcomeCardImg);
    },
    'TimeframeIntent': function() {
        let phrase = this.event.request.intent.slots.when.value;

        let urgency = resolveUrgency(phrase);
        // get number of locations for when value
        let numOfOptions;
        switch (urgency) {
            case "high":
                // get 1-3 destinations
                numOfOptions = getRandomInt(1, 4);
                break;
            case "med":
                // get 5-10 destinations
                numOfOptions = getRandomInt(4, 10);
                break;
            case "low":
                // get lots of destinations
                numOfOptions = getRandomInt(8, 40);
            default:
                numOfOptions = 1;
                break;
        }
        // get Destinations
        let destAttr = data.destinations.map(dest => dest.type);
        let uniqueAttributes = uniqueFromArray(destAttr).splice(0, numOfOptions);

        let question = "What kind of destination would you like? ";

        if (numOfOptions === 1) {
            let youAreGoing = randomArrayElement(data.destinations);
            this.emit(':ask', 'Based upon your Capital One Rewards, you can go to ' + youAreGoing.name + ' this week!');
        } else if (numOfOptions > 1) {
            this.emit(':ask', 'Based upon your Capital One Rewards, I found ' + numOfOptions + ' destinations for you to get to this week. What kind of destination would you like? You can say ' + sayArray(uniqueAttributes, "or"));
        }
    },
    'LocationSearch': function() {

        function okDestinationPhraseOptions(destination) {
            // list of phrases
            var okDestinations = [
                "fantastic, let's go to " + destination + "!",
                "Ok, let's do this! " + destination + ", here we go!",
            ];
            return randomArrayElement(okDestinations);
        }

        let destAttribute = this.event.request.intent.slots.type.value;
        let filteredDests = [];
        data.destinations.forEach(dest => {
            if (dest.type === destAttribute) {
                filteredDests.push(dest);
            }
        });

        let destination = randomArrayElement(filteredDests);

        this.emit(':askWithCard', okDestinationPhraseOptions(destination.name) + " You are spending " + destination.miles + " of your rewards miles. Tickets are on their way!");
    },
    'AMAZON.YesIntent': function() {

        this.emit('AMAZON.NextIntent');

    },
    'AMAZON.NoIntent': function() {

        this.emit(':tell', 'Okay, see you next time!');
    },
    'AMAZON.PauseIntent': function() {
        this.emit(':tell', 'Okay, you can come back to this skill to pick up where you left off.');
    },
    // 'AMAZON.RepeatIntent': function() {
    //     if (!this.attributes['currentStep']) {
    //         this.attributes['currentStep'] = 1;
    //     } else {
    //         this.attributes['currentStep'] = this.attributes['currentStep'] - 1;
    //     }

    //     this.emit('AMAZON.NextIntent');

    // },
    'AMAZON.HelpIntent': function() {
        this.emit(':ask', this.t('HELP'));
    },
    'AMAZON.StartOverIntent': function() {
        this.emit('LaunchRequest');
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', this.t('STOP'));
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', this.t('STOP'));
    },
    'SessionEndedRequest': function() {
        console.log('session ended!');
        this.emit(':saveState', true);
    }

};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function sayArray(myData, andor) {
    //say items in an array with commas and conjunctions.
    // the first argument is an array [] of items
    // the second argument is the list penultimate word; and/or/nor etc.

    var listString = '';

    if (myData.length == 1) {
        //just say the one item
        listString = myData[0];
    } else {
        if (myData.length == 2) {
            //add the conjuction between the two words
            listString = myData[0] + ' ' + andor + ' ' + myData[1];
        } else if (myData.length == 4 && andor == 'and') {
            //read the four words in pairs when the conjuction is and
            listString = myData[0] + " and " + myData[1] + ", as well as, " +
                myData[2] + " and " + myData[3];

        } else {
            //build an oxford comma separated list
            for (var i = 0; i < myData.length; i++) {
                if (i < myData.length - 2) {
                    listString = listString + myData[i] + ', ';
                } else if (i == myData.length - 2) { //second to last
                    listString = listString + myData[i] + ', ' + andor + ' ';
                } else { //last
                    listString = listString + myData[i];
                }
            }
        }
    }

    return (listString);
}

function randomArrayElement(array) {
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return (array[i]);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function uniqueFromArray(redundantArray) {
    return [...new Set(redundantArray)];
}