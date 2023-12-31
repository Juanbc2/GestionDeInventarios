import prisma from "@/service/prisma";
import { checkPrivateApi } from "@/utils/checkPrivateApi";
import type { Material } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  materials?: Material[];
  message?: string;
  newMaterial?: Material;
};

const MaterialsApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {

  await checkPrivateApi(req, res);

  try {
    if (req.method === "GET") {
      const materials = await prisma.material.findMany({
        include: {
          createdBy: {
            select: { name: true },
          },
        },
      });
      return res.status(200).json({ materials });
    }
    if (req.method === "POST") {
      const { name, quantity, userId } = req.body;
      const newMaterial = await prisma.material.create({
        data: { name, quantity, createdBy: { connect: { id: userId } } },
      });
      return res.status(200).json({ newMaterial });
    }
    return res.status(404).json({ message: "Not Found" });
  } catch (err) {
    return res.status(405).json({ message: "Method not allowed" });
  }
};

export default MaterialsApi;
