const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const underscore = require('underscore');
const employee = require('./employeeModule_v1.js');

app.engine('handlebars', handlebars({ defaultLayout:'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

handlebars.create({
    helpers: {
        makeAlist: (items, options) => {
            const alist = '<ul>';
        
            for(var i=0, l=options.length;i<l;i++){
                alist = alist + "<li>" + options.fn(items[i]) + "</li>";
            }
            return out + '</ul>';
        }
    }
});


// Home view
app.get('/', (req, res) => {
    res.render('home');
});

// employee view:
// Should be capable of handling json, xml, and html requests.
// Use the employeeModule to lookup the employee for the request parameter.
// For html request, render the employee view passing the
// id and the employee as the model.
app.get('/id/:id', (req, res) => {
    emp = JSON.stringify(employee.lookupById(req.params.id));
    console.log('[DIAGNOSTIC: expressServer.js] emp: '+req.params.id);
    res.render('employee',  {thisEmployee: emp});
});

// employee list view:
// Should be capable of handling json, xml, and html requests.
// Use the employeeModule to lookup the employees for the request parameter.
// For html request, render the employeeList view
// passing the name and the employees as the model
app.get('/lastname/:name', (req, res) => {
    var allEmployees = employee.data;
    var emp = employee.lookupByLastName(req.params.name);
    // emp = [1,2,3,5,4];
    console.log('[DIAGNOSTIC: expressServer.js - lastname/:name] emp: '+JSON.stringify(emp));    
    res.render('employeeList', { employeeList: allEmployees, selectedEmployee: emp } );
});

// new employee view
app.get('/addEmployee', (req, res) => {
    res.render('newEmployee');
});

// add employee:
// Use the employeeModule to add the employee data
// from the request body.
// Redirect the user to /lastName/<last name provided by user
app.post('/addEmployee', (req, res) => {
    // console.log('[DIAGNOSTIC: expressServer.js - post addEmployee/] emp: '+JSON.stringify(req.body));   
    newEmployee = employee.addEmployee(req.body.firstName, req.body.lastName);
    res.redirect('/lastname/'+req.body.lastName, );
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});