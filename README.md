# mongoose-crud
selasa siang, gunakan npm 'mongoose'

## Routes
#### list of books routes :

|Routes                                         |HTTP        |Description                |
|-----------------------------------------------|:----------:|--------------------------:|
|<div style="color:cyan">/books</div>           |** GET **   |Show All books             |
|<div style="color:cyan">/books/:id</div>       |** GET **   |Show 1 book based on ID    |
|<div style="color:cyan">/books/insert</div>    |** POST **  |Insert data into Collection|
|<div style="color:cyan">/books/update/:id</div>|** PUT **   |Update data based on ID    |
|<div style="color:cyan">/books/delete/:id</div>|** DELETE **|Delete data based on ID    |

#### list of customers routes :

|Routes                                             |HTTP        |Description                |
|---------------------------------------------------|:----------:|--------------------------:|
|<div style="color:cyan">/customers</div>           |** GET **   |Show All customers         |
|<div style="color:cyan">/customers/:id</div>       |** GET **   |Show 1 customer based on ID|
|<div style="color:cyan">/customers/insert</div>    |** POST **  |Insert data into Collection|
|<div style="color:cyan">/customers/update/:id</div>|** PUT **   |Update data based on ID    |
|<div style="color:cyan">/customers/delete/:id</div>|** DELETE **|Delete data based on ID    |

#### list of transactions routes :

|Routes                                                |HTTP        |Description                   |
|------------------------------------------------------|:----------:|-----------------------------:|
|<div style="color:cyan">/transactions</div>           |** GET **   |Show All transactions         |
|<div style="color:cyan">/transactions/:id</div>       |** GET **   |Show 1 transaction based on ID|
|<div style="color:cyan">/transactions/insert</div>    |** POST **  |Insert data into Collection   |
|<div style="color:cyan">/transactions/update/:id</div>|** PUT **   |Update data based on ID       |
|<div style="color:cyan">/transactions/delete/:id</div>|** DELETE **|Delete data based on ID       |

## NB : My mongoDB is autenthicated by admin on admin collection, auth object is in helper
