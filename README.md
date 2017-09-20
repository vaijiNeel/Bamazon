# Bamazon

This project was created using Node JS, mySQL, and npm modules - mysql, inquirer, console.table. It consists of 3 node applications - Customer view, Manager view, and Supervisor view.

##Customer view

First I created database called bamazon, and then table products as shown in the screenshot below:

* https://github.com/vaijiNeel/Bamazon/blob/master/CreateProductTable.PNG

Then inserted some dummy data for products table:

* https://github.com/vaijiNeel/Bamazon/blob/master/InsertDummyProductData.PNG

Next created the package.json file and installed the required node modules - mysql, inquirer. Then I created Customer view node js application which consists of the following:
* create connection to database
* add required node modules
* function customerData() - this function when called establishes connection with mysql database and performs a select query on products table. Then the result is displayed in node console. Next the inquirer prompts asking which item the user want to buy, the item_id and quantity (Input data is validated - item_id need to be within the range of id that is in the products table, if anything else is entered it prompts again to enter the correct one. And for quantity it is validated for NaN and > 0). Once the input is entered, the application will find that particular item in the database, and check whether the quantity is sufficient. If yes, it updates the products table - stock_quantity column, by subtracting the quantity bought from the total, and then it calculates the total price (quantity bought times price) and displays the result in node console, else if the stock_quantity is less than the quantity required it'll display "Insufficient quantity in stock!" in node console.

Here are screenshots of user buying items that has available quantity, table being updated:


Here is a screenshot of the application displaying quantity insufficient message:


## Manager view

* https://github.com/vaijiNeel/Bamazon/blob/master/CreateDepartmentsTable.PNG

* https://github.com/vaijiNeel/Bamazon/blob/master/InsertDepartmentData.PNG
