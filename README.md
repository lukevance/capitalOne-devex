# Get me out of here!

"Get me out of here!" is your escape valve for life!

Ask Alexa for a lifeline and get personalized recommendations for a relaxing vacation.

```(╯°□°）╯︵ ┻━┻)```


## Dev Setup

Prerequisites

* node, npm, aws cli
* s3 bucket


### Create an AWS Lambda

* Log into [console.aws.amazon.com](https://console.aws.amazon.com/lambda/home) and create a new Lambda. Make sure you're in N. Virginia region!
* zip it and push it to s3 (see bash script `zipAndPush`; replace the `s3_bucket` as necessary)
* get the ARN from the top right corner, it'll be something like `arn:aws:lambda:us-east-1:567827005632:function:getMeOutOfHere` - will be used in the Alexa Skill

### Create an Alexa Skill

* Log into [developer.amazon.com](https://developer.amazon.com/edw/home.html#/) and create a new Alexa Skills Kit skill

```
Name: Get Me Out of Here
Invocation Name: get me out of here
```

* Using Skill Builder, add a new custom Intent called `getMeOutOfHere`
* add in utterances
* Build Model (wait for this to complete)
* Configure with an Endpoint, an ARN, from above




