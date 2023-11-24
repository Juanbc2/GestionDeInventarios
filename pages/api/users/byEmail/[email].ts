import prisma from "@/service/prisma";
import { checkPrivateApi, checkProtectedApi } from "@/utils/checkPrivateApi";
import type { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface ResponseData {
  id?: { id: string };
  message?: string;
}

const userApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  await checkPrivateApi(req, res);
  if (req.method === "GET") {
    const userEmail = req.query.email as string;
    const id = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true },
    });
    if (!id) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({ id });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default userApi;
