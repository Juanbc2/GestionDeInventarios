import * as React from "react";
import { DialogTitle, DialogContent } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { notify } from "@/utils/toast";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { API_SERVICES } from "@/service";
import axios from "axios";
import { User } from "@prisma/client";

interface HireDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  roles: roles[];
  selectedUser: User;
}

interface roles {
  id: string;
  name: string;
}

const EditUserDialog = (props: HireDialogProps) => {
  const { onClose, selectedValue, open, roles, selectedUser } = props;

  const form = useForm({
    initialValues: {
      id: "",
      email: "",
      roleId: "",
      name: "",
    },
  });

  useEffect(() => {
    form.setValues({
      id: selectedUser.id,
      email: selectedUser.email as string,
      roleId: selectedUser.roleId as string,
      name: selectedUser.name as string,
    });
  }, [selectedUser]);

  const updateUser = async () => {
    if (form.values.id === "") {
      notify("warning", "Debe seleccionar un usuario");
      return;
    }
    try {
      const result = await axios.request({
        method: "PUT",
        url: API_SERVICES.userById(form.values.id),
        data: {
          roleId: form.values.roleId,
          name: form.values.name,
          email: form.values.email,
        },
      });

      if (result !== null) {
        notify("success", "Usuario actualizado");
        onClose(selectedValue);
      }
    } catch (err) {
      notify("error", "Error al actualizar usuario");
      return err;
    }
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xl">
      <DialogTitle
        className="flex justify-center"
        style={{ fontWeight: 400, fontSize: 32 }}
      >
        Edición de usuario
      </DialogTitle>
      <DialogContent className="flex flex-col flex-wrap justify-center">
        <div>
          <table className="bg-[#10b981] sticky top-0">
            <thead>
              <tr>
                <th className="px-4 py-2">Identificador</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Correo</th>
                <th className="px-4 py-2">Rol</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <td className="border px-4 py-2">{form.values.id}</td>
                <td className="border px-4 py-2 ">
                  <input
                    className="py-2 px-4 rounded hover:bg-[#f2f2f2]"
                    type="text"
                    value={form.values.name}
                    onChange={(e) =>
                      form.setFieldValue("name", e.currentTarget.value)
                    }
                  />
                </td>
                <td className="border px-4 py-2">{form.values.email}</td>
                <td className="border px-4 py-2">
                  <select
                    className="py-2 px-4 rounded hover:bg-[#f2f2f2]"
                    onChange={(e) =>
                      form.setFieldValue("roleId", e.target.value)
                    }
                    value={form.values.roleId || ""}
                  >
                    <option value="" disabled>
                      Sin rol
                    </option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div className="flex justify-center items-center gap-20">
          <PrimaryButton text="Actualizar" onClick={updateUser} />
          <PrimaryButton text="Cerrar" onClick={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { EditUserDialog };
