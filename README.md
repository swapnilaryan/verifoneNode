## Verifone Assignment 

# Pre-requisites 
* Node and npm should be installed from `https://nodejs.org/en/download/`
* Node version `v12.18.3`
* Install MongoDB `https://docs.mongodb.com/manual/installation/`
* Install docker `brew install homebrew/cask/docker`
* Install docker-compose `brew install docker-compose`

# For Development 
###Install and Start
* make sure your mongo s running `mongod --dbpath <path to your data/db>`
* `npm install`
* `npm run dev`

# Running tests
* make sure your mongodb is running
* `npm run test`

# FOR DOCKER
### Install 
* `brew install docker`
* `brew install docker-compose

### RUN
* `docker-compose up --build`
* Navigate to `http://localhost:8080/`

Frontend compiled code is in `build` folder. The entire repo is at
`https://github.com/swapnilaryan/verifoneReact` 

# Credentials 
You can sign up for the same via the api `/api/auth/signup` 

Or else signin using this
* username: verifone
* password: verifone

# Postman API Collection
`verifoneNode/Verifone.postman_collection.json`
import the above in POSTMAN and start using the API