const prisma = require("../prisma/prismaClient");

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to create user",
    });
  }
};

module.exports = {
  createUser,
};

