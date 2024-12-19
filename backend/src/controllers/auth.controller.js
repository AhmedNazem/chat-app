export const signup = (req, res) => {
  res.send("sign up");
};

export const login = (req, res) => {
  res.send("Login route");
};

export const logout = (req, res) => {
  res.json({ message: "logout" });
};
