import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { PrivateComponent } from "@/components/PrivateComponent";
import { NavigationButton } from "@/components/ui/SideMenu/NavigationButton";

const SideMenu = () => {
  const { data, status } = useSession();

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
    <aside className="gap-16 px-5 py-2 top-0 bg-[#10b981] flex-col flex h-full w-[260px]">
  <section>
    <div className="flex flex-col items-center gap-2 mt-12 relative">
      <div className="h-[180px] w-[180px] rounded-full overflow-hidden">
        <img
          className="h-full w-full transition-opacity duration-1000 ease-in-out hover:opacity-60"
          src={userData.image}
          alt="Profile pic"
        />
      </div>
      <span className="text-slate-100 font-light" style={{fontSize:'25px', fontFamily: 'Roboto, serif' }}>{userData.name}</span>
    </div>
  </section>
      <section className="flex flex-col items-center gap-2">
        <NavigationButton text="Inventarios" link="/inventory" />
        <NavigationButton text="Materiales" link="/materials" />
        <PrivateComponent roleName="ADMIN">
          <NavigationButton text="Usuarios" link="/users" />
        </PrivateComponent>
      </section>
      <section className="flex flex-col items-center gap-2 mt-auto">
        <NavigationButton text="Cerrar Sesión" link="/api/auth/signout" />
      </section>
    </aside>
  );
};

export { SideMenu };
