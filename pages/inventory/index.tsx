import AddMovementDialog from "@/components/inventory/AddMovementDialog";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SideMenu } from "@/components/ui/SideMenu";
import { notify } from "@/utils/toast";
import { get } from "http";
import React, { useEffect, useState } from "react";

const Inventory = () => {
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
      if (result.materials.length > 0) {
        setMaterials(result.materials);
      } else {
        setMaterials([]);
        notify("Error", "No hay materiales disponibles");
      }
    } catch (error) {
      notify("Error", "No se pudo obtener la lista de materiales");
    }
  };

  const [selectedMaterialId, setSelectedMaterialId] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState({
    id: "",
    createdAt: "",
    name: "",
    quantity: "",
    createdBy: {
      name: "",
    },
  });

  const handleSelectedMaterial = (id: string) => {
    let material = materials.find((material) => material.id === id);
    if (!material) {
      notify("Error", "No se pudo encontrar el material");
      return;
    }
    setSelectedMaterialId(id);
    setSelectedMaterial(material);
  };

  const [inventory, setInventory] = useState([
    {
      id: "",
      createdAt: "",
      movementType: "",
      quantity: "",
      createdBy: {
        name: "",
      },
    },
  ]);

  const getInventory = async () => {
    if (!selectedMaterialId) return;
    try {
      const result = await fetch(
        `http://localhost:3000/api/inventory/${selectedMaterialId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      if (result.movements.length > 0) setInventory(result.movements);
      else {
        setInventory([
          {
            id: "",
            createdAt: "",
            movementType: "",
            quantity: "",
            createdBy: {
              name: "",
            },
          },
        ]);
        notify("Error", "No hay movimientos de inventario");
      }
    } catch (error) {
      notify(
        "Error",
        "No se pudo obtener la lista de movimientos de inventario"
      );
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (!selectedMaterialId) {
      notify("warning", "Seleccione un material");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    getInventory();
    setOpen(false);
  };

  useEffect(() => {
    getMaterials();
  }, []);

  useEffect(() => {
    getInventory();
  }, [selectedMaterial]);

  return (
    <main className="flex font-medium w-screen h-screen overflow-hidden">
      <SideMenu />
      <AddMovementDialog
        open={open}
        selectedValue={""}
        onClose={handleClose}
        selectedMaterial={selectedMaterial}
      />
      <div className="flex flex-col py-12 gap-12 mx-28 w-full">
        <h1
          className="flex justify-center h-32"
          style={{ fontWeight: 400, fontSize: 48 }}
        >
          Gestión de Inventarios
        </h1>
        <section className="flex flex-col gap-4">
          <div className="flex justify-between">
            <select
              className=" hover:bg-[#f2f2f2] font-bold py-2 px-4 rounded"
              name=""
              id=""
              value={selectedMaterialId}
              onChange={(e) => handleSelectedMaterial(e.target.value)}
            >
              <option value="" disabled>
                Seleccione un material
              </option>
              {materials.map((material) => (
                <option key={material.id} value={material.id}>
                  {material.name}
                </option>
              ))}
            </select>
            <PrimaryButton text="Agregar movimiento" onClick={handleOpen} />
          </div>

          <div
            className="flex flex-col w-full border-2"
            style={{ maxHeight: "300px", overflow: "auto" }}
          >
            <table className="table-auto">
              <thead className="bg-[#2D8F1D]">
                <tr>
                  <td className="px-4 py-2">Identificador</td>
                  <td className="px-4 py-2">Entrada</td>
                  <td className="px-4 py-2">Salida</td>
                  <td className="px-4 py-2">Responsable</td>
                </tr>
              </thead>
              <tbody>
                {selectedMaterialId
                  ? inventory.map((movement) => (
                      <tr key={movement.id}>
                        <td className="border px-4 py-2">{movement.id}</td>
                        <td className="border px-4 py-2">
                          {movement.movementType === "ENTRADA"
                            ? movement.quantity
                            : ""}
                        </td>
                        <td className="border px-4 py-2">
                          {movement.movementType === "SALIDA"
                            ? movement.quantity
                            : ""}
                        </td>
                        <td className="border px-4 py-2">
                          {movement.createdBy.name}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </section>
        <section>
          {/* TODO Graph */}
          Gráfica
        </section>
      </div>
    </main>
  );
};

export default Inventory;
