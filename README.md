# CineLounge

CineLounge is an API for a movie lobby for OTT applications, built with Node.js, Express, and MongoDB.

## Features

- List all movies in the lobby
- Search for movies by title or genre
- Admin operations (add, update, delete movies)

## Setup and Installation

1. Clone the repository: git clone repository-url
2. Install dependencies: npm install
3. Set up your `.env` file based on the provided `.env`.
4. Start the server: npm start

## API Endpoints

- `GET /movies` - List all movies
- `GET /movies/search?q={query}` - Search movies
- `POST /movies` - Add a new movie (Admin)
- `PUT /movies/:id` - Update a movie (Admin)
- `DELETE /movies/:id` - Delete a movie (Admin)

## Running Tests

To run tests, use the command: npm test

## Using the Postman Collection

Our repository includes a Postman collection that makes it easy to test and interact with the CineLounge API. To use this collection, follow the steps below:

### Importing the Collection into Postman

1. **Download and Install Postman**: If you don't have Postman installed, download and install it from [here](https://www.postman.com/downloads/).

2. **Clone the Repository**: If you haven't already, clone the CineLounge repository to your local machine.

3. **Locate the Postman Collection File**: Inside the cloned repository, you will find a Postman collection JSON file (`CineLounge.postman_collection.json`).

4. **Locate the API Document File**: Inside the cloned repository, you will find a API Document file ( `API REQUESTS OF POSTMAN COLLECTION.docx` ) which would contain information about API requests and it will also help in testing via Postman Collection.

5. **Import the Collection into Postman**:
- Open Postman.
- Click on the `Import` button in the top left corner.
- Drag and drop the Postman collection JSON file into the import window, or use the `Upload Files` option to select the file from your file system.
- Once imported, the collection will appear in your Postman workspace.

### Using the Collection

- The collection contains pre-configured requests for all the endpoints of the CineLounge API.
- Simply select a request from the collection and click the `Send` button to execute it.
- For requests that require authentication, make sure to update the request headers with a valid JWT token if necessary.
