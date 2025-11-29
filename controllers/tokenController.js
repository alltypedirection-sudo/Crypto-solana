import { buildToken } from "../services/tokenService.js";

export const createToken = async (req, res) => {
  try {
    const { name, symbol, supply, payerPrivateKey } = req.body;

    if (!name || !symbol || !supply || !payerPrivateKey) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await buildToken(name, symbol, supply, payerPrivateKey);
    res.json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
