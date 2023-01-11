import express from 'express';
import coinRouter from "./routes/coins.routes";
import userRouter from "./routes/user.routes";
import cors from 'cors';

const app = express();

app.use(express.json()); 
app.use(cors());
app.use('/api/v1', coinRouter); 
app.use('/api/auth', userRouter); 

export default app;