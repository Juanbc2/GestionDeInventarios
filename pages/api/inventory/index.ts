import { NextApiRequest, NextApiResponse } from "next";
import type { InventoryMovement } from "@prisma/client";
import prisma from "@/service/prisma";
import { checkPrivateApi, checkProtectedApi } from "@/utils/checkPrivateApi";

type ResponseData = {
  movements?: InventoryMovement[];
  message?: string;
  newMovement?: InventoryMovement;
};

const InventoryApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  try {
    await checkPrivateApi(req, res);

    if (req.method === "GET") {
      const movements = await prisma.inventoryMovement.findMany();
      res.status(200).json({ movements });
    }
    if (req.method === "POST") {
      await checkProtectedApi(req, res, "ADMIN");
      const { movementType, quantity, materialId, userId } = req.body;
      const newMovement = await prisma.inventoryMovement.create({
        data: {
          movementType,
          quantity,
          material: { connect: { id: materialId } },
          createdBy: { connect: { id: userId } },
        },
      });
      return res.status(201).json({ newMovement });
    }
    return res.status(404).json({ message: "Not Found" });
  } catch (err) {
    return res.status(405).json({ message: "Method not allowed" });
  }
};

export default InventoryApi;
