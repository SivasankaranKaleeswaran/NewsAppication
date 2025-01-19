**Setup Instructions**

**Step 1: Installation**

After cloning the repository, navigate to the client and server folders separately from the command line, and install the necessary libraries using
npm install / yarn install

Step 2: Environment Configuration
Create an environment file named .env in the client folder and configure the following variable:

makefile
Copy
VITE_API_KEY=<Your_API_Key_Here>
The API key can be obtained by registering at Visual Crossing Weather.

Step 3: Database Setup
Create two tables in your database using the following SQL queries:

User Table:

sql
Copy
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `user` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userId`)
);
Likes Table:

sql
Copy
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` text,
  `user` int DEFAULT NULL,
  `src` text,
  `title` text,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`userId`)
);
Step 4: Running the Application
To start the application, execute the following commands in their respective directories:

Client:

arduino
Copy
npm run dev
Server:

sql
Copy
npm start
Execution Screenshots
Actual Site with Latest News from the US
(Insert screenshot here)

Login Page
(Insert screenshot here)

Registration Page
(Insert screenshot here)

User Preferences Selection
Users can select their preferences from the dropdown menu for country and category. (Insert screenshot here)

Favorites and Weather Details
After logging in, users can access their favorite news and weather details. (Insert screenshot here)

Favorite News
(Insert screenshot here)

