# Biggest – Electronics eCommerce Shop With Admin Dashboard

**Biggest** is a full-stack e-commerce website built with Next.js and Node.js. It features a fully functional admin panel.

## Key Features

- **Admin Panel**: Manage products, orders, and users.
- **Responsive Design**: Fully responsive and manually tested.

## Requirements

- Node.js and npm
- MySQL

## Installation

### Step 1: Install Node.js and npm

Follow this [tutorial](https://www.youtube.com/watch?v=4FAtFwKVhn0) to install Node.js and npm. You can download them from [nodejs.org](https://nodejs.org/en).

### Step 2: Install MySQL

You can download mysql from [link](https://dev.mysql.com/downloads/workbench/)

### Step 4: git clone the Project

run
````git clone
git clone https://url_of_this_project
````
### Step 5: Create .env Files

Create a `.env` file in the root directory with the following content:
The backend uri is required so that you can load data. The server url is [link](https://server-t3kz.onrender.com). Don't push test data to that url instead create a database in you xampp then link it in the 
```
server directory
````
Then link it in .env as shown below
```env
NEXT_PUBLIC_BACKEND_URI=http://localhost:8080
