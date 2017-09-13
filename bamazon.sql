-- create database bamazon;

use bamazon;

create table products (
	item_id integer(10) auto_increment not null,
    product_name varchar(100),
    department_name varchar(100),
    price float(10,2),
    stock_quantity integer(8),
    primary key (item_id)
);

alter table products auto_increment = 1000;

use bamazon;
insert into products (product_name, department_name, price, stock_quantity)
values 
	("Pen", "school_supply", "2.00", 100),
    ("Notebook", "school_supply", 5.00, 150),
    ("Highlighter", "school_supply", 3.50, 75),
    ("Carrots", "Grocery", 4.50, 15),
    ("Tomato", "Grocery", 4.50, 50),
    ("Watermelon", "Grocery", 3.50, 10),
    ("Detergent", "Home_Goods", 7.50, 10),
    ("Soap", "Home_Goods", 2.50, 15),
    ("Towel", "Home_Goods", 2.50, 15),    
    ("Liquid soap", "Home_Goods", 1.50, 15);
    
select * from products;