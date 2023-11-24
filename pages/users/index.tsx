import { PrivateRoute } from "@/components/PrivateRoute";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SideMenu } from "@/components/ui/SideMenu";
import { EditUserDialog } from "@/components/users/editUserDialog";
import { useGetRoles } from "@/hooks/useGetRoles";
import { useGetUsers } from "@/hooks/useGetUsers";
import { User } from "@prisma/client";
import { useState } from "react";

const Users = () => {
  //------------roles------------

  const { roles } = useGetRoles();

  const { users } = useGetUsers();

  const getRoleById = (id: string) => {
    const role = roles?.find((role) => role.id === id);
    return role?.name;
  };

  //------------users----------

  const [open, setOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User>();

  const handleClickOpen = (id: string) => {
    const selectUser = users?.find((user) => user.id === id);
    if (!selectUser) {
      alert("No se pudo encontrar el usuario");
      return;
    }
    setSelectedUser(selectUser);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PrivateRoute>
      <ProtectedRoute roleName="ADMIN">
        <main className="flex font-medium w-screen h-screen overflow-hidden">
          <SideMenu />
          {roles && selectedUser ? (
            <EditUserDialog
              open={open}
              onClose={handleClose}
              selectedValue=""
              roles={roles}
              selectedUser={selectedUser}
            />
          ) : null}
          <div className="flex flex-col py-12 gap-[104px] mx-28 w-full">
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
              Gestión de Usuarios
            </h1>
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
                    <td className="px-4 py-2">Foto</td>
                    <td className="px-4 py-2">Nombre</td>
                    <td className="px-4 py-2">Correo</td>
                    <td className="px-4 py-2">Rol</td>
                    <th className="px-4 py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    ? users.map((user, index) => (
                        <tr
                          key={user.id}
                          style={{
                            backgroundColor:
                              index % 2 !== 0 ? "#f2f2f2" : "transparent",
                          }}
                        >
                          <td className="border px-4 py-2">{user.id}</td>
                          <td className="border">
                            {user.image ? (
                              <img
                                src={user.image}
                                alt="user picture"
                                className="w-10 h-10 rounded-full m-auto"
                              />
                            ) : (
                              "Sin foto"
                            )}
                          </td>
                          <td className="border px-4 py-2">{user.name}</td>
                          <td className="border px-4 py-2">{user.email}</td>
                          <td className="border px-4 py-2">
                            {user.roleId == null
                              ? "Sin rol"
                              : getRoleById(user.roleId)}
                          </td>
                          <th className="border px-4 py-2">
                            <PrimaryButton
                              text="Editar"
                              onClick={() => handleClickOpen(user.id)}
                            />
                          </th>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </section>
          </div>
        </main>
      </ProtectedRoute>
    </PrivateRoute>
  );
};

export default Users;
