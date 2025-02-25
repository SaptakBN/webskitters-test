import User from "../models/user";

const seed = async () => {
  try {
    const user = await User.findOne({ email: "admin@gmail.com" });
    if (!user) {
      await User.create({ email: "admin@gmail.com", password: "123456", role: "admin" });
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Admin user creation error:", error);
  }
};

export default seed;
