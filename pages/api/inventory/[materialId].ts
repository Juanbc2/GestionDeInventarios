import { NextApiRequest, NextApiResponse } from "next";
import type { InventoryMovement } from "@prisma/client";
import prisma from "@/service/prisma";
import { checkPrivateApi } from "@/utils/checkPrivateApi";

type ResponseData = {
  movements?: InventoryMovement[];
  message?: string;
};

const inventoryApi = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {

  await checkPrivateApi(req, res);

  if (req.method === "GET") {
    const materialId = req.query.materialId as string;
    const movements = await prisma.inventoryMovement.findMany({
      where: {
        materialId: materialId,
      },
      include: {
        createdBy: {
          select: { name: true },
        },
      },
    });
    return res.status(200).json({ movements: movements });
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default inventoryApi;
