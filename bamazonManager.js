var mysql = require('mysql');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'UNCCamp448',
	database: 'bamazon'
});

//get manager's choice
function managerView() {
	inquirer.prompt([
		{
			type: "list",
	      	message: "Choose an operation?",
	      	choices: ["View Products for Sale", 
	      			"View Low Inventory", 
	      			"Add to Inventory",
	      			"Add New Product"],
	      	name: "mgrOpr"
		}
	]).then(function(mgrChoice) {
		switch (mgrChoice.mgrOpr) {
			case "View Products for Sale":
				viewInventory();
				break;
			case "View Low Inventory":
				viewLowInventory();
				break;
			case "Add to Inventory":
				addInventory();
				break;
			case "Add New Product":
				addProduct();
				break;
		}
	}).catch(function (err) {
		console.log(err);
	    console.log("Promise Rejected");
	});
}

//view inventory
function viewInventory() {
	connection.connect(function(e1) {
		if (e1) throw e1;
		var sqlQuery = "Select * from products order by item_id asc";
		connection.query(sqlQuery, function(e2, productDetails) {
			if (e2) throw e2;
			for (var i = 0; i < productDetails.length; i++) {
				console.log("\nProduct item ID: " + productDetails[i].item_id + 
					"\nProduct Name: " + productDetails[i].product_name +
					"\nPrice ($): " + productDetails[i].price +
					"\nQuantity: " + productDetails[i].stock_quantity);
			}
			connection.end();
		});
	});
}

//view low inventory
function viewLowInventory() {
	connection.connect(function(e1) {
		if (e1) throw e1;
		var sqlQuery = `Select * from products 
					where stock_quantity < 5
					order by item_id asc`;
		connection.query(sqlQuery, function(e2, productDetails) {
			if (e2) throw e2;
			for (var i = 0; i < productDetails.length; i++) {
				console.log("\nProduct item ID: " + productDetails[i].item_id + 
					"\nProduct Name: " + productDetails[i].product_name +
					"\nPrice ($): " + productDetails[i].price +
					"\nQuantity: " + productDetails[i].stock_quantity);
			}
			connection.end();
		});
	});
}

//add inventory
function addInventory() {
	connection.connect(function(e1) {
		if (e1) throw e1;
		var sqlQuery = "Select * from products order by item_id asc";
		connection.query(sqlQuery, function(e2, productDetails) {
			if (e2) throw e2;
			// console.log(productDetails);
			inquirer.prompt([
				{
					name: "item",
			        type: "list",
			        message: "Enter the item_id to add quantity:",
			        choices: function() {
			            var choiceArray = [];
			            for (var i = 0; i < productDetails.length; i++) {
			              	choiceArray.push(productDetails[i].item_id.toString());
			            }
			            // console.log(choiceArray);
			            return choiceArray;
			        }
				},
				{
					name: "quantity",
			        type: "input",
			        message: "Enter quantity to add:",
			        validate: function(qty) {
			          return (!isNaN(parseInt(qty)) && qty>0 ) 
			      	}
				}
			]).then(function(addItem) {
				// console.log(addItem.item, addItem.quantity);
				var chosenItem = productDetails.find( element => {
					return element.item_id == addItem.item;	
				});
		        // console.log(chosenItem);
		        var qty = chosenItem.stock_quantity + parseInt(addItem.quantity);
				sqlQuery = `update products set stock_quantity = ${qty} 
						where item_id = ${chosenItem.item_id} `;
				connection.query(sqlQuery, function(e3, productUpdated) {
					if (e3) throw e3;
					console.log(productUpdated);
					connection.end();
				});
			}).catch(function (err) {
				 console.log(err);
			     console.log("Promise Rejected");
			});
		});
	});
}

//add product
function addProduct() {
	inquirer.prompt([
		{
			name: "product",
	        type: "input",
	        message: "Enter the Product name:",
		},
		{
			name: "department",
	        type: "input",
	        message: "Enter the Department name:",
		},
		{
			name: "price",
	        type: "input",
	        message: "Enter price:",
	        validate: function(prc) {
	          return (!isNaN(parseInt(prc)) && prc>0 ) 
	      	}
		},
		{
			name: "quantity",
	        type: "input",
	        message: "Enter quantity:",
	        validate: function(qty) {
	          return (!isNaN(parseInt(qty)) && qty>0 ) 
	      	}
		}
	]).then(function(addProduct) {
		var itemPrice = parseInt(addProduct.price).toFixed(2);
		// console.log(itemPrice);
		connection.connect(function(e1) {
			if (e1) throw e1;
			sqlQuery = `insert into products (product_name, department_name, price, stock_quantity)
				values ('${addProduct.product}', '${addProduct.department}', ${itemPrice}, ${parseInt(addProduct.quantity)} ) `;
			connection.query(sqlQuery, function(e2, productUpdated) {
				if (e2) throw e2;
				console.log("Added product" );
				console.log(productUpdated);
				sqlQuery = `select department_name from departments `;
				connection.query(sqlQuery, function(e3, deptNames) {
					if (e3) throw e3;
					var addDept = deptNames.find( element => {
						console.log(element.department_name, addProduct.department);
						return element.department_name == addProduct.department;	
					});
					console.log("addDept = " + addDept);
					if(typeof addDept === undefined) {
						console.log("Department already exists in table");
					} else {
						// console.log("not exists");
						sqlQuery = `insert into departments (department_name, over_head_costs) 
							values ('${addProduct.department}', ${500.00}) `;
						connection.query(sqlQuery, function(e4, addDeptNames) {
							if (e4) throw e4;
							console.log("Added department" );
							console.log(addDeptNames);
						});
					}
					connection.end();
				});
			});
		});
	}).catch(function (err) {
		console.log(err);
	    console.log("Promise Rejected");
	});
}

// execution start
managerView();