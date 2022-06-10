import { client } from "../../lib/sanityClient";
import type { NextApiRequest, NextApiResponse } from "next";

const swapTokens = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const txDoc = {
      _type: "transactions",
      _id: req.body.txHash,
      txHash: req.body.txHash,
      fromAddress: req.body.from,
      toAddress: req.body.to,
      amount: req.body.amount,
      timestamp: new Date(Date.now()).toISOString(),
    };

    await client.createIfNotExists(txDoc);

    res.status(201).send({ message: "success" });
    console.log("swapTokens success");
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    res.status(500).send({ message: "error", data: message });
  }
};

export default swapTokens;
