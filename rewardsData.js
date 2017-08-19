const rewardsAccounts = {
    "rewardsAccounts": [{
            "rewardsAccountReferenceId": "+jaR3Du6APE+x4kQue7NB2l3cLJHm0Rg9qspJbY65DpNtAOoLJnAguw4SVcuOlJuWVrEIiLswYp4ZZ0NX1veFw==",
            "accountDisplayName": "Capital One Visaplatinum Miles *3582",
            "rewardsCurrency": "Miles",
            "productAccountType": "Credit Card",
            "creditCardAccount": {
                "issuer": "Capital One",
                "product": "Visaplatinum",
                "lastFour": "3582",
                "network": "Visa",
                "isBusinessAccount": false
            }
        },
        {
            "rewardsAccountReferenceId": "+jaR3Du6APE+x4kQue7NB76pzE2EghQD5frCU8NquuYUCjno3GzJDe6bKPmH9nruRwMPivkpoT+3PCwGfwJavg==",
            "accountDisplayName": "Capital One Mastercardworldcard Points *4734",
            "rewardsCurrency": "Points",
            "productAccountType": "Credit Card",
            "creditCardAccount": {
                "issuer": "Capital One",
                "product": "Mastercardworldcard",
                "lastFour": "4734",
                "network": "MasterCard",
                "isBusinessAccount": false
            }
        },
        {
            "rewardsAccountReferenceId": "+jaR3Du6APE+x4kQue7NB5B3s8P1SDCKUMnePdqKMMQTh1NOnzYjjwoO7vJ4efuJTXFEosem897LbHrdUjWXw==",
            "accountDisplayName": "Capital One Visasignature Cash *8729",
            "rewardsCurrency": "Cash",
            "productAccountType": "Credit Card",
            "creditCardAccount": {
                "issuer": "Capital One",
                "product": "Visasignature",
                "lastFour": "8729",
                "network": "Visa",
                "isBusinessAccount": false
            }
        }
    ]
};

const rewardsDetails = {
    "accountDisplayName": "Capital One Mastercardworldcard Points *4734",
    "rewardsBalance": 100000,
    "rewardsCurrency": "Points",
    "rewardsCurrencyDescription": "Points",
    "balanceTimestamp": "2016-05-02T22:26:57Z",
    "canRedeem": true,
    "canTransferOut": true,
    "canTransferIn": true,
    "redemptionOpportunities": [{
            "category": "Travel",
            "categoryDescription": "Travel",
            "subCategory": "Travel.Erase",
            "subcategoryDescription": "Travel Reimbursement",
            "displaySequenceNumber": 1.1,
            "minRedemptionAmount": 0,
            "redemptionAmount": 100000,
            "redemptionRate": 0.01,
            "cashValue": 1000,
            "cashDisplayValue": "$1,000.00"
        },
        {
            "category": "Travel",
            "categoryDescription": "Travel",
            "subCategory": "Travel.Booking",
            "subcategoryDescription": "New Travel Purchases",
            "displaySequenceNumber": 1.2,
            "minRedemptionAmount": 0,
            "redemptionAmount": 100000,
            "redemptionRate": 0.01,
            "cashValue": 1000,
            "cashDisplayValue": "$1,000.00"
        },
        {
            "category": "Cash",
            "categoryDescription": "Cash and Credit",
            "subCategory": "Cash.Check",
            "subcategoryDescription": "Check",
            "displaySequenceNumber": 2.1,
            "minRedemptionAmount": 5000,
            "redemptionAmount": 100000,
            "redemptionRate": 0.005,
            "cashValue": 500,
            "cashDisplayValue": "$500.00"
        },
        {
            "category": "Cash",
            "categoryDescription": "Cash and Credit",
            "subCategory": "Cash.Credit",
            "subcategoryDescription": "Account Credit",
            "displaySequenceNumber": 2.2,
            "minRedemptionAmount": 5000,
            "redemptionAmount": 100000,
            "redemptionRate": 0.005,
            "cashValue": 500,
            "cashDisplayValue": "$500.00"
        },
        {
            "category": "Cash",
            "categoryDescription": "Cash and Credit",
            "subCategory": "Cash.Purchase",
            "subcategoryDescription": "New Non-Travel Purchases",
            "displaySequenceNumber": 2.3,
            "minRedemptionAmount": 5000,
            "redemptionAmount": 100000,
            "redemptionRate": 0.005,
            "cashValue": 500,
            "cashDisplayValue": "$500.00"
        },
        {
            "category": "GiftCard",
            "categoryDescription": "Gift Cards",
            "subCategory": "GiftCard.Mail",
            "subcategoryDescription": "Gift Cards",
            "displaySequenceNumber": 3.1,
            "minRedemptionAmount": 2500,
            "redemptionAmount": 100000,
            "redemptionRate": 0.01,
            "cashValue": 1000,
            "cashDisplayValue": "$1,000.00"
        },
        {
            "category": "Charity",
            "categoryDescription": "Charitable Donation",
            "subCategory": "Charity.Donate",
            "subcategoryDescription": "Donation",
            "displaySequenceNumber": 4.1,
            "minRedemptionAmount": 1000,
            "redemptionAmount": 100000,
            "redemptionRate": 0.01,
            "cashValue": 1000,
            "cashDisplayValue": "$1,000.00"
        }
    ],
    "productAccountType": "Credit Card",
    "creditCardAccount": {
        "issuer": "Capital One",
        "product": "Mastercardworldcard",
        "lastFour": "4734",
        "network": "MasterCard",
        "isBusinessAccount": false
    },
    "primaryAccountHolder": {
        "firstName": "TATYANA",
        "lastName": "SCHMIDT"
    }
};

module.exports = () => {
    return {
        accounts: rewardsAccounts,
        rewards: rewardsDetails
    }
}