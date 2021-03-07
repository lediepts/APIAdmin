// import multer from "multer";
// import { NextApiRequest, NextApiResponse } from "next";
// import nextConnect from "next-connect";

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: "./public/uploads",
//     filename: (_req, file, cb) => {
//       cb(null, file.originalname);
//       console.log(file);
//     },
//   }),
// });

// const apiRoute = nextConnect({
//   onError(error, _req: NextApiRequest, res: NextApiResponse) {
//     res
//       .status(501)
//       .json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// apiRoute.use(upload.single("file"));

// apiRoute.post(async (_req, res) => {
//   res.status(200).json({ data: "success" });
// });

// export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// };

// let formData = new FormData();
// formData.append("file", file[0], file[0].name);
// const config = {
//   headers: { 'content-type': 'multipart/form-data' },
// }

// const response = await axios.post('/api/upload', formData, config)

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    default:
      res.status(405).send({
        error: true,
        message: `${method} is not support`,
      });
      break;
  }
}
