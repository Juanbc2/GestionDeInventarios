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
    <main className="flex flex-row  font-medium w-auto h-screen">
      <SideMenu />
      <AddMaterialDialog open={open} selectedValue={""} onClose={handleClose} />
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
      </div>
    </main>
  );
};

export default Materials;
