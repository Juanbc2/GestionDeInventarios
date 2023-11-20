import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SideMenu } from "@/components/ui/SideMenu";
import {EditUserDialog} from "@/components/users/editUserDialog";
import { useEffect, useState } from "react";

const Users = () => {
  //------------roles------------
  const [roles, setRoles] = useState([
    {
      id: "",
      name: "",
    },
  ]);

  const getRoles = async () => {
    try {
      const result = await fetch("http://localhost:3000/api/roles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());
      if (result.roles.length > 0) setRoles(result.roles);
    } catch (err) {
      return err;
    }
  };

  const getRoleById = (id: string) => {
    const role = roles.find((role) => role.id === id);
    return role?.name;
  };

  //------------users----------

  const [users, setUsers] = useState([
    {
      id: "",
      email: "",
      roleId: "",
      name: "",
    },
  ]);

  const getUsers = async () => {
    try {
      const result = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());
      if (result.users.length > 0) setUsers(result.users);
    } catch (err) {
      return err;
    }
  };

  const [open, setOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState({
    id: "",
    email: "",
    roleId: "",
    name: "",
  });

  const handleClickOpen = (id: string) => {
    const selectUser = users.find((user) => user.id === id);
    setSelectedUser(
      selectUser
        ? selectUser
        : {
            id: "",
            email: "",
            roleId: "",
            name: "",
          }
    );
    setOpen(true);
  };

  const handleClose = () => {
    getUsers();
    setOpen(false);
  };

  useEffect(() => {
    getRoles();
    getUsers();
  }, []);

  return (
    <ProtectedRoute roleName="ADMIN">
      <main className="flex font-medium w-screen h-screen overflow-hidden">
        <SideMenu />
        <EditUserDialog
          open={open}
          onClose={handleClose}
          selectedValue=""
          roles={roles}
          selectedUser={selectedUser}
        />
        <div className="flex flex-col py-12 gap-[104px] mx-28 w-full">
          <h1
            className="flex justify-center h-32"
            style={{ fontWeight: 400, fontSize: 48 }}
          >
            Gestión de Usuarios
          </h1>
          <section
            className="flex flex-col w-full border-2"
            style={{ overflow: "auto" }}
          >
            <table className="table-auto">
              <thead className="bg-[#2D8F1D] sticky top-0">
                <tr>
                  <td className="px-4 py-2">Identificador</td>
                  <td className="px-4 py-2">Nombre</td>
                  <td className="px-4 py-2">Correo</td>
                  <td className="px-4 py-2">Rol</td>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    style={{
                      backgroundColor:
                        index % 2 !== 0 ? "#f2f2f2" : "transparent",
                    }}
                  >
                    <td className="border px-4 py-2">{user.id}</td>
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
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default Users;
