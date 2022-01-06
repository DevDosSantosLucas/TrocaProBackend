import { ErrorRequestHandler, Request, Response } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
  // path: string;
}



const errorHandler: ErrorRequestHandler = (error:ErrorRequestHandler, request:Request, response: Response, next) => {
  //**********************8PRECISA CORRIGIR O IF
  
  ///Se o erro for da instancia da classe ValidationError 
  if (error instanceof ValidationError){
    let errors: ValidationErrors ={};

    // error.inner.forEach(err => {
    //   try{
    //   errors[err.path] = err.errors;
    //   }catch(error){
    //     console.log(error)
    //   }
    
    // });

    return response.status(400).json({message: 'Validations fails', errors});
  }
  console.error(error);

  return response.status(500).json({message: 'Internal Server Error'});
}

export default errorHandler;