# News Application (News Plus)

### Repository
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
![image](https://github.com/user-attachments/assets/c13ed14c-9972-4222-be37-dc56346ae9ad)

#### Login Page
![image](https://github.com/user-attachments/assets/7a9936e9-f0d7-4a8d-bacc-9c3c14da27c0)

#### Registration Page
![image](https://github.com/user-attachments/assets/d18c2323-f8ab-4646-82d1-82ae28904150)

#### User Preferences Selection
Users can select their preferences from the dropdown menu for country and category.
![image](https://github.com/user-attachments/assets/2e9ec306-f5f1-4754-ae7a-7ff5666e9305)

#### Favorites and Weather Details
After logging in, users can access their favorite news and weather details.
![image](https://github.com/user-attachments/assets/2e875cfa-8f47-445e-a936-3eed717ef231)

#### Favorite News
![image](https://github.com/user-attachments/assets/813f2056-e306-463c-a358-fcd03eab26c0)

