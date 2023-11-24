import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Enum_RoleName } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const checkPrivateApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return session.user;
};

const checkProtectedApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  roleName: Enum_RoleName
) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (session?.user?.role !== roleName) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

export { checkPrivateApi, checkProtectedApi };
