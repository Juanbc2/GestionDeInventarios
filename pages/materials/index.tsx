import { PrivateComponent } from "@/components/PrivateComponent";
import { AddMaterialDialog } from "@/components/materials/AddMaterialDialog";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SideMenu } from "@/components/ui/SideMenu";
import { useGetMaterialsWithCreatedBy } from "@/hooks/useGetMaterialWithCreatedBy";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

const Materials = () => {
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

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <main className="flex flex-row  font-medium w-auto h-screen">
      <SideMenu />
      <AddMaterialDialog open={open} selectedValue={""} onClose={handleClose} />
      <div className="flex flex-col py-12 gap-12 mx-28 w-full">
        <h1
          className="flex justify-center h-32"
          style={{
            fontWeight: 400,
            fontSize: 60,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
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
          Gesti&oacute;n de Materiales
        </h1>
        <div className="flex flex-col gap-4">
          <PrivateComponent roleName="ADMIN">
            <div className="flex justify-end w-full">
              <PrimaryButton
                text="Agregar material"
                onClick={() => setOpen(true)}
              />
            </div>
          </PrivateComponent>

          <section
            className="flex flex-col w-full border-2"
            style={{
              overflow: "auto",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            <table className="table-auto">
              <thead className="bg-[#10b981] sticky top-0">
                <tr>
                  <td className="px-4 py-2">Identificador</td>
                  <td className="px-4 py-2">Fecha de creación</td>
                  <td className="px-4 py-2">Nombre</td>
                  <td className="px-4 py-2">Saldo</td>
                  <td className="px-4 py-2">Creado por</td>
                </tr>
              </thead>
              <tbody>
                {materials
                  ? materials.map((material, index) => (
                      <tr
                        key={material.id}
                        style={{
                          backgroundColor:
                            index % 2 !== 0 ? "#f2f2f2" : "transparent",
                        }}
                      >
                        <td className="border px-4 py-2">{material.id}</td>
                        <td className="border px-4 py-2">
                          {new Date(material.createdAt)
                            .toLocaleDateString()
                            .split("/")
                            .join("-")}
                        </td>
                        <td className="border px-4 py-2">{material.name}</td>
                        <td className="border px-4 py-2">
                          {material.quantity}
                        </td>
                        <td className="border px-4 py-2">
                          {material.createdBy.name}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Materials;
