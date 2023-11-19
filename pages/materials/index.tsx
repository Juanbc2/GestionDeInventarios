import ProtectedRoute from "@/components/ProtectedRoute";
import { AddMaterialDialog } from "@/components/materials/AddMaterialDialog";
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

  const openDialog = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <main className="flex flex-row bg-slate-200 font-medium w-auto h-screen">
      <SideMenu />
      <AddMaterialDialog open={open} setOpen={setOpen} />
      <div className="flex flex-col p-4 items-center">
        <h1 className="text-center">Gestión de materiales</h1>
        <section className="flex flex-col p-4 items-center">
          <ProtectedRoute roleName="ADMIN">
            <button onClick={() => setOpen(true)} className="border border-slate-950 rounded-sm p-2">
              Agregar material
            </button>
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
