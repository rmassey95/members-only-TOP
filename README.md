# Members Only Message App

App built as part of an Odin Project assignement. The app operates as a type of exclusive clubhouse where members can write anonymous posts. Members of the app can also see who the author of posts is. Non-members can only see the post and not who the author is. To become a member the user must enter the secret password `Passcode`.

The app makes use of Express and passportJS authentication to save users to a mongoDB. The database also stores the content for the posts.

## Usage

To open the app, run `npm install` to download the packages and run `npm start` to start the server. I have removed my MongoDB URI from the app for seurity reasons so the database connection will not work unless you set it up yourself.
