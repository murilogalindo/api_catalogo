import type { Request, Response } from "express";

import CagegoryModel from "../models/categoryModel.js";
import { request } from "http";


type CategoryBody = {
    nome: string
};
export const categoryControllerPost = async (
    request: Request, 
    response: Response

    ) => {
        const body: CategoryBody = request.body;
        console.log("Body recebido no /register:", body); // <-- AQUI
        try {
            const categpory = await CagegoryModel.create(body);
            return response.status(201).json(categpory)

        } catch (error) {
            return response.status(500).json({message: "Deu merda"});
        }
        
    };

    export const categoryControllerGetAll = async (
        request: Request,
        response: Response  
    ) => {
        try {
            const category = await CagegoryModel.find();

            return response.status(200).json(category); 
        } catch (error) {
            return response.status(500).json({message: "Deu merda ao buscar categorias"});
            
        }
    }
