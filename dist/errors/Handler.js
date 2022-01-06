"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const errorHandler = (error, request, response, next) => {
    //**********************8PRECISA CORRIGIR O IF
    ///Se o erro for da instancia da classe ValidationError 
    if (error instanceof yup_1.ValidationError) {
        let errors = {};
        // error.inner.forEach(err => {
        //   try{
        //   errors[err.path] = err.errors;
        //   }catch(error){
        //     console.log(error)
        //   }
        // });
        return response.status(400).json({ message: 'Validations fails', errors });
    }
    console.error(error);
    return response.status(500).json({ message: 'Internal Server Error' });
};
exports.default = errorHandler;
