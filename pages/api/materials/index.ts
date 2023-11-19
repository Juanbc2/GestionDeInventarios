import prisma from "@/service/prisma";
import { Material } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    materials?: Material[];
    message?: string;
    };

const MaterialsApi = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    try {
        if (req.method === "GET") {
        const materials = await prisma.material.findMany();
        console.log(materials);
        res.status(200).json({ materials });
        }
        //TODO crear metodo POST para crear materiales
        return res.status(404).json({ message: "Not Found" });
    }catch (err) {
        return res.status(405).json({ message: "Method not allowed" });
    }
}

export default MaterialsApi;