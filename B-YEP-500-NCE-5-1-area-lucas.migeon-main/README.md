# AREA
<p align="center">
  <img src="client_web/src/assets/image/logo.png" />
</p>

## Introduction
The goal of this project is to create a service which allow link between multiples API in order to build action reaction couple like '''IFTTT'''.

This document aim to provide a documentation about our AREA project.

## How to use AREA?

First of all, make sure you have docker with docker-compose installed on your computer.

Then run docker-compose up --build.
  
## API
### Get Data
---
Get action-reaction defined by user
* **URL:**
    /api/app/
* **Method:**
    `GET`
* **URL Params:**
    None
* **Data Params:**
    None
* **Success Response:**
  * **Code:** 200 <br/>
    **Content:** `[ { title: 'your area title', actionService: 'discord', action: { id: 1, title: 'New pinned message in channel', description: 'This trigger fires when a new message is pinned in a channel you select.' }, reactionService: 'discord', reaction: { id: 1, title: 'Post a message to a channel', description: 'This action will send a message with your discord bot to the channel you specify.' } } ]`
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br/>
    **Content:** `ko`
---
---
### Post Data
---
Create a new action-reaction for user
* **URL:**
    /api/app/
* **Method:**
    `POST`
* **URL Params:**
    None
* **Data Params:** <br/>
  * **Required:** <br/>
      * `{ title=[string], actionService=[string], action: { id=[int], title=[string], description=[string] }, reactionService=[string], reaction: { id=[int], title=[string], description=[string] } }`
* **Success Response:**
  * **Code:** 200 <br/>
    **Content:** `ok`
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br/>
    **Content:** `ko`
---
---
### Delete Data
---
Delete an action-reaction from user
* **URL:**
    /api/app/
* **Method:**
    `DELETE`
* **URL Params:**
    * **Required:** <br/>
      * `title=[string]`
* **Data Params:** <br/>
    None
* **Success Response:**
  * **Code:** 200 <br/>
    **Content:** `ok`
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br/>
    **Content:** `ko`
---
---
### Get Users
---
Get list of users
* **URL:**
    /api/users/
* **Method:**
    `GET`
* **URL Params:**
    None
* **Data Params:** <br/>
    None
* **Success Response:**
  * **Code:** 200 <br/>
    **Content:** `[ { "user_id": "auth0|507f1f77bcf86cd799439020","email": "john.doe@gmail.com", "email_verified": false, "username": "johndoe", "phone_number": "+199999999999999", "phone_verified": false, "created_at": "", "updated_at": "", "identities": [ { "connection": "Initial-Connection", "user_id": 507f1f77bcf86cd799439020", "provider": "auth0", "isSocial": false } ], "app_metadata": {}, "user_metadata": {}, "picture": "", "name": "", "nickname": "", "multifactor": [ "" ], "last_ip": "", "last_login": "", "logins_count": 0, "blocked": false, "given_name": "", "family_name": "" } ]`
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br/>
    **Content:** `ko`
---
---
### Post Users
---
Create a user
* **URL:**
    /api/users/
* **Method:**
    `POST`
* **URL Params:**
    None
* **Data Params:** <br/>
    * **Required:** <br/>
      * `email=[string], password=[string]`
* **Success Response:**
  * **Code:** 200 <br/>
    **Content:** `ok`
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br/>
    **Content:** `ko`
---
---
### Put Users
---
Change the role of a user
* **URL:**
    /api/users/
* **Method:**
    `PUT`
* **URL Params:**
    None
* **Data Params:** <br/>
    * **Required:** <br/>
      * `{ role=[string], user=[string] }`
* **Success Response:**
  * **Code:** 200 <br/>
    **Content:** `ok`
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br/>
    **Content:** `ko`
---
---
### Delete Users
---
Delete a user
* **URL:**
    /api/users/
* **Method:**
    `DELETE`
* **URL Params:**
    * **Required:** <br/>
      * `userId=[string]`
* **Data Params:** <br/>
    None
* **Success Response:**
  * **Code:** 200 <br/>
    **Content:** `ok`
* **Error Response:**
  * **Code:** 400 BAD REQUEST <br/>
    **Content:** `ko`
---
---
 ## Authors

* **Clément Bérard** ([GitHub](https://github.com/Twisterrr))
* **Lucas Migeon** ([GitHub](https://github.com/HazbinFaulted))
* **Jason Fabiano** ([GitHub](https://github.com/Skyriixx))
* **Tom Bartoccioni** ([GitHub](https://github.com/Fantom00))
