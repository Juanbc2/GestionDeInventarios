import ProtectedRoute from "@/components/ProtectedRoute";
import { AddMaterialDialog } from "@/components/materials/AddMaterialDialog";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SideMenu } from "@/components/ui/SideMenu";
import React, { useState } from "react";

const Materials = () => {
  const [materials, setMaterials] = useState([
    {
      id: "",
      createdAt: "",
      name: "",
      balance: "",
      createdBy: "",
    },
  ]);

  const [open, setOpen] = useState(false);

  return (
    <main className="flex flex-row bg-slate-200 font-medium w-auto h-screen">
      <SideMenu />
      <AddMaterialDialog open={open} setOpen={setOpen} />
      <div className="flex flex-col p-4 items-center gap-4">
        <h1 className="text-center">Gestión de materiales</h1>
        <section className="flex flex-col p-4 items-center">
          <ProtectedRoute roleName="ADMIN">
            <div className="flex justify-end w-full">
              <PrimaryButton text="Agregar material" onClick={() => setOpen(true)} />
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
                  <td className="border px-4 py-2">{material.createdAt}</td>
                  <td className="border px-4 py-2">{material.name}</td>
                  <td className="border px-4 py-2">{material.balance}</td>
                  <td className="border px-4 py-2">{material.createdBy}</td>
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
