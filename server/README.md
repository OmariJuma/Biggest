# Biggest Server

This is the backend server for the **Biggest** e-commerce application, currently under development for biggest.com.ng. It is built using Node.js and Prisma as the ORM for database operations. The server handles all the business logic, database interactions, and API endpoints for the application.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for Node.js to handle routing and middleware.
- **Prisma**: ORM (Object-Relational Mapping) tool for database operations.
- **MySQL**: Relational database management system.

## Project Structure
server/ ├── controllers/ │ ├── category.js │ ├── customer_order_product.js │ ├── customer_orders.js │ ├── mainImages.js │ ├── products.js │ ├── users.js │ ├── wishlist.js ├── prisma/ │ ├── schema.prisma │ ├── migrations/ ├── utils/ │ ├── db.ts │ ├── insertDemoData.js ├── app.js ├── package.json └── .env


## Setting Up the Environment

### Step 1: Install Node.js and npm

Ensure you have Node.js and npm installed. You can download them from [nodejs.org](https://nodejs.org/en).

### Step 2: Install MySQL

Install MySQL on your machine. You can download it from [dev.mysql.com](https://dev.mysql.com/downloads/installer/).

### Step 3: Create the `.env` File

Create a `.env` at the root of `server` directory with the following content:

```env
DATABASE_URL="mysql://username:password@localhost:3306/biggestDb"
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=
```
Replace `username`, `password`, and `biggestDb` with your MySQL credentials and database name.
The cloudinary api keys are for uploading images to cloudinary
The jwt secret is for signing and validating jwt tokens
`contact me to get the jwt secret and cloudinary secret`

#### Step 4: Install Dependencies
Navigate to the server directory and install the required dependencies:
````
cd server
npm install
````
#### Step 5: Run Prisma Migrations
Run the following command in the terminal to apply the Prisma migrations and set up your database schema:
```` 
npx prisma migrate dev --name init
````
This will create the necessary tables in your database based on the Prisma schema defined in prisma/schema.prisma.

#### Step 6: Insert Demo Data (Optional)
If you want to insert demo data into your database, run the following script:
````
node run seed 
or
node utills/insertDemoData.js
````
#### Step 7: Start the Server
Start the server by running:
(prefer npm run dev because it has nodemon for restarting the server when changes occur)
````
npm run dev
````
or
````
node app.js
````
The server will start on the specified port (default is 8080).

# API Endpoints
The server exposes various API endpoints to manage products, orders, users, and more. Here are some of the key endpoints:

Products

GET /products: Get all products
POST /products: Create a new product
PUT /products/:id: Update an existing product
DELETE /products/:id: Delete a product
Orders

GET /orders: Get all orders
POST /orders: Create a new order
PUT /orders/:id: Update an existing order
DELETE /orders/:id: Delete an order
Users

GET /users: Get all users
POST /users: Create a new user
PUT /users/:id: Update an existing user
DELETE /users/:id: Delete a user
Wishlist

GET /wishlist: Get all wishlist items
POST /wishlist: Add an item to the wishlist
DELETE /wishlist/:userId/:productId: Remove an item from the wishlist

# Contributors
- Omar Juma