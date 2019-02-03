

var data = [
    {id:1, firstName:'richard', lastName:'cotton'},
    {id:2, firstName:'richard', lastName:'twena'},
    {id:3, firstName:'bobby', lastName:'lewis'},
    {id:4, firstName:'carlos', lastName:'espiranza'},
    {id:10, firstName:'Agusto', lastName:'Pinochet'}
];

module.exports = {
  lookupById: function(arg){
                let resultArray = [];
                id = arg.substring(1, arg.toString().lastIndexOf('\''));
                var i = 0;
                // diagnostic output
                console.log('[DIAGNOSTIC: employeeModule_v1 - lookupById] id: '+id[0]);
                data.forEach(function(element){
                  if(element.id == id){
                    
                    resultArray.push(element);
                    console.log('current id: '+element.id);
                    i++;
                  }
                });
                return resultArray;
            },

  lookupByLastName: function(lastName){
    let resultArray = [];
    var i = 0;
    data.forEach(function(element){
      if(element.lastName == lastName){
        resultArray.push(element);
        // console.log(resultArray);
        i++;        
      }else if(resultArray == []){
        return 'undefined';
      }     
    });
    return resultArray;
  },

  addEmployee: function(f, l, id = data.length+1){
      newObject = {id:id, firstName:f, lastName:l};
      data.push(newObject); 
      console.log('\nnew array: '+data.values+'\n');    
      return data;  
  }
}

module.exports.data = data;