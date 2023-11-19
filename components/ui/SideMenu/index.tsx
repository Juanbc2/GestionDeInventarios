import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import PrivateComponent from "@/components/PrivateComponent";
import { NavigationButton } from "@/components/ui/SideMenu/NavigationButton";

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
    <aside className="gap-16 px-5 py-2 top-0 bg-[#f2f2f2] flex-col flex h-full w-[330px]">
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
      <section className="flex flex-col items-center gap-2">
        <NavigationButton text="Inventarios" link="/inventory" />
        <NavigationButton text="Materiales" link="/materials" />
        <PrivateComponent roleName="ADMIN">
          <NavigationButton text="Usuarios" link="/users" />
        </PrivateComponent>
      </section>
    </aside>
  );
};

export { SideMenu };
