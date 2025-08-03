import type { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import UsuarioModel from '../models/userModel.js';   
import jasonwebtoken from 'jsonwebtoken'; 

type BodyRegister = {
    email: string;
    name: string;
    password: string;
    phone: string;
};

export const registerConroller = async (
    request: Request, response: Response
) => {
    try {
        const body: BodyRegister = request.body;
            console.log("Body recebido no /register:", body); // <-- AQUI
        const userExiste = await UsuarioModel.findOne({ email: body.email });

        if (userExiste) {
            return response.status(400).json({
                message: "Usuário já existe: email já cadastrado"
            }); 
        }

       const hashedPassword = await bcryptjs.hash(body.password, 5);
    body.password = hashedPassword;

        await UsuarioModel.create(body);
       
        return response.json({
            message: `${body.name} foi cadastrado com sucesso`,
        });
        

    } catch (error) {
        return response.status(500).json({ error });
    }
};

type BodyAuth = {
    email: string;
    password: string;
}

export const authController = async (
    request: Request, response: Response) => {

        const body: BodyAuth = request.body;

        try {
            const usuario = await UsuarioModel.findOne({email: body.email});

            if (!usuario) {
                return response.status(404).json({
                    message: "Usuário não encontrado"
                });
            }
            const resultadoCompracaoSenha = bcryptjs.compareSync(body.password, usuario.password);
            if (!resultadoCompracaoSenha) {
                return response.status(400).json({
                    message: "Senha e/ou email invalidos"
                });
            }
            const token = jasonwebtoken.sign({id: usuario._id}, process.env.SECRET_KEY || "")
                        

            return response.json({name: usuario.name, email: usuario.email, token: token});
            

        } catch (error) {
            return response.status(500).json({ error });
            
        }

};