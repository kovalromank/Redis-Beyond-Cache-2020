# :tada: Spotify + YouTube Party Backed By Redis :tada:

[Redis 'Beyond Cache' Hackathon](https://redisbeyondcache2020.devpost.com/) submission. A web app where users can sync YouTube videos with music from Spotify.

## :computer: Prerequisites

You'll need the following to run the web app and api:

- [Node.js and npm](https://nodejs.org/en/)
- [Git](https://git-scm.com/), to clone this repository
- [Spotify App](https://developer.spotify.com/dashboard), note the `Client ID` and `Client Secret` fields returned by Spotify, you will need to enter those in the project's environment files. Make sure to configure the Redirect URIs in Spotify, by default set this to `http://localhost:8080/v1/login/spotify/complete`

## :rocket: Usage

First, clone the git repository:

```bash
$ git clone https://github.com/KovalRomanK/Redis-Beyond-Cache-2020.git
```

Then, `cd` into the repository:

```bash
$ cd Redis-Beyond-Cache-2020
```

### :earth_americas: For the web app

`cd` into the web app folder:

```bash
$ cd web
```

Install the necessary libraries using `npm`

```bash
$ npm install
```

Start the React development server and visit `http://localhost:8000` in your browser

```bash
$ npm start
```

### :robot: For the api

`cd` into the api folder:

```bash
$ cd api
```

Install the necessary libraries using `npm`

```bash
$ npm install
```

Rename `example.env` to `.env.local` and replace `XXX` values with your own.<br>

Build the server

```bash
$ npm run build
```

Start the development server

```bash
$ npm run serve
```
