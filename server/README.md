# Server API of Commaterialize

### List of auth routes

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/api/login/   |POST    |Auth to login      | <ul><li>[x] email (string) </li><li>[x] password (string)</li></ul>           |
|/api/register/   |POST    |Register new customer      |<ul><li>[x] name (string) </li><li>[x] email (string)</li><li>[x] password (string)</li></ul>           |
|/api/isAdmin/   |POST    |Check if token role is admin      |<ul><li>[x] token (string) </li> </ul>               |

### List of customer routes

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/api/customer/  |GET     |Read all customer data        |-               |
|/api/customer/:id  |GET     |Read one customer data        |<ul><li>[x] id (string) </li> </ul>                  |
|/api/customer/  |POST     |Create new customer data        |<ul><li>[x] name (string) </li><li>[x] email (string) </li><li>[x] password (string) </li><li>[x] role (string) </li> </ul>                  |
|/api/customer/:id  |PUT     |Update one customer data        |<ul><li>[x] id (string) </li> </ul> <ul><li>[ ] name (string) </li><li>[ ] email (string) </li><li>[ ] password (string) </li><li>[ ] role (string) </li><li>[x] category (string) </li></ul>                 |
|/api/customer/:id  |DELETE     |Delete one customer data        |<ul><li>[x] id (string) </li> </ul>                  |

### List of product routes

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/api/product/  |GET     |Read all product data        |-               |
|/api/product/:id  |GET     |Read one product data        |<ul><li>[x] id (string) </li> </ul>                  |
|/api/product/  |POST     |Create new product data        |<ul><li>[x] name (string) </li><li>[x] price (string) </li><li>[x] description (string) </li><li>[x] imageUrl (string) </li> </ul>                  |
|/api/product/:id  |PUT     |Update one product data        |<ul><li>[x] id (string) </li> </ul> <ul><li>[ ] name (string) </li><li>[ ] price (string) </li><li>[ ] description (string) </li><li>[ ] imageUrl (string) </li><li>[ ] category (string) </li></ul>                 |
|/api/product/:id  |DELETE     |Delete one product data        |<ul><li>[x] id (string) </li> </ul>                  |

### List of transaction routes

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/api/transaction/  |GET     |Read all transaction data        |-               |
|/api/transaction/:id  |GET     |Read one transaction data        |<ul><li>[x] id (string) </li> </ul>                  |
|/api/transaction/  |POST     |Create new transaction data        |<ul><li>[x] customer_id (string) *is jwt token </li><li>[x] productlist (array) *product_id </li><li>[x] totalHarga (string) </li></ul>                  |
