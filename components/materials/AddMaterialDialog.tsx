import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DialogButton } from "@/components/ui/DialogButton";
import { useSession } from "next-auth/react";
import { useForm } from "@mantine/form";
import { notify } from "@/utils/toast";

interface AddMaterialDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const AddMaterialDialog = (props: AddMaterialDialogProps) => {
  const { onClose, selectedValue, open } = props;
  const { data } = useSession();

  const form = useForm({
    initialValues: {
      name: "",
      quantity: "",
    },
  });

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

  const getUserByEmail = (email?: string) => {
    const user = users.find((user) => user.email === email);
    return user;
  };

  const createMaterial = async () => {
    try {
      const user = getUserByEmail(data?.user?.email);
      if (!user) {
        alert("No se pudo encontrar el usuario");
        return;
      }
      const result = await fetch("http://localhost:3000/api/materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.values.name,
          quantity: parseInt(form.values.quantity),
          userId: user.id,
        }),
      }).then((res) => res.json());
      if (result !== null) {
        notify("success", "Material agregado");
        onClose(selectedValue);
      }
    } catch (error) {
      notify("error", "No se pudo agregar el material");
    }
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xl">
      <DialogTitle>Agregar material</DialogTitle>
      <DialogContent className="flex flex-col p-3">
        <div className="flex flex-col p-3 gap-4 items-center">
          <span>Agregar nuevo material a la lista de materiales</span>
          <form className="flex flex-col gap-3">
            <label className="flex flex-col gap-1" htmlFor="material-name">
              <span>
                Nombre<span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                name="material-name"
                id="name"
                className="border border-slate-950 rounded-sm p-1"
                onChange={(e) => form.setFieldValue("name", e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1" htmlFor="balance">
              <span>
                Cantidad<span className="text-red-500">*</span>
              </span>
              <input
                type="number"
                name="quantity"
                id="name"
                className="border border-slate-950 rounded-sm p-1"
                onChange={(e) => form.setFieldValue("quantity", e.target.value)}
              />
            </label>
            <div className="flex items-center gap-4">
              <DialogButton
                text="Agregar"
                type="button"
                onClick={createMaterial}
              />
              <DialogButton text="Cerrar" type="button" onClick={handleClose} />
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { AddMaterialDialog };
