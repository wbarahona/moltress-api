# moltress-api

The design of my application bootstrap consists of the ``/app/`` directory which contains the api folder, allowing for a client folder where you may build the front end application using your technology stack of choice and within there consume the api. Alongside there is a ``/config/`` folder where any global configurations must be defined, the application's API manifest is declared inside.

This mini framework is designed to work with **Firebase** and [firebase-admin](https://www.npmjs.com/package/firebase-admin) as a database service, keeping in mind that you could perfectly modify it as needed, and connect to something else (i.e. A Mongodb instance). For Firebase, you need the serviceAccountKey.json generated automatically by [Firebase](https://firebase.google.com/docs/admin/setup), in the admin, for this application management; this file goes to _./app/config/credentials/**serviceAccountKey**.json_. 
_**Observation 1:** The document is not included in the repo because of reasons._
_**Observation 2:** Firebase service account key has a long hashed name. Rename it to serviceAccountKey.json so the framework can pick it up, and work with the your firebase application._

Read the full article [here](http://wbarahona.me/hapi-mech-framework-for-firebase/).