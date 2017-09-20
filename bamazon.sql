-- create database bamazon;

use bamazon;

create table products (
	item_id integer(10) auto_increment not null,
    product_name varchar(100),
    department_name varchar(100),
    price float(10,2),
    stock_quantity integer(8),
    unique (product_name),
    primary key (item_id)
);

alter table products auto_increment = 1000;

use bamazon;
insert into products (product_name, department_name, price, stock_quantity)
values 
	("Pen", "school_supply", 2.00, 100),
    ("Notebook", "school_supply", 5.00, 150),
    ("Highlighter", "school_supply", 3.50, 75),
    ("Carrots", "Grocery", 4.50, 15),
    ("Tomato", "Grocery", 4.50, 50),
    ("Watermelon", "Grocery", 3.50, 10),
    ("Detergent", "Home_Goods", 7.50, 10),
    ("Soap", "Home_Goods", 2.50, 15),
    ("Towel", "Home_Goods", 2.50, 15),    
    ("Liquid soap", "Home_Goods", 1.50, 15);
    
update products set stock_quantity = 4 where item_id = 1005;

create table departments (
	department_id int(10) auto_increment not null,
    department_name varchar(100),
    over_head_costs int(10),
    unique (department_name),
    primary key (department_id)
);

alter table departments auto_increment = 100;

insert into departments (department_name) select distinct(department_name) from products;

insert into departments (department_name, over_head_costs)
values ('Apparel', 100.00);

update departments set over_head_costs = 550 where department_id = 103;
update departments set department_name = "Apparel" where department_name ="clothes";
alter table products add product_sales float(10,2);

alter table products alter product_sales set default 0.00;

alter table departments modify column over_head_costs float(10,2);

update products set product_sales = 0.00;

update products set stock_quantity = 12 where item_id = 1006;

delete from products where product_name = "wooden table";
delete from departments where department_name = "furnitures" and department_id=113;

select * from products;
select * from departments;

select a.*, sum(b.product_sales), (sum(b.product_sales) - a.over_head_costs) as total_profit 
from departments as a 
inner join products as b on a.department_name = b.department_name
group by a.department_name 
order by a.department_id;