# totaljs-mysql-login-example
Total.js framework login example with users from mysql and different user privilages

## Features
This login example includes multiple [totaljs examples](https://github.com/totaljs/examples) in one place.
This example includes:
- user login with data from mysql
- password encryption with [Totaljs JsonWebToken (JWT)](https://github.com/totaljs/modules/tree/master/Security/jsonwebtoken) module
- user privileges and page restrictions based on those privilages
- css and js static file merge
- helper.js functions for the views
- use of different layouts for views (this example has 2 layouts - for login page and default one for authorized pages)
- use of view compoments (in this example - an error html element)
- localisation example

## Installation

install totaljs framework globally
```bash
$ npm install -g total.js
```
to intall all other necessary components, in the project folder run:
```bash
npm install
```
use the sql file file from the project to populate your mysql DB. (`myexample.sql`)

## Running the project

In the project folder:

```bash
node debug.js
```
open your web brouser and open http://localhost:8080
you should see a login page - once you have populated your db (and setup the right acces to your db in `definitions/database.js`) you can login with one of these accounts and see the differences of what is accessible by each user.

User | Password | User type
--- | --- | ---
demo | admindemo | admin
demo2 | speruserdemo | super user
demo3 | userdemo | normal user

once you have logged in, you can register your own users.

## Authors

* **Martins Zieds** - *Initial work of this example*

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

__Btw__, there are none to this particular example, so your PR's are more than welcome :)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
