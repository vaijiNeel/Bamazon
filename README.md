# Bamazon

The Bamazon project consists of 3 node applications - Customer view, Manager view, and Supervisor view. The customer view lets the user to view all the products, buy products, etc. The manager's view lets manager perform operations like view low inventory, add inventory, add products, etc. The Supervisor view will let user view department-wise total profits, product sales. This project was created using Node JS, mySQL, and npm modules - mysql, inquirer, console.table. 

## Customer view
First I created database called bamazon, and then table products as shown in the screenshot below:

* https://github.com/vaijiNeel/Bamazon/blob/master/images/CreateProductTable.PNG

Then inserted some dummy data for products table:

* https://github.com/vaijiNeel/Bamazon/blob/master/images/InsertDummyProductData.PNG

Next created the package.json file and installed the required node modules - mysql, inquirer. Then I created Customer view node js application which consists of the following:
* create connection to database
* add required node modules
* function customerData() - this function when called establishes connection with mysql database and performs a select query on products table. Then the result is displayed in node console. Next the inquirer prompts asking which item the user want to buy, the item_id and quantity (Input data is validated - item_id need to be within the range of ids that is in the products table, if anything else is entered it prompts again to enter the correct one. And for quantity it is validated for NaN and > 0). Once the input is entered, the application will find that particular item in the database, and checks whether the quantity is sufficient. If yes, it updates the products table - stock_quantity column, by subtracting the quantity bought from the total, and then it calculates the total price (quantity bought times price) and displays the result in node console; else if the stock_quantity is less than the quantity required it'll display "Insufficient quantity in stock!" in node console.

Here are screenshots of user buying items that has available quantity, table being updated:
* table data before buying https://github.com/vaijiNeel/Bamazon/blob/master/images/productsDataBefore.PNG
* node console https://github.com/vaijiNeel/Bamazon/blob/master/images/QuantityBought.PNG
* table data after buying https://github.com/vaijiNeel/Bamazon/blob/master/images/productsDataAfter.PNG

Here is a screenshot of the application displaying quantity insufficient message:
* https://github.com/vaijiNeel/Bamazon/blob/master/images/InsufficientStock.PNG

## Manager view
The manager view node application performs the following:
* create connection to database
* add required node modules
* function managerView() - in which the inquirer prompts the user with 4 options to choose:
    1. View Products for Sale
    2. View Low Inventory
    3. Add to Inventory
    4. Add New Product

I used switch statement to choose the corresponding function to be executed depending on the choice. 
* If option 1 "View Products for Sale" is selected the function viewInventory() is called. This function establishes connection with mysql database and performs a select query on the products table. Then the result with columns item_id, product_name, price, stock_quantity are displayed in node console. Here is the screenshot of node console output: https://github.com/vaijiNeel/Bamazon/blob/master/images/mgrViewInv.PNG

* If option 2 "View Low Inventory" is selected the function viewLowInventory() is called. This function establishes connection with mysql database and performs a select query on the products table where the stock_quantity is less than 5. Those records with columns item_id, product_name, price, stock_quantity are then displayed in node console. Here is the screenshot of node console output: https://github.com/vaijiNeel/Bamazon/blob/master/images/LowInventory.PNG

* If option 3 "Add to Inventory" is selected the function addInventory() is called. This function establishes connection with mysql database, performs a select query on the products table, and displays in inquirer list prompt for the user to choose an item. Once the user selects an item, it prompts for quantity to add, and validates the input for NaN and > 0. Then it finds that particular item in the table and runs update query to update the stock_quantity column, adding the quantity to the exsiting quantity. Here are the screenshots of node console output and table data: 
    * Table data before update - https://github.com/vaijiNeel/Bamazon/blob/master/images/addInvBefore.PNG
    * console output - https://github.com/vaijiNeel/Bamazon/blob/master/images/AddInvConsole.PNG
    * Table data after update - https://github.com/vaijiNeel/Bamazon/blob/master/images/addInvAfter.PNG
    
* If option 4 "Add New Product" is selected the function addProduct() is called. This function displays inquirer prompt for the ser to enter Product name, Department name, price, quantity (price and quantity input are validated ofr NaN and > 0). Then it establishes connection with mysql database, and inserts the record into products table. Here are the screenshots of node console output and table data: 
    * console output - https://github.com/vaijiNeel/Bamazon/blob/master/images/AddProduct.PNG
    * table data - https://github.com/vaijiNeel/Bamazon/blob/master/images/AddedProduct.PNG

## Supervisor view
For Supervisor view I created a new table called departments with columns department_id, department name, and over_head_costs, and did insert select on department_name from products table into departments table. Here are the screenshots:

* https://github.com/vaijiNeel/Bamazon/blob/master/images/CreateDepartmentsTable.PNG
* https://github.com/vaijiNeel/Bamazon/blob/master/images/InsertDepartmentData.PNG

Then installed console.table npm module to display the table records in node console in tabular format. Added column product_sales to products table and populated it with dummy data - https://github.com/vaijiNeel/Bamazon/blob/master/images/productSalesCol.PNG

The Supervisor view application when run, prompts user with 2 options - 
    1. View Product Sales by Department 
    2. Create New Department.
    
* If option 1 "View Product Sales by Department" is selected the function viewDepartments() is called. This function establishes connection with mysql database, performs a select query doing a inner join of products and deparments tables, grouping by deparment_name and summing product_sales. Then subtracting over_head_costs from summed product_sales it displays another column called total_profit. Here is the screenshot of the console output - https://github.com/vaijiNeel/Bamazon/blob/master/images/totalProfit.PNG

* If option 2 "Create New Department" is selected the function addDepartment() is called. This function prompts user for department_name and over_head_cost (the input is validated for NaN and > 0 and convereted to float with 2 digits after decimal). Once the input is entered it establishes connection with mysql database, and inserts data into departments table. Here are the screenshots: 
    * console - https://github.com/vaijiNeel/Bamazon/blob/master/images/addDept.PNG 
    * table after - https://github.com/vaijiNeel/Bamazon/blob/master/images/addDeptAfter.PNG

Also updated the function addProduct() in Manager view application, so that when a new product is added if the department is not present in departments table, the application will insert the new deparment details with dummy over_head_cost in departments table. Here are the screenshots:
    * Table data before add - https://github.com/vaijiNeel/Bamazon/blob/master/images/tableProdAddProdBefore.PNG,  https://github.com/vaijiNeel/Bamazon/blob/master/images/tableDeptAddProdBefore.PNG
    * Console output - add new department - https://github.com/vaijiNeel/Bamazon/blob/master/images/addProdDeptConsole.PNG
    * Console output - department already exists - https://github.com/vaijiNeel/Bamazon/blob/master/images/deptAlreadyExists.PNG

