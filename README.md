
Funny Movies
==============

Funny Movies is a web application that allows users to share YouTube videos with each other. Users can add videos by pasting a YouTube URL into a form, and other users can view and rate those videos.

Technologies Used
-----------------

Funny Movies is built using the following technologies:

*   React.js for the front-end
*   Ruby on Rails for the back-end
*   PostgreSQL for the database

Installation and Usage
----------------------

To install and run Funny Movies, follow these steps:

1.  Clone the repository to your local machine.
2.  Install the necessary dependencies by running `npm install` in the root directory and `bundle install` in the root directory.
3.  Create a new PostgreSQL database by running `rails db:create`.
4.  Run the database migrations by running `rails db:migrate`.
5.  Copy env.example to .env and config with your setting.
6.  Start the Rails server by running `rails s`.
7.  Start the React development server by running `npm start` in the root directory.
8.  Navigate to `http://localhost:3001` in your web browser to use the application.

Features
--------

*   Users can add YouTube videos to the application by pasting in a URL.
*   Videos are displayed on the home page along with the title, uploader, and a short description.
*   Users can view videos in a player embedded in the page.
*   The most recently added videos are displayed on the home page.

Contributing
------------

If you would like to contribute to Funny Movies, please fork the repository and submit a pull request. Please follow the project's coding style and conventions, and write unit tests for any new functionality.

License
-------
Funny Movies is released under the MIT License.
