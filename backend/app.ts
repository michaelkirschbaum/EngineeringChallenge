import express, {Request, Response} from 'express';
import {getMachineHealth} from './machineHealth';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import session from 'express-session';

const app = express();
const port = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// set environment variables
dotenv.config();

// session middleware
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
}));

function verifyToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.session.user = user.username;

    next();
  })
}

// Endpoint to login
app.post('/login', async (req: Request, res, Response) => {
  try {
    const { username } = req.body;

    const token = jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET as string,
      {}
    );

    res.status(200).json({
      success: true,
      message: "login successful",
      token: token,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message.toString(),
    });
  }
});

// Endpoint to get machine health score
app.post('/machine-health', verifyToken, (req: any, res: Response) => {
  const result = getMachineHealth(req);
  if (result.error) {
    res.status(400).json(result);
  } else {
    res.json(result);
  }
});

app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});
