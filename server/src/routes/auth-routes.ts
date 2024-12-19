import { Router, Request, Response } from 'express';
import { User } from '../models/user';  // Import the User model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing

// Login function to authenticate a user
export const login = async (req: Request, res: any) => {
  const { email, password } = req.body;  // Extract username and password from request body

  // Find the user in the database by username
  const user = await User.findOne({
    where: { email },
  });

  // If user is not found, send an authentication failed response
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Compare the provided password with the stored hashed password
  const passwordIsValid = await bcrypt.compare(password, user.password);
  // If password is invalid, send an authentication failed response
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ id: user.id, username: user.username, email }, secretKey, { expiresIn: '1h' });
  return res.json({ token });  // Send the token as a JSON response
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });

    console.log(newUser);
    
      // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, secretKey, { expiresIn: '1h' });
    res.json({ token });  // Send the token as a JSON response
    // res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

// Create a new router instance
const router = Router();

// POST /login - Login a user
router.post('/login', login);  // Define the login route

// POST /users - Create a new user
router.post('/signup', signUp);

export default router;  // Export the router instance
