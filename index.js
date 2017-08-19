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
    // TODO: Replace this data with your own.
    "ingredients": [
        { "name": "bread", "qty": 2, "units": "pieces of" },
        { "name": "egg", "qty": 1, "units": "" },
        { "name": "cheese", "qty": 1, "units": "slice of" }
    ],
    "steps": [
        "Heat a frying pan on your stove over medium heat.",
        "Crack an egg in the skillet and heat until the egg becomes firm.",
        "Flip the egg with a spatula.",
        "Lay the cheese on top of the egg.",
        "Using a spatula, remove egg and cheese and place on one piece of bread.",
        "Place second piece of bread over the egg and cheese.",
        "Serve."
    ]
};

var welcomeCardImg = {
    smallImageUrl: 'https://s3.amazonaws.com/webappvui/img/breakfast_sandwich_small.png',
    largeImageUrl: 'https://s3.amazonaws.com/webappvui/img/breakfast_sandwich_large.png'
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

var handlers = {
    'LaunchRequest': function() {
        //TO DO: add options for random selection
        let prompt = ' How soon are you trying to get out?';

        var say = this.t('WELCOME') + ' ' + this.t('HELP') + prompt;
        this.emit(':askWithCard', say, say, this.t('TITLE'), this.t('WELCOME'), welcomeCardImg);
    },
    'TimeframeIntent': function() {
        let urgency = this.event.request.intent.slots.when.value;

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
        let destOptions = getDestinations
        let destAttr = getDestinations.map(dest)
            // TO DO filter out for unique


        // aggregate attributes off list of destinations
        // if (destinations.length > 1) {
        //     let destOptions = "";
        //     destinations.forEach((dest, i) => {
        //         dest.attributes.forEach(attr => {
        //             if (i < destinations.length + 1){
        //                 destOptions = destOptions + ", " + attr;    
        //             } else {
        //                 destOptions = destOptions + ", or " + attr;
        //             }
        //         });
        //     });
        // }

        let question = "What kind of destination would you like? ";

        if (destOptions.length === 1) {
            this.emit(':ask', 'Based upon your Capital One Rewards, you can go to ' + randomArrayElement(destOptions) + 'this week!');
        } else if (options.length > 1) {
            this.emit(':ask', 'Based upon your Capital One Rewards, I found ' + destOptions.length + ' for you to leave this week' + question + " You can say " + sayArray(destAttr));
        }
    },
    'LocationSearch': function() {
        let destAttribute = this.event.request.intent.slots.kind;

        let destination =



            this.emit(':askWithCard', messageIntro + mileageStatement + confirmBook);
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