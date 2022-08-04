# emailTracker
A free and opensource email tracker

You can use openTrack to check everyone who has opened your email (incluiding fowarded emails).

# Usage
You make a request (thru a browser) to the `/create/:email` replacing `:email` with the email adress of your receipient, and you will get back a webpage including the tag id (used for tracking identification) and a 1x1 white pixel image that is atually the `/opened/:tag` endpoint with a '.jpg' after the tag id.


You then copy the whole page (mac: `cmd+a` then `cmd+c` | windows: `ctrl+a` then `ctrl+c`) and paste it into your email body. You can delete the tag id tag.


Whenever the email is opened the img is downloaded and we record the IP of the requester and save it to the Firestore database. This way we are able to know if you made the request or your receipient.
