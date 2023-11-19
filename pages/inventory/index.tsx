import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SideMenu } from "@/components/ui/SideMenu";
import React from "react";

const Inventory = () => {
  return (
    <main className="flex flex-row bg-slate-200 font-medium w-auto h-screen">
      <SideMenu />
      <div className="flex flex-col items-center p-4 gap-4">
        <h1>Gestión de inventarios</h1>
        <section className="flex flex-col gap-2">
          <div className="flex justify-between">
            <select name="" id="">
              {/* TODO agregar materiales */}
              <option value="Material"></option>
            </select>
            <PrimaryButton text="Agregar movimiento" onClick={() => {/* TODO función para agregar */ }} />
          </div>
          <table>
            <thead>
              <tr>
                <th className="px-4 py-2">Identificador</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Entrada</th>
                <th className="px-4 py-2">Salida</th>
                <th className="px-4 py-2">Responsable</th>
              </tr>
            </thead>
            <tbody>
              {/* TODO mapear datos de la api */}
            </tbody>
          </table>
        </section>
        <section>
          {/* TODO Gráfica  */}
          Gráfica
        </section>
      </div>
    </main>
  );
};

export default Inventory;
