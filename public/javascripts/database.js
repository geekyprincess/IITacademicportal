var pg = require('pg');
var username = 'postgres';
var password = 'password';
var host = 'localhost';
var port ='5432';
var dbname = 'academicportal';

var conStringPri = 'postgres://' + username +":" + password +'@'+host+':'+port+'/' +dbname;
var conn = process.env.DATABASE_URL || conStringPri;

var client = new pg.Client(conn);
client.connect();
var query = [];
query1 =[client.query('CREATE TABLE if not exists deptmaster(dpid VARCHAR(20) PRIMARY KEY not null,deptname VARCHAR(50) not null)'),
				client.query('CREATE TABLE if not exists coursemaster(crid VARCHAR(20) PRIMARY KEY not null, dpid VARCHAR(20) REFERENCES deptmaster(dpid),coursename VARCHAR(50) not null,credits varchar(50) not null,pre_req1 varchar(50), pre_req2 varchar(50), pre_req3 varchar(50), pre_req4 varchar(50) )'),			
				client.query('CREATE TABLE if not exists faculty(fcid VARCHAR(20) PRIMARY KEY not null, name VARCHAR(50) not null,  title VARCHAR(20) not null, dpid VARCHAR(20) REFERENCES deptmaster(dpid), emailid varchar(50),  areas varchar(50) not null, contactno VARCHAR(50) )'),
				client.query('CREATE TABLE if not exists student(stid VARCHAR(20) PRIMARY KEY not null, name VARCHAR(50) not null, dpid VARCHAR(20) REFERENCES deptmaster(dpid),  year VARCHAR(20) not null,  degree VARCHAR(20) not null,  address varchar(50) not null,  emailid varchar(50),  contactno VARCHAR(50) )'),
				client.query('CREATE TABLE if not exists coursesoffered(crid VARCHAR(20) not null, facid VARCHAR(50) not null, semid VARCHAR(20) not null, slotid VARCHAR(20),  numseats int,  totalapplicants int,  statuscode varchar(10))'),
				client.query('CREATE TABLE if not exists coursesregistered(crid VARCHAR(20) not null, stid VARCHAR(50) not null, semid VARCHAR(20) not null)'),
				];

for(var i = 0; i < query1.length; i++){
	var query = query1[i];
	query.on('end',function(){
		console.log(i);

	})
}
