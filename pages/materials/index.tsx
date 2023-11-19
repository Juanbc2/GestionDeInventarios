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
    <main className="flex flex-row  font-medium w-auto h-screen">
      <SideMenu />
      <AddMaterialDialog 
        open={open} 
        setOpen={setOpen} 
      />
      <div className="flex flex-col py-12 gap-12 mx-28 w-full">
      <h1 className="flex justify-center h-32" style={{fontWeight: 400, fontSize: 48}}>Gestión de Materiales</h1>
      <div className="flex flex-col gap-4">
        <ProtectedRoute roleName="ADMIN">
          <div className="flex justify-end w-full">
            <PrimaryButton text="Agregar material" onClick={() => setOpen(true)} />
          </div>
        </ProtectedRoute>
      
        <section className="flex flex-col w-full border-2">
          <table className="table-auto">
            <thead className="bg-[#2D8F1D]">
                <tr>
                  <td className="px-4 py-2">Identificador</td>
                  <td className="px-4 py-2">Fecha de creación</td>
                  <td className="px-4 py-2">Nombre</td>
                  <td className="px-4 py-2">Saldo</td>
                  <td className="px-4 py-2">Creado por</td>
                </tr>
              </thead>
              <tbody>
                {materials.map((material, index) => (
                  <tr key={material.id} style={{ backgroundColor: index % 2 !== 0 ? '#f2f2f2' : 'transparent' }}>
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
      </div>
    </main>
  );
};

export default Materials;
