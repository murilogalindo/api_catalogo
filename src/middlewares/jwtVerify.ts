import type { Request, Response, NextFunction } from "express";
import jasonwebtoken from 'jsonwebtoken'; 


export const jwtVerify = (
    request: Request,
     response: Response, 
     netx: NextFunction
) => {
          const token = request.headers?.authorization || "";
    
          if(!token){
          
            return response.status(401).json({ message: "Token não encontrado" });
          }
    
          try {
            const decoded = jasonwebtoken.verify(token, process.env.SECRET_KEY || "");
    
            } catch (error) {
        return response.status(401).json({ message: "Usuario nao autorizado"});
        
      }
    };

    // The 'next' function is provided by Express as a parameter to the middleware.
    // You do not need to implement it yourself. Remove this function entirely.

