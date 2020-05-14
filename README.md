
# Fashion House - API Documentation

#### Application Frameworks | SE3040 | Group Project 

Online Shopping Cart System for a Fashion Store. This repository is being used to version controlling of the project of Application Frameworks module (SE3040).


# Available scripts

*   `npm start` - Runs the server as default node application
*   `npm run server` - Runs only the backend server
*   `npm run client` - Runs only the front end server
*   `npm run dev` - Runs front end and backend concurrently



## Open Endpoints (Endpoints that require No Authentication)


### Users

-   **GET** `localhost:8000/api/v1/users` : Retrieve all user documents
-   **GET** `localhost:8000/api/v1/sensors/<user-id>` : Returns one specific user document

### Products

-   **GET** `localhost:8000/api/v1/products` : Retrieve all product documents
-   **GET** `localhost:8000/api/v1/products/<product-id>` : Returns one specific product document

### Categories

-   **GET** `localhost:8000/api/v1/categories` : Retrieve all category documents
-   **GET** `localhost:8000/api/v1/categories/<category-id>` : Returns one specific category document

### Carts

-   **GET** `localhost:8000/api/v1/carts` : Retrieve all cart documents
-   **GET** `localhost:8000/api/v1/carts/<cart-id>` : Returns one specific cart document

### Favourites

-   **GET** `localhost:8000/api/v1/favourites` : Retrieve all favourite documents
-   **GET** `localhost:8000/api/v1/favourites/<favourite-id>` : Returns one specific favourite document

### Orders

-   **GET** `localhost:8000/api/v1/orders` : Retrieve all order documents
-   **GET** `localhost:8000/api/v1/orders/<order-id>` : Returns one specific order document

### Review

-   **GET** `localhost:8000/api/v1/reviews` : Retrieve all review documents
-   **GET** `localhost:8000/api/v1/reviews/<review-id>` : Returns one specific review document





## Endpoints that require Authentication

To access this end points you **should pass valid token** in the request header along with the request. Once you successfully logged in to the system, it will sends you a valid token. You may **set that token to the request header** as key value pair as follows. **It must accompany this format**.

> **KEY** `Authorization` | **VALUE** `Bearer<space><the-token-that-received-when-logged-in>`



### Users

-   **POST** `localhost:8000/api/v1/users` : Create a new user document
-   **PATCH** `localhost:8000/api/v1/users/<user-id>` : Update existing user document
-   **DELETE** `localhost:8000/api/v1/users/<user-id>` : Delete specific user document

**Sample User Document**

```json
{
  "_id": "5eb8df16c4e06e21b8b9f306",
  "name": "User Name",
  "email": "user@email.com",
  "password": "userpassword",
  "passwordConfirm": "userpassword",
  "address": "User Address",
  "role": "customer",
  "image": "https://cdn.clipart.email/be0c9ce2c8758e4287cfc6f3a410ded1_computer-icons-user-clip-art-transpare-1340608-png-images-pngio_920-641.png"
  "reqtype" : "user"
}
```

   > The request must have the user object with following attributes. Email should be a **_valid email address_** and the password should contain **_at least 8 characters_**.



### Products

-   **POST** `localhost:8000/api/v1/products` : Create a new product document
-   **PATCH** `localhost:8000/api/v1/products/<product-id>` : Update existing product document
-   **DELETE** `localhost:8000/api/v1/products/<product-id>` : Delete specific product document

**Sample Product Document**

```json
{
  "name": "KIDS top",
  "category": "5eb84ebcd6bba51028d646ea",
  "quantity": "25",
  "price": "850",
  "discount": {
    "percentage": "0",
    "from": "",
    "until": ""
  },
  "description": "Boys t shirts",
  "images": [
    "https://images-na.ssl-images-amazon.com/images/I/61lMojtihsL._SL1200_.jpg" ,
    "https://5.imimg.com/data5/NP/ML/KD/ANDROID-81971179/product-jpeg-500x500.jpg" ,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3AnMOgkTtD1klh12QHVsQ-g-1up1pAqJNM1J3T3Ug3JIns7ghcg&s"
  ],
  "sizes": [
    "S" , "M" , "L"
  ],
  "colors": [
    "red" , "blue" , "green"
  ],
  "avgRating": ""
}
```

   > Enter **_Product_**  description   **_here_**.


### Categories

-   **POST** `localhost:8000/api/v1/categories` : Create a new category document
-   **PATCH** `localhost:8000/api/v1/categories/<category-id>` : Update existing category document
-   **DELETE** `localhost:8000/api/v1/categories/<category-id>` : Delete specific category document

**Sample Category Document**

```json
{
  "title": "Perfumes",
  "description": "All the perfumes and scents",
  "image": "URL of the image as string"
}
```

   > Enter **_Category_**  description   **_here_**.


### Carts

-   **POST** `localhost:8000/api/v1/carts` : Create a new cart document
-   **PATCH** `localhost:8000/api/v1/carts/<cart-id>` : Update existing cart document
-   **DELETE** `localhost:8000/api/v1/carts/<cart-id>` : Delete specific cart document

**Sample Cart Document**

```json
{
  "user": "5eb8ddb0c4e06e21b8b9f305",
  "product": "5eb8f9262705843e28b29e61",
  "quantity": "2",
  "size": "S",
  "color": "red",
  "date": ""
}
```

   > Enter **_Cart_**  description   **_here_**.


### Favourites (Wish list)

-   **POST** `localhost:8000/api/v1/favourites` : Create a new favourite document
-   **PATCH** `localhost:8000/api/v1/favourites/<favourite-id>` : Update existing favourite document
-   **DELETE** `localhost:8000/api/v1/favourites/<favourite-id>` : Delete specific favourite document

**Sample Favourite Document**

```json
{
  "user": "5eb8ddb0c4e06e21b8b9f305",
  "product": "5eb8f9262705843e28b29e61",
  "date": ""
}
```

   > Enter **_Favourite_**  description   **_here_**.


### Orders

-   **POST** `localhost:8000/api/v1/orders` : Create a new order document
-   **PATCH** `localhost:8000/api/v1/orders/<order-id>` : Update existing order document
-   **DELETE** `localhost:8000/api/v1/orders/<order-id>` : Delete specific order document

**Sample Order Document**

```json
{
  "user": "5eb8ddb0c4e06e21b8b9f305",
  "products": [
    {
      "productId": "5eb8f9262705843e28b29e61",
      "color": "red",
      "size": "S",
      "quantity": "2"
    },
    {
      "productId": "5eb8fcd82705843e28b29e66",
      "color": "blue",
      "size": "L",
      "quantity": "4"
    }
  ],
  "totalAmount": "2300",
  "discountAmount": "200",
  "paymentMethod": "Visa",
  "date": ""
}
```

   > Enter **_Order_**  description   **_here_**.


### Review

-   **POST** `localhost:8000/api/v1/reviews` : Create a new review document
-   **PATCH** `localhost:8000/api/v1/reviews/<review-id>` : Update existing review document
-   **DELETE** `localhost:8000/api/v1/reviews/<review-id>` : Delete specific review document

**Sample Review Document**

```json
{
  "user": "5eb8ddb0c4e06e21b8b9f305",
  "product": "5eb8f9262705843e28b29e61",
  "comment": "Fast shippment. Quality material",
  "rating": "3.5",
  "date": ""
}
```

   > Enter **_Review_**  description   **_here_**.


## Special Endpoints

### Email (Still not implemented)

-   **POST** `localhost:8000/api/v1/email` : Sends warning email to the admin / given email address

> This endpoint uses a separate authentication mechanism. You need to have the email sending access token which pre defined in the server to send email. The token must be included in the headers in following format.

> **KEY** `Authorization` | **VALUE** `<email-sending-access-token>`

**Sample Request Object**

```json
{

}
```

