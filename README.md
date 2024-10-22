# NodeJS Assignment - AltSchool Africa (Backend Enginering First Assessment)

## Servers and APIs

1. Without using a framework, build a web server to render html files:
When I navigate to “/index.html”, I should see a simple webpage of the student. (Nothing fancy)
Add another feature such that when I navigate to “{random}.html” it should return with a 404 page

2. Without using a framework, build an api server to manage inventory information. Api should be able to
- Create item
- Get all items
- Get one item
- Update item
- Delete item

### Item should have the following attributes
- Name
- Price
- Size: small(s), medium(m) or large(l)
- Id

#### Things to note:
- Return data structure should be consistent among the apis
- Ensure code is modular
- Handle errors where possible
- No need to use database, use file system to persist data eg items.json


## Running the Project

After cloning the repository, initialize the project with:

```bash
npm init
```

Then, install `nodemon` (either globally or locally):

```bash
npm install -g nodemon
```

### Running the Web Server

To start the web server, run:

```bash
npm run start
```

The web server will be available at [http://localhost:3000](http://localhost:3000).

### Running the API Server

To start the API server, run:

```bash
npm run dev
```

The API server will be available at [http://localhost:3001/items](http://localhost:3001/items).

### Customizing the Scripts

You can edit the `start` and `dev` scripts in the `package.json` file to suit your preferences.

### Testing the API

You can test the API using tools like Thunder Client or Postman. Make sure to send requests to the appropriate endpoints to create, retrieve, update, and delete inventory items.

Thanks for checking this out!

