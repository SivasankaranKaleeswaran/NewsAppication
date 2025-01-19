# CS612 – Concepts and Structures in Internet Computing – Spring 2024
## Final Project: News Application (News Plus)

### Repository
Clone the repository using the following command:
git clone https://github.com/SivasankaranKaleeswaran/NewsAppication.git

### Setup Instructions

#### Step 1: Installation
After cloning the repository, navigate to the client and server folders separately from the command line, and install the necessary libraries using:
npm install
or
yarn install

#### Step 2: Environment Configuration
Create an environment file named `.env` in the client folder and configure the following variable:
VITE_API_KEY=<Your_API_Key_Here>
The API key can be obtained by registering at Visual Crossing Weather (https://weather.visualcrossing.com).

#### Step 3: Database Setup
Create two tables in your database using the following SQL queries:

**User Table:**
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `user` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userId`)
);

**Likes Table:**
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

#### Step 4: Running the Application
To start the application, execute the following commands in their respective directories:

**Client:**
npm run dev

**Server:**
npm start

### Execution Screenshots
#### Actual Site with Latest News from the US
![Actual Site Screenshot](path_to_image "Latest News Screenshot")

#### Login Page
![Login Page Screenshot](path_to_image "Login Page")

#### Registration Page
![Registration Page Screenshot](path_to_image "Registration Page")

#### User Preferences Selection
Users can select their preferences from the dropdown menu for country and category.
![User Preferences Screenshot](path_to_image "User Preferences")

#### Favorites and Weather Details
After logging in, users can access their favorite news and weather details.
![Favorites and Weather Details Screenshot](path_to_image "Favorites and Weather Details")

#### Favorite News
![Favorite News Screenshot](path_to_image "Favorite News")
