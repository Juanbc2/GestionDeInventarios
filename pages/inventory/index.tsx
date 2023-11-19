import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SideMenu } from "@/components/ui/SideMenu";
import React from "react";

const Inventory = () => {
  return (
    <main className="flex font-medium w-screen h-screen overflow-hidden">
      <SideMenu />
      <div className="flex flex-col py-12 gap-12 mx-28 w-full">
      <h1 className="flex justify-center h-32" style={{fontWeight: 400, fontSize: 48}}>Gestión de Inventarios</h1>
        <section className="flex flex-col gap-4">
          <div className="flex justify-between">
            <select className=" hover:bg-[#f2f2f2] font-bold py-2 px-4 rounded" name="" id="">
              {/* TODO agregar materiales */}
              <option value="Material"> Material 1</option>
              <option value="Material"> Material 2</option>
            </select>
            <PrimaryButton text="Agregar movimiento" onClick={() => {/* TODO función para agregar */ }} />
          </div>
          
          <div className="flex flex-col w-full border-2" style={{ maxHeight: '300px', overflow: 'auto' }}>
            <table className="table-auto">
              <thead className="bg-[#2D8F1D]">
                <tr>
                  <td className="px-4 py-2">Identificador</td>
                  <td className="px-4 py-2">Fecha</td>
                  <td className="px-4 py-2">Entrada</td>
                  <td className="px-4 py-2">Salida</td>
                  <td className="px-4 py-2">Responsable</td>
                </tr>
              </thead>
              <tbody>
                {/* TODO mapear datos de la api */}
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
