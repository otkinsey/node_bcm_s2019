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
    res.format({
        'application/json': () => {
            // emp = JSON.stringify(employee.lookupById(req.params.id));  
            console.log('json');
            res.json(employee.lookupById(req.params.id));    
        },
        'application/xml': () => {
            var emp = '<?xml version="1.0"?>\n<employee>\n' +
            JSON.stringify(employee.lookupById(req.params.id))+'</employee>';
            console.log('xml');
            res.type('application/xml');
            res.send(emp);
        },
        'text/html': () => {
            var emp = employee.lookupById(req.params.id);
            console.log('html - emp: '+ emp[0].firstName);
            res.render('employee',  { thisEmployee: emp[0] });
        },
        'default': () => {
            res.status(404);
            res.send('<b>404 - Not Found</b>');
        }
    });
});

// employee list view:
// Should be capable of handling json, xml, and html requests.
// Use the employeeModule to lookup the employees for the request parameter.
// For html request, render the employeeList view
// passing the name and the employees as the model
app.get('/lastname/:name', (req, res) => {
    res.format({
        'application/json': () => {
            // emp = JSON.stringify(employee.lookupById(req.params.id));  
            console.log('json');
            res.json(employee.lookupByLastName(req.params.name));    
        },
        'application/xml': () => {
            var emp = '<?xml version="1.0"?>\n<employee>\n' +
            JSON.stringify(employee.lookupByLastName(req.params.name))+'</employee>';
            console.log('xml');
            res.type('application/xml');
            res.send(emp);
        },
        'text/html': () => {
            var allEmployees = employee.data;
            var emp = employee.lookupByLastName(req.params.name);
     
            res.render('employeeList', { employeeList: allEmployees, selectedEmployee: emp, lastname: emp[0].lastName } );
        },
        'default': () => {
            res.status(404);
            res.send('<b>404 - Not Found</b>');
        }
    });
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
    newEmployee = employee.addEmployee(req.body.firstName.toLowerCase(), req.body.lastName.toLowerCase());
    res.redirect('/lastname/'+req.body.lastName.toLowerCase(), );
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});