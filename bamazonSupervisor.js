require('console.table');
var mysql = require('mysql');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'UNCCamp448',
	database: 'bamazon'
});

//get supervisor's choice
function supervisorView() {
	inquirer.prompt([
		{
			type: "list",
	      	message: "Choose an operation?",
	      	choices: ["View Product Sales by Department", 
	      			"Create New Department"],
	      	name: "sprOpr"
		}
	]).then(function(sprChoice) {
		switch (sprChoice.sprOpr) {
			case "View Product Sales by Department":
				viewDepartments();
				break;
			case "Create New Department":
				addDepartment();
				break;
		}
	}).catch(function (err) {
		console.log(err);
	    console.log("Promise Rejected");
	});
}

function viewDepartments() {
	connection.connect(function(e1) {
		if (e1) throw e1;
		var sqlQuery = `select a.*, sum(b.product_sales), (sum(b.product_sales) - a.over_head_costs) as total_profit 
			from departments as a 
			inner join products as b on a.department_name = b.department_name
			group by a.department_name 
			order by a.department_id; `;
		connection.query(sqlQuery, function(e3, viewDepts) {
			if (e3) throw e3;
			// console.log(viewDepts.length);
			console.table('Profits:',viewDepts);
			connection.end();
		});
	});
}

function addDepartment() {
	inquirer.prompt([
		{
			name: "department",
	        type: "input",
	        message: "Enter the Department name:",
		},
		{
			name: "overhead",
	        type: "input",
	        message: "Enter over head cost:",
	        validate: function(prc) {
	          return (!isNaN(parseInt(prc)) && prc>0 ) 
	      	}
		}
	]).then(function(addDept) {
		var ovrHdCost = parseInt(addDept.overhead).toFixed(2);
		// console.log(ovrHdCost);
		connection.connect(function(e1) {
			if (e1) throw e1;
			var sqlQuery = `insert into departments (department_name, over_head_costs)
				values ('${addDept.department}', ${ovrHdCost}) `;
			connection.query(sqlQuery, function(e2, deptAdded) {
				if (e2) throw e2;
				console.log("Added department" );
				console.log(deptAdded);
				connection.end();
			});
		});
	}).catch(function (err) {
		console.log(err);
	    console.log("Promise Rejected");
	});
}

// execution start
supervisorView();