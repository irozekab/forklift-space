# Forker #

The server application of [Forklift Space][4].

### What is this repository for? ###

Forklift space adopt a [SPA architecture][1] which consist of a server application that serves data via it's API and a client application that consumes the data. This repository is the server application. It is developed with [Hapi.js][2] and the endpoints are secured with [Auth0][3].

### How do I get set up? ###

* Clone the repository.
* Download dependencies.
* Start Mongo DB.
* Start server.

#### Clone the repository ####

```shell
git clone https://bitbucket.org/itsykumo/forker`
```

#### Download dependencies ####

```shell
npm install
```

#### Start MongoDB ####

```shell
mongod
```

#### Start server ####

```shell
npm run start
```

### Implementation ###

#### Listing's State Diagram ####

|State      |Event                                    |Change to State  |
|:---------:|:---------------------------------------:|:---------------:|
|Draft      |*User publish listing*                   |Active           |
|Published  |*User delete listing*                    |Deleted          |
|Sold       |*User sold listing*                      |Active           |
|Expired    |*Listing create data exceed 3 montsh*    |Active           |
|Deleted    |*User re-port listing*                   |Active           |

[1]: https://en.wikipedia.org/wiki/Single-page_application
[2]: https://hapijs.com/
[3]: https://auth0.com/
[4]: http://www.forklift.space/
