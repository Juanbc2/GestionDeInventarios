import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import PrivateComponent from "./PrivateComponent";

const SideMenu = () => {
  const { data, status, update } = useSession();

  const [userData, setUserData] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      setUserData({
        name: data.user?.name as string,
        image: data.user?.image as string,
      });
    }
  }, [data, status]);

  return (
    <aside className="gap-15 px-5 py-2 top-0 bg-neutral-50 flex-col flex h-full w-[330px] fixed">
      <section>
        <div className="flex flex-col items-center gap-2 mt-12">
          <img
            className="h-[150px] w-[150px] rounded-full"
            src={userData.image}
            alt="Profile pic"
          />
          <span className="text-gray-500">{userData.name}</span>
        </div>
        <br></br>
      </section>
      <section>
        <button
          className="p-2 rounded-sm m-2 border-slate-950 border-2"
          onClick={() => open("/inventory", "_self")}
        >
          Inventarios
        </button>
        <button
          className="p-2 rounded-sm m-2 border-slate-950 border-2"
          onClick={() => open("/materials", "_self")}
        >
          Materiales
        </button>
        <PrivateComponent roleName="ADMIN">
          <button
            className="p-2 rounded-sm m-2 border-slate-950 border-2"
            onClick={() => open("/users", "_self")}
          >
            Usuarios
          </button>
        </PrivateComponent>
      </section>
    </aside>
  );
};

export default SideMenu;
