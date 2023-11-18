import { SideMenu } from "@/components/ui/SideMenu";
import React from "react";

const Materials = () => {
  return (
    <main className="flex flex-row bg-slate-200 font-medium w-auto h-screen">
      <SideMenu />
      <section className="flex flex-col p-4 items-center">
        <h1 className="text-center">Gestión de materiales</h1>
      </section>
    </main>
  );
};

export default Materials;
