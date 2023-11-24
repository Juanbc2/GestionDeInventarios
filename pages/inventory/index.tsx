import { Linechart } from "@/components/charts/linechart";
import { AddMovementDialog } from "@/components/inventory/AddMovementDialog";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SideMenu } from "@/components/ui/SideMenu";
import { useGetInventoryByMaterialId } from "@/hooks/useGetInventoryByMaterialId";
import { useGetMaterialsWithCreatedBy } from "@/hooks/useGetMaterialWithCreatedBy";
import { API_SERVICES } from "@/service";
import {
  InventoryMovementWithCreatedBy,
  MaterialWithCreatedBy,
  inventoryByQuantityType,
} from "@/types";
import { notify } from "@/utils/toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface inventory {
  id: string;
  createdAt: string;
  movementType: string;
  quantity: string;
  createdBy: {
    name: string;
  };
}

const Inventory = () => {
  const { status } = useSession();

  const setView = () => {
    if (status === "unauthenticated") {
      window.open("/", "_self");
    }
  };

  useEffect(() => {
    setView();
  }, [status]);

  const { materials } = useGetMaterialsWithCreatedBy();

  const [selectedMaterialId, setSelectedMaterialId] = useState("");
  const [selectedMaterial, setSelectedMaterial] =
    useState<MaterialWithCreatedBy>();

  const handleSelectedMaterial = (id: string) => {
    const material = materials?.find((material) => material.id === id);
    if (!material) {
      notify("Error", "No se pudo encontrar el material");
      return;
    }
    setSelectedMaterialId(id);
    setSelectedMaterial(material);
  };

  const [inventory, setInventory] = useState<InventoryMovementWithCreatedBy[]>(
    []
  );

  const getInventory = async () => {
    if (!selectedMaterialId) return;
    try {
      const result = await axios.request({
        url: API_SERVICES.inventoryByMaterialId(selectedMaterialId),
        method: "GET",
      });
      if (result) {
        setInventory(JSON.parse(JSON.stringify(result.data.movements)));
        calculateInventoryByQuantity(
          JSON.parse(JSON.stringify(result.data.movements))
        );
      } else {
        setInventory([
          {
            id: "",
            materialId: "",
            createdAt: new Date(),
            movementType: "",
            quantity: 0,
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

  const [inventoryByQuantity, setInventoryByQuantity] =
    useState<inventoryByQuantityType[]>();

  const [totalBalance, setTotalBalance] = useState(0);

  const calculateInventoryByQuantity = (
    inventoryQuantity: InventoryMovementWithCreatedBy[]
  ) => {
    let quantity = 0;
    inventoryQuantity.map((movement) => {
      if (movement.movementType === "ENTRADA") {
        quantity += movement.quantity;
        movement.quantity = quantity;
      } else {
        quantity -= movement.quantity;
        movement.quantity = quantity;
      }
    });
    setTotalBalance(quantity);
    const inventoryByQuantityAux = [] as inventoryByQuantityType[];
    inventoryQuantity.map((movement) => {
      inventoryByQuantityAux.push({
        createdAt: new Date(movement.createdAt)
          .toLocaleDateString()
          .split("/")
          .join("-"),
        quantity: movement.quantity,
      });
    });
    if (!inventoryByQuantityAux) {
      setInventoryByQuantity(undefined);
      return;
    }
    setInventoryByQuantity(inventoryByQuantityAux);
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
    getInventory();
  }, [selectedMaterial]);

  return (
    <main
      className="flex font-medium w-screen h-screen"
      style={{ overflowX: "hidden" }}
    >
      <SideMenu />
      {selectedMaterial ? (
        <AddMovementDialog
          open={open}
          selectedValue={""}
          onClose={handleClose}
          selectedMaterial={selectedMaterial}
        />
      ) : null}
      <div className="flex flex-col py-12 gap-12 mx-28 w-full">
        <h1
          className="flex justify-center h-32"
          style={{
            fontWeight: 400,
            fontSize: 60,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
            padding: "10px",
            transition: "transform 0.3s ease-in-out",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.transform = "scale(1.3)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.transform = "scale(1)")
          }
        >
          Gesti&oacute;n de Inventarios
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
              {materials
                ? materials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.name}
                    </option>
                  ))
                : null}
            </select>
            <PrimaryButton text="Agregar movimiento" onClick={handleOpen} />
          </div>

          <div
            className="flex flex-col w-full border-2"
            style={{
              maxHeight: "200px",
              overflow: "auto",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            <table className="table-auto">
              <thead className="bg-[#10b981] sticky top-0">
                <tr>
                  <td className="px-4 py-2">Identificador</td>
                  <td className="px-4 py-2">Fecha</td>
                  <td className="px-4 py-2">Entrada</td>
                  <td className="px-4 py-2">Salida</td>
                  <td className="px-4 py-2">Responsable</td>
                </tr>
              </thead>
              <tbody>
                {selectedMaterialId && inventory
                  ? inventory.map((movement, index) => (
                      <tr
                        key={movement.id}
                        style={{
                          backgroundColor:
                            index % 2 !== 0 ? "#f2f2f2" : "transparent",
                        }}
                      >
                        <td className="border px-4 py-2">{movement.id}</td>
                        <td className="border px-4 py-2">
                          {new Date(movement.createdAt)
                            .toLocaleDateString()
                            .split("/")
                            .join("-")}
                        </td>
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
        <section
          className="flex self-center"
          style={{ maxHeight: "400px", maxWidth: "1000px" }}
        >
          {selectedMaterialId &&
          inventoryByQuantity &&
          inventoryByQuantity?.length > 0 ? (
            <Linechart
              inventory={inventoryByQuantity}
              totalBalance={totalBalance.toString()}
            />
          ) : null}
        </section>
      </div>
    </main>
  );
};

export default Inventory;
