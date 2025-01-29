# NestFrames - Social Media Web App (Frontend)
NestFrames is a social media web app focused on collaborative group albums, where users can create, share, and interact with photos in an engaging and intuitive way. Designed to provide a seamless experience, NestFrames allows users to manage their albums, posts, messages, and profiles—all with real-time notifications.

## Getting Started  

Follow these steps to set up and run NestFrames locally.  

### Prerequisites  
Before you begin, ensure you have:  
-  **Git** installed ([Download Git](https://git-scm.com/downloads))  
-  **Node.js** (LTS version) installed ([Download Node.js](https://nodejs.org/))  
-  A **GitHub account**  

### Cloning the Repository  
To get NestFrames running on your local machine:  
```sh
# Clone the repository
git clone https://github.com/Saminraiyan12/NestFrames-Frontend-.git

# Navigate into the project directory
cd NestFrames

# Install dependencies
npm install

# Start the development server
npm run dev
```
Once the server starts, open http://localhost:5173/ (or the Vite default URL) in your browser.

## Features
- **User Profiles**: Users can create and manage their own profiles with personal details, profile pictures, and bio information.
- **Albums & Posts**: Users can create collaborative albums, upload posts, and share their content with friends or groups.
- **Messaging**: Real-time messaging functionality allows users to chat with friends directly within the platform.
- **Infinite Scroll**: The home page utilizes infinite scrolling for smooth loading of posts as users scroll, providing an endless feed of content.
- **Real-Time Notifications**: Receive live notifications for new messages, friend requests, and other updates.
## Tech Stack
- **Frontend**: ReactJS with React Context for global state management and CSS with responsive design
- **Backend**:Communicates with a REST API powered by Express.js
- **Database**: MongoDB for storing user data, posts, albums, and more.
- **Websockets**: Socket.io for real-time messaging and notifications
## Responsive Design
The app features a fully responsive design, leveraging media queries and CSS techniques like clamp() to dynamically adjust the layout and content, ensuring an optimal user experience across various screen sizes and devices.
