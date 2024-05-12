# React Movies App

App to retrieve movie details from TMDB and also provide some additional functionality by integrating with an AWS backend.

## Functionality added for assignment 2

- Login page - which when submitted retrieves a token from AWS to allow access
- Logout page
- Playlist management - users can adds playlists and see what movies they contain. Data for this is persisted to DynamoDB.
- New 'Add to playlist' action - users can add favourited movies to playlists via a new action.
- New 'Cast' page provided which lists everyone that worked on the movie. This is accessible via a button on the movie card.
- Restricted navigation - logged out users see a subset of options. Logged in users get more. Attempts to access restricted routes returns the user to the homepage
- Back/forward navigation arrows now working on header
