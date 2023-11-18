import ProtectedRoute from "@/components/ProtectedRoute";
import { SideMenu } from "@/components/ui/SideMenu";
import EditUserDialog from "@/components/users/editUserDialog";
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
      let result = await fetch("http://localhost:3000/api/roles", {
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
    let role = roles.find((role) => role.id === id);
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
      let result = await fetch("http://localhost:3000/api/users", {
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
    let selectUser = users.find((user) => user.id === id);
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

  const handleClose = (value: string) => {
    getUsers();
    setOpen(false);
  };

  useEffect(() => {
    getRoles();
    getUsers();
  }, []);

  return (
    <ProtectedRoute roleName="ADMIN">
      <main className="flex bg-slate-200 font-medium w-full h-screen overflow-hidden">
        <SideMenu />
        <EditUserDialog
          open={open}
          onClose={handleClose}
          selectedValue=""
          roles={roles}
          selectedUser={selectedUser}
        />
        {/* <div className="ml-[20.5%]" /> */}
        <div className="flex flex-col p-6 h-full">
          <section>
            <h1>Gestión de Usuarios</h1>
          </section>
          <section className="flex flex-col items-center justify-center">
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Identificador</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Correo</th>
                  <th className="px-4 py-2">Rol</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">
                      {user.roleId == null ? "Sin rol" : getRoleById(user.roleId)}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleClickOpen(user.id)}
                      >
                        Editar
                      </button>
                    </td>
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
