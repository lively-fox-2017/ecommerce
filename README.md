# E-Commerce ~ olshop.belitopikuy.xyz
website e-commerce seerhana (on progress)

## Routes
#### list of products routes :

|Routes                                            |HTTP        |Description                                                         |
|--------------------------------------------------|:----------:|-------------------------------------------------------------------:|
|<div style="color:cyan">/products</div>           |** GET **   |Show All products                                                   |
|<div style="color:cyan">/products/:id</div>       |** GET **   |Show 1 product based on ID                                          |
|<div style="color:cyan">/products/insert</div>    |** POST **  |Insert data into Collection and upload image to google cloud storage|
|<div style="color:cyan">/products/update/:id</div>|** PUT **   |Update data based on ID                                             |
|<div style="color:cyan">/products/delete/:id</div>|** DELETE **|Delete data based on ID and delete file on google storage(still bug)|

#### list of users routes :

|Routes                                         |HTTP        |Description                                            |
|-----------------------------------------------|:----------:|------------------------------------------------------:|
|<div style="color:cyan">/users</div>           |** GET **   |Show All users                                         |
|<div style="color:cyan">/users/login</div>     |** POST **  |User login authentications                             |
|<div style="color:cyan">/users/register</div>  |** POST **  |Insert data to Collection (auto Login after regis)     |
|<div style="color:cyan">/users/:id</div>       |** GET **   |Show 1 user based on ID                                |
|<div style="color:cyan">/users/insert</div>    |** POST **  |Insert data user into Collection                       |
|<div style="color:cyan">/users/update/:id</div>|** PUT **   |Update data based on ID                                |
|<div style="color:cyan">/users/delete/:id</div>|** DELETE **|Delete data based on ID                                |

#### list of transactions routes :

|Routes                                                |HTTP        |Description                   |
|------------------------------------------------------|:----------:|-----------------------------:|
|<div style="color:cyan">/transactions</div>           |** GET **   |Show All transactions         |
|<div style="color:cyan">/transactions/insert</div>    |** POST **  |Insert data into Collection   |
|<div style="color:cyan">/transactions/delete/:id</div>|** DELETE **|Delete data based on ID       |

## NB : there's still no authorization on server routes
