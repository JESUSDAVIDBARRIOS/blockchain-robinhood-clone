import { client } from "../../lib/sanityClient";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  data?: string;
};

const createUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const userDoc = {
        _type: "users",
        _id: req.body.walletAddress,
        userName: 'Unnamed',
        address: req.body.walletAddress,
    }

    await client.createIfNotExists(userDoc);

    res.status(200).json({ message: 'success' })

  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    res.status(500).send({ message: "error", data: message });
  }
};

export default createUser;
