// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@prisma/client";
import prisma from "@/service/prisma";

type ResponseData = {
  users?: User[];
  message?: string;
  newUser?: User;
};

const UsersApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  try {
    if (req.method === "GET") {
      const users = await prisma.user.findMany();
      res.status(200).json({ users });
    }
    if (req.method === "POST") {
      const { name, email, roleId } = req.body;
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          roleId,
        },
      });
      return res.status(201).json({ newUser });
    }
    return res.status(404).json({ message: "Not Found" });
  } catch (err) {
    return res.status(405).json({ message: "Method not allowed" });
  }
};

export default UsersApi;
