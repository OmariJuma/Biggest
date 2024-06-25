const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function getAllUsers(request, response) {
  try {
    const users = await prisma.user.findMany({});
    return response.json(users);
  } catch (error) {
    return response.status(500).json({ error: "Error fetching users" });
  }
}

async function createUser(request, response) {
  try {
    const { email, password, role } = request.body;
    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });
    return response.status(200).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return response.status(500).json({ error: "Error creating user" });
  }
}

async function updateUser(request, response) {
  try {
    const { id } = request.params;
    const { email, password, role } = request.body;
    const hashedPassword = await bcrypt.hash(password, 5);
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingUser) {
      return response.status(404).json({ error: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });

    return response.status(200).json(updatedUser);
  } catch (error) {
    return response.status(500).json({ error: "Error updating user" });
  }
}

async function deleteUser(request, response) {
  try {
    const { id } = request.params;
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return response.status(204).send();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error deleting user" });
  }
}

async function getUser(request, response) {
  const { id } = request.params;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }
  return response.status(200).json(user);
}

async function getUserByEmail(request, response) {
  try {
    const { email } = request.params;
  const { password } = request.body;
  if (email.length > 5 && password.length > 5) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (isMatch) {
      const {email, id} = user
      const token = await jwt.sign({ email, id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      if (!token) {
        return response
          .status(500)
          .json("Something wrong has happened, please try again");
      }
      return response.status(200).json({ user, token });
    }
    return response
      .status(404)
      .json({ error: "Email or password is incorrect" });
  }
  return response
    .status(404)
    .json({ error: "Your credentials are not of the required length" });
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"An error has occured, maybe its the token secret"})
  }
  
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserByEmail,
};
