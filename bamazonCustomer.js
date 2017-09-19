var mysql = require('mysql');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'UNCCamp448',
	database: 'bamazon'
});

function customerData() {
	connection.connect(function(e1) {
		if (e1) throw e1;
		// console.log(`connected as ${connection.threadId}` );
		//get all data
		var sqlQuery = "Select * from products order by item_id asc";
		connection.query(sqlQuery, function(e2, productDetails) {
			if (e2) throw e2;
			// console.log(productDetails);
			for (var i = 0; i < productDetails.length; i++) {
				console.log("\nProduct item ID: " + productDetails[i].item_id + 
					"\nProduct Name: " + productDetails[i].product_name +
					"\nPrice ($): " + productDetails[i].price);
			}
			console.log("\n");
			// console.log(JSON.stringify(productDetails, null, '\t'));
			var startID = productDetails[0].item_id;
			var endID = productDetails[productDetails.length-1].item_id;
			// console.log(startID, endID, productDetails.length);
			//get item id and quantity
			inquirer.prompt([
				{
					name: "item",
			        type: "input",
			        message: "Enter the item_id to buy:",
			        validate: function(num) {
			        	if(isNaN(num) === false) {
			        		if(num>=startID && num<=endID)
			        			return true
			        	}
			        	return false;
			      	}
				},
				{
					name: "quantity",
			        type: "input",
			        message: "Enter quantity to buy:",
			        validate: function(qty) {
			          return (!isNaN(parseInt(qty)) && qty>0 ) 
			      	}
				}
			]).then(function(buyItem) {
				//check quantity needed is available in stock
				// console.log("buyItem: " + buyItem.item);
				var selectedItem = [];
				for (var i = 0; i < productDetails.length; i++) {
					if(productDetails[i].item_id === parseInt(buyItem.item)) {
						selectedItem.push(productDetails[i]);
						break;
					}
				}
				// console.log("selected item: " + selectedItem[0].item_id);
				var totalQty = selectedItem[0].stock_quantity;
				// console.log(totalQty, buyItem.quantity);
				if (totalQty >= buyItem.quantity) {
					totalQty -= parseInt(buyItem.quantity);
					//update total subtract with quantity purchased
					sqlQuery = `update products set stock_quantity = ${totalQty} where item_id = ${buyItem.item} `;
					connection.query(sqlQuery, function(e3, productUpdated) {
						if (e3) throw e3;
						//display total price
						console.log("Total purchase price ($): " + 
							(selectedItem[0].price * parseInt(buyItem.quantity)).toFixed(2) )
						connection.end();
					});
				}
				else {
					console.log("Insufficient quantity in stock!");
					connection.end();
				}
			});
		});
	});
}

customerData();