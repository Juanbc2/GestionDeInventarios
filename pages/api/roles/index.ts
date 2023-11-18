// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Role } from "@prisma/client";
import prisma from "@/service/prisma";

interface ResponseData {
  roles?: Role[];
  message?: string;
  newRole?: Role;
}

const rolesApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === "GET") {
    const roles = await prisma.role.findMany();
    return res.status(200).json({ roles });
  }

  if (req.method === "POST") {
    const { name } = req.body;
    const newRole = await prisma.role.create({
      data: {
        name,
      },
    });
    return res.status(201).json({ newRole });
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default rolesApi;
