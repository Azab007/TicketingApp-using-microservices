
# TicketingApp E-commerce using microservices

Welcome to the documentation for the application I built during the Udemy course on Microservices with Node.js and React. This README file provides an overview of the project, Technologies used, Architecture and much more.

## Table of Contents

1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
5. [Architecture](#architecture)

## Introduction

This project was developed as part of the Udemy course on Microservices with Node.js and React. It showcases the concepts and best practices learned during the course for building microservices-based applications.

## Project Overview

TicketingApp is a microservices-based application for buying game tickets online using credit card.


## Technologies Used

This project makes use of the following technologies and tools:

- **Frontend:**
  - **React.js**: A JavaScript library for building user interfaces.
  - **Axios**: A promise-based HTTP client for making API requests.
  
- **Backend:**
  - **Node.js**: A JavaScript runtime for building server-side applications.
  - **Express.js**: A fast and minimalist web application framework for Node.js.
  - **MongoDB**: A NoSQL database used for storing and managing data.
  - **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
  - **Nats-messaging**:  NATS is an infrastructure that allows data exchange, segmented in the form of messages. We call this a "message oriented middleware".
  - **Stripe**: A payment service provider that lets merchants accept credit and debit cards or other payments.

- **Development & Deployment:**
  - **Docker**: For containerizing the application and its dependencies.
  - **Kubernetes**: For orchestrating multi-container applications.
  - **Skaffold**:  To facilitates continuous development for container based & Kubernetes applications.

  
- **Testing:**
  - **Jest**: A JavaScript testing framework for writing unit and integration tests.
  
- **Version Control:**
  - **Git**: A distributed version control system for tracking changes in the 
  
These technologies were chosen to ensure the development of a robust, efficient, and maintainable web application.



## Getting Started

1- Build each microservice Docker image and tag them.
- Example for building tickets microservice
```
docker build -t tickets .
```
2- run skaffold dev to build all microservices.
```
skaffold dev
```

## Architecture

The application consists of the following microservices:

1. ### Client microservice 
The frontend of the project built in ReactJS

2. ### Common microservice
Code shared between  all microservices as an npm package. For examble error handling, authentication and event interfaces.

3. ### Auth microservice
Used for register, login and get current user information.

4. ### Tickets microservice
Used for Creating, reading, updating and deleting a ticket.

5. ### orders microservice
Used for Creating, reading, updating and deleting an order.

6. ### payments microservice
Used for creating payments using Stripe to buy tickets.
