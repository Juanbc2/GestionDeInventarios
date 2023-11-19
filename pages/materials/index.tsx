import ProtectedRoute from "@/components/ProtectedRoute";
import AddMaterialDialog from "@/components/materials/AddMaterialDialog";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SideMenu } from "@/components/ui/SideMenu";
import { notify } from "@/utils/toast";
import React, { useState, useEffect } from "react";

const Materials = () => {
  const [materials, setMaterials] = useState([
    {
      id: "",
      createdAt: "",
      name: "",
      quantity: "",
      createdBy: { name: "" },
    },
  ]);

  const getMaterials = async () => {
    try {
      const result = await fetch("http://localhost:3000/api/materials", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      if (result.materials.length > 0) setMaterials(result.materials);
    } catch (error) {
      notify("Error", "No se pudo obtener la lista de materiales");
    }
  };

  useEffect(() => {
    getMaterials();
  }, []);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    getMaterials();
    setOpen(false);
  };

  return (
    <main className="flex flex-row bg-slate-200 font-medium w-auto h-screen">
      <SideMenu />
      <AddMaterialDialog open={open} selectedValue={""} onClose={handleClose} />
      <div className="flex flex-col p-4 items-center gap-4">
        <h1 className="text-center">Gestión de materiales</h1>
        <section className="flex flex-col p-4 items-center">
          <ProtectedRoute roleName="ADMIN">
            <div className="flex justify-end w-full">
              <PrimaryButton
                text="Agregar material"
                onClick={() => setOpen(true)}
              />
            </div>
          </ProtectedRoute>
          <table>
            <thead>
              <tr>
                <th className="px-4 py-2">Identificador</th>
                <th className="px-4 py-2">Fecha de creación</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Saldo</th>
                <th className="px-4 py-2">Creado por</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material.id}>
                  <td className="border px-4 py-2">{material.id}</td>
                  <td className="border px-4 py-2">
                    {new Date(material.createdAt).toLocaleDateString().split("/").join("-")}
                  </td>
                  <td className="border px-4 py-2">{material.name}</td>
                  <td className="border px-4 py-2">{material.quantity}</td>
                  <td className="border px-4 py-2">
                    {material.createdBy.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
};

export default Materials;
