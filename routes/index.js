const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const router = express.Router();

const cert_pub = fs.readFileSync( "rsa-public-key.pem");
const cert_priv = fs.readFileSync( "rsa-private.pem");


router.get("/redirect", (req, res) => {
//   res.send("Hello World!!");
  res.redirect("http://localhost:3000/auth")
});

router.post("/getToken", (request, response) => {
  // generate our token with the appropiate information and sign it with our private RSA key.
  var token = jwt.sign(
    {
      iss: "http://localhost:3000",
      sub: "test23kfnnfnf",
      acr: "loa1",
      lp_sdes: [
        {
          type: "personal", //MANDATORY
          personal: {
            firstname: "Steve", // FIRST NAME
            lastname: "Rogers", // SURNAME
            // age: {
            //   age: 23, // AGE AS INTEGER
            //   year: 1998, // BIRTH YEAR
            //   month: 7, // BIRTH MONTH
            //   day: 4, // BIRTH DAY
            // },
            contacts: [
              {
                email: "krosales@liveperson.com", // EMAIL
                phone: "+1 123-456-7890", // PHONE NUMBER
              },
            ],
            gender: "MALE", // MALE, FEMALE, OTHER
            language: "en-US", // LANGUAGE
            company: "LP", // VISITOR COMPANY NAME
          },
        },
        {
          type: "ctmrinfo", //MANDATORY
          info: {
            // cstatus: "cancelled", //CUSTOMER LIFECYCLE STATUS. FROM PRE-DEFINED LIST
            ctype: "vip", //CUSTOMER TYPE OR TIER. FROM PRE-DEFINED LIST
            customerId: "13866AC", //UNIQUE CUSTOMER IDENTIFIER
            balance: -400.99, //THE CUSTOMER FINANCIAL BALANCE IN DECIMAL VALUE
            currency: "USD", //CURRENCY CODE
            socialId: "11256324780", //SOCIAL ID OF YOUR CHOICE: FACEBOOK, TWITTER
            imei: "3543546543545688", //UNIQUE DEVICE OR PHONE IDENTIFIER
            userName: "user000", //CONSUMER NICKNAME OR USERNAME
            companySize: 500, //COMPANY SIZE MEASURED BY NUMBER OF EMPLOYEES
            companyBranch: "305007", //THE CUSTOMER'S COMPANY BRANCH NAME
            accountName: "bank corp", //THE CUSTOMER'S COMPANY NAME
            role: "broker", //CONSUMER ROLE TITLE
            lastPaymentDate: {
              day: 15, //THE DAY OF THE LAST PAYMENT NUMERIC VALUE
              month: 10, //THE MONTH OF THE LAST PAYMENT NUMERIC VALUE
              year: 2014, //THE YEAR OF THE LAST PAYMENT NUMERIC VALUE
            },
            registrationDate: {
              day: 23, //THE DAY OF THE REGISTRATION NUMERIC VALUE
              month: 5, //THE MONTH OF THE REGISTRATION NUMERIC VALUE
              year: 2013, //THE YEAR OF THE REGISTRATION NUMERIC VALUE
            },
            storeNumber: "123865", //STORE NUMBER NOT SUPPORTED BY AUTH FLOW
            storeZipCode: "20505", //STORE ZIP CODE NOT SUPPORTED BY AUTH FLOW
          },
        },
      ],
    },
    cert_priv,
    { algorithm: "RS256", expiresIn: "1h" }
  );

  // console.log("TOKEN",token);

  // verify that the token was generated correctly
  jwt.verify(token, cert_pub, function (err, decoded) {
    // if the token didn't generate then respond with the error
    if (err) {
      console.log("ERROR jwt.verify", err);
    }

    // if successful then response with the token
    else {
      // console.log("decoded!",decoded);
      response.json({
        decoded: decoded,
        token: token,
      });
    }
  });
});

module.exports = router;
