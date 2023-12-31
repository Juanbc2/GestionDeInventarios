import prisma from "@/service/prisma";
import { checkPrivateApi, checkProtectedApi } from "@/utils/checkPrivateApi";
import type { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface ResponseData {
  users?: User;
  message?: string;
  updatedUser?: User;
}

const userApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  await checkPrivateApi(req, res);
  await checkProtectedApi(req, res, "ADMIN");
  if (req.method === "PUT") {
    const userId = req.query.id as string;
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: { name: req.body.name, roleId: req.body.roleId },
    });
    return res.status(200).json({ updatedUser });
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default userApi;
