import { NextApiRequest, NextApiResponse } from "next";
import { InventoryMovement } from "@prisma/client";
import prisma from "@/service/prisma";

type ResponseData = {
  movements?: InventoryMovement[];
  message?: string;
};

const inventoryApi = async (req: NextApiRequest, res: NextApiResponse) => {
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
