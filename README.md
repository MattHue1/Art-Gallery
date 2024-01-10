Author name: Chi Kong Matthew Hui
Author ID: 101261612
Project Name: Open Gallery
Course Number: COMP 2406B

Youtube Link: 

List of Files and purpose:
addArt.js: add art to database
addWorkshop.js: add workshop to database
art.js: allow user to add reviews and likes to art
atist.js: allow user to follow the artist
createAccount.js: create a new account for user
login.js: login for user
search.js: search for artwork that march what user enter
styles.css: the styling of the webpage
user.js: allow user to unfollow and remove reviews and like
workshop.js: allow user to enroll in workshop
addArt.pug: template engine for adding artwork
addWorkshop.pug: templaye engine for adding workshop
art.pug: template for art
artist.pug: template for artist
artistList.pug: template for list for artist
artList.pug: template for list of art
createAccount.pug: template for creating account
header.pug: links to different page
Home.pug: template for home page
login.pug: template for login page
search.pug: template for search page
user.pug: template for user profile
workshop.pug: template for workshop
workshoplist.pug: template for list of workshop
ArtistRoute.js: route for all url with "/artist"
FollowRoute.js: route for all url with "/follow"
GalleryRoute.js: route for all url with "/gallery"
LikeRoute.js: route for all url with "/like"
ReviewRoute.js: route for all url with "/review"
UserRoute.js: route for all url with "/user"
WorkshopRoute.js: route for all url with "/workshop"




Instructions on how to activate the website on openstack
1. Go to http://134.117.130.217:3000/

Instructions on how to activate the website on localhost:3000
1. Locate the file in the folder
2. type npm install 
5. After everything is install enter node database-initializer.js
6. After all the supplies is load into the database enter node server.js
7. Go to http://localhost:3000

Stylistic Design Decisions:
Div is use to seperate differnt parts of the website clearly
different colour is used to make the website more colourful

Extra functionality:
Allow the user to search for workshop
Adding a workshop use regex to insure proper format is enter

Error that can crash my code:
There is no error that I found can crash my code, I have handle all the edge cases.

    