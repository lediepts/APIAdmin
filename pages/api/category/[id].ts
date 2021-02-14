import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import CategorySchema from "../../../models/category";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
  } catch (error) {
    res.status(500).send(error.message);
    res.end();
  }

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET" /* Get a model by ID */:
      try {
        const category = await CategorySchema.findById(id);
        if (!category) {
          return res.status(404).send("ID does not exits");
        }
        res.status(200).json(category);
      } catch (error) {
        res.status(500).send(error.message);
      }
      break;

    case "PUT" /* Update a model by ID */:
      try {
        const category = await CategorySchema.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!category) {
          return res.status(404).send("ID does not exits");
        }
        res.status(200).json(category);
      } catch (error) {
        res.status(500).send(error.message);
      }
      break;

    case "DELETE" /* Delete a model by ID */:
      try {
        const sub = await CategorySchema.find({
          parentId: id,
        });
        if(sub.length){
          return res.status(409).end();
        }
        const category = await CategorySchema.findById(id);
        if (!category) {
          return res.status(404).send("ID does not exits");
        }
        await CategorySchema.deleteOne({ _id: id });
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(500).send(error.message);
      }
      break;

    default:
      res.status(500).send("Server error!");
      break;
  }
}
