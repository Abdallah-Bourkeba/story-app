# Story App

A web application that allows users to create, read, update, and delete stories. Built with Node.js, Express.js, MongoDB, and EJS render engine.

## Features

- **Create**: Add new stories.
- **Read**: View all stories.
- **Update**: Edit existing stories.
- **Delete**: Remove stories.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing stories.
- **EJS**: Template engine for rendering HTML pages.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Abdallah-Bourkeba/story-app.git
    ```
2. Install dependencies:
    ```sh
    cd story-app
    npm install
    ```
3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following variables:
      ```env
      PORT=3000
      MONGODB_URI=your_mongodb_connection_string
      ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```
2. Open a web browser and go to `http://localhost:3000`.

## Folder Structure

- `models/`: Contains database schemas.
- `routes/`: Contains route handlers.
- `views/`: Contains EJS templates.
- `public/`: Contains static files (CSS, JS).

## Contributing

Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.
