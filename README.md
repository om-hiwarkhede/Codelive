# CodeLive - Real-time Collaborative Code Editor

CodeLive is a web application that allows users to create and join coding rooms where they can collaborate and code simultaneously in real-time.  Built using React with Vite for the frontend, Express.js for the backend, and Socket.io for live communication, CodeLive provides a seamless and interactive coding experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-time Collaboration:** Multiple users can join the same room and edit code together simultaneously.
- **Room Creation:** Users can easily create new coding rooms.
- **Room Joining:** Users can join existing rooms using a unique room ID.
- **Code Editor:** Integrated code editor with syntax highlighting (using CodeMirror or a similar library).
- **Live Communication:**  Uses Socket.io for low-latency, real-time updates of code changes.
- **Responsive Design:**  Works well on different screen sizes. (If applicable)

## Technologies Used

- **Frontend:** React, Vite, HTML, CSS, JavaScript, CodeMirror (or similar code editor library)
- **Backend:** Express.js, Node.js
- **Real-time Communication:** Socket.io
- **Version Control:** Git

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/om-hiwarkhede/Codelive
   Navigate to the Project Directory:

Bash

cd CodeLive
Install Backend Dependencies:

Bash

cd server  # Or the directory where your server.js is located
npm install # or yarn install
Install Frontend Dependencies:

Bash

cd client  # Or the directory where your React app is located
npm install # or yarn install
Set up Environment Variables:

Create a .env file in the server directory.
Add necessary environment variables, for example:
PORT=5000  # Or any port you prefer
Start the Development Server:

Bash

# In the server directory:
cd server
npm run dev # or yarn dev

# In the client directory (in a separate terminal):
cd client
npm run dev # or yarn dev
Usage
Open your web browser and go to http://localhost:3000 (or the appropriate URL for your React app).
To create a room, click the "Create Room" button. You'll be given a room ID.
To join a room, enter the room ID in the input field and click the "Join Room" button.
Once in a room, you can start coding in the editor. Changes will be reflected in real-time for all other users in the same room.
Contributing
Contributions are welcome!  Please open an issue or submit a pull request with your suggestions or bug fixes.

Fork the repository.
Create a new branch for your changes.
Make your changes.
Commit your changes and push the branch.
Create a pull request.
License
(Add a license if you have one.  MIT is a common choice)
