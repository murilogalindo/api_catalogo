import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import { registerConroller } from './controllers/authController.js';
import { authController } from './controllers/authController.js';
import { jwtVerify} from  './middlewares/jwtVerify.js';
import { testController } from './controllers/testController.js';
import { categoryControllerPost } from './controllers/categoryController.js';
//             if (!resultadoCompracaoSenha) {

dotenv.config();

const app = express();
app.use(express.json());

async function startServer() {
  try {
    await mongoose.connect(process.env.STRING_BANCO_DADOS || "");
    console.log("Conectado ao MongoDB com sucesso.");

    app.get('/ping', (request, response) => {
      return response.json({ message: 'Pong' });
    });

    app.post('/register', registerConroller);
    app.post('/auth', authController);

    app.get('/test-private', jwtVerify, testController);

    //CAGETOIAS
    app.post('/categorias', jwtVerify, categoryControllerPost)

    app.get('/categorias', jwtVerify, categoryControllerPost);

    app.listen(3333, () => {
      console.log("Server is running on port 3333");
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
}

startServer();
