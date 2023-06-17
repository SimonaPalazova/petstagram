const mongoose = require("mongoose");

exports.getErrorMessage = (err) => {
    if(err.name == 'ValidationError' || err.name == 'ValidatorError'){
        return  Object.values(err.errors).map(e=>e.properties.message);
    }else{
        return [err.message];
    }
}
    
