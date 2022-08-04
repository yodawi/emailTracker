const express = require('express');
const functions = require('firebase-functions');
const crypto = require('crypto');
const requestIp = require('request-ip');


const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { initializeAppCheck } = require("firebase-admin/app-check");
const { firestore } = require("firebase-admin");

initializeApp({
    // ADD YOU SERVICE ACCOUNT HERE !
	credential: credential.cert({
		"type": "",
		"project_id": "",
		"private_key_id": "",
		"private_key": "",
		"client_email": "",
		"client_id": "",
		"auth_uri": "",
		"token_uri": "",
		"auth_provider_x509_cert_url": "",
		"client_x509_cert_url": ""
	})
});

// ADD THE HTTPS ENDPOINT FOR YOUR FIREBASE FUNCTION
const serviceUrl = '' //ex:  https://us-central1-project.cloudfunctions.net'

const app = express();
app.use(express.json());
app.use(requestIp.mw())


app.get("/create/:email", (req, res, next) => {
	try {
	    const email = req.params.email
        console.log(email)
        const tag = crypto.randomBytes(10).toString('hex')

        firestore().collection('openTrack').doc(tag).set({
            email: email,
            creation: firestore.Timestamp.now(),
        })

        res.send(`<a>${tag}</a><br/><img src="${serviceUrl}/api/opened/${tag}.jpg"/>`)
        return
    } catch (err) {
		console.log(err)
        res.status(400)
			.send('bad request.')
			.end()
	}
});

app.get("/opened/:tag", (req, res, next) => {
	try {
        const ip = req.clientIp
	    const tag = req.params.tag.substring(0, req.params.tag.length-4)

        console.log(tag)
        console.log(ip)

        firestore().collection('openTrack').doc(tag).collection('opens').doc().set({
            origin: ip,
            creation: firestore.Timestamp.now(),
        })

        res.sendFile(__dirname + '/img.jpg')
        return
    } catch (err) {
		res.status(400)
			.send('bad request.')
			.end()
	}
});



app.listen(5011)
exports.api = functions.https.onRequest(app);
