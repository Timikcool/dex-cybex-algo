# Longhash Hackathon Challenge 1

This project got created while participating in the [Longhash Hackathon 2019](https://hack.longhash.com/#/). 

# Challenge

Provide a userfriendly way to reduce big orders to multiple smaller ones. The programm should interact with the [Cybex](https://cybex.io) exchange.

# Tech Stack

* Electron
* React
* romejs

# Features

* Enter credentials
* Choose traiding pair
* Enter amount and price
* select buy or sell
* profit

# Setup

* git clone https://github.com/Timikcool/dex-cybex-algo
* cd dex-cybex-algo
* npm install
* npm run electron
* oh nope someone forgot to set cybex.js as main file in romejs
* nano node_modules/romejs/package.json
* add `"main":"cybex.js"`
* close and save
* cd to root folder
* npm run electron
