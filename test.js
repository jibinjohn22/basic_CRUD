var sql = require('mssql');
var express = require('express');
const res = require('express/lib/response');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json())


var config = {
    user: "sa",
    password: "abc",
    server: "DESKTOP-8PK2AOR\\SQLEXPRESS",
    database: "customers",
    options: {
      trustedConnection: true
    },
    port: '1433'
  };
  
var cp = new sql.ConnectionPool(config);

  //connect the pool and start the web server when done
cp.connect().then(function () {
    console.log('Connection pool open for duty');
  
    var server = app.listen(3000, function () {
  
      var host = server.address().address;
      console.log("hisr", server.address());
  
      var port = server.address().port;
         });
  }).catch(function (err) {
    console.error('Error creating connection pool', err);
  });

 /////getting data//////////
  app.get('/api/customers', function(request, response){
    var request = new sql.Request(cp);
      request.query('select * from customers', function(error, results){
          if ( error ){
              response.status(400).send('Error in database operation');
          } else {
              response.send(results);
          }
      });
  });

 
///////posting or creating////////
 
  app.post('/api/customers',function(req,res){
    const request = new sql.Request(cp);
console.log("fwf", req.body)
    
 const names={
   customerName:req.body.customerName,
  phoneNumber:req.body.phoneNumber,
  products: req.body.products
}
const sqll = "INSERT INTO customers (customerName, phoneNumber, products) VALUES ('"+names.customerName +"','"+names.phoneNumber +"','"+names.products +"')";
request.query(sqll, (error, results)=> {
  console.log("qqqqq",req.body.customerName)
  if ( error ){
            res.status(400).send('Error in database operation');
        } else {
            res.send(results);
        }
      });
});


////updating///////
app.put('/api/customers/:customerName',function(req,res){
  const request = new sql.Request(cp);
  console.log("fwf", req.body)

  const names={
       customerName:req.params.customerName,
       phoneNumber:req.body.phoneNumber,
       products: req.body.products
 }
 const sqll = "UPDATE Customers SET phoneNumber = '"+names.phoneNumber +"', products= '"+names.products +"' WHERE CustomerName ='"+req.params.customerName+"' ;";
 request.query(sqll, (error, results)=> {
  console.log("qqqqq",req.params.customerName)
  if ( error ){
            res.status(400).send('Error in database operation');
        } else {
            res.send(results);
        }
      });
});


//////delete////////////
app.delete('/api/customers/:customerName',function(req,res){
  const request = new sql.Request(cp);
  console.log("fwf", req.body)

  const sqll = "DELETE FROM Customers WHERE CustomerName='"+req.params.customerName+"';";
 request.query(sqll, (error, results)=> {
  console.log("qqqqq",req.params.customerName)
  if ( error ){
            res.status(400).send('Error in database operation');
        } else {
            res.send(results);
        }
      });
})