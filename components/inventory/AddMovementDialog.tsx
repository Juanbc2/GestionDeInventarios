import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DialogButton } from "@/components/ui/DialogButton";
import { useSession } from "next-auth/react";
import { useForm } from "@mantine/form";
import { notify } from "@/utils/toast";
import { api_url } from "@/service/url";

interface AddMovementDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  selectedMaterial: {
    id: string;
    createdAt: string;
    name: string;
    quantity: string;
    createdBy: {
      name: string;
    };
  };
}

const AddMovementDialog = (props: AddMovementDialogProps) => {
  const { onClose, selectedValue, open, selectedMaterial } = props;
  const { data } = useSession();

  const form = useForm({
    initialValues: {
      type: "",
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
      const result = await fetch(`${api_url}/api/users`, {
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

  const createMovement = async () => {
    if (!form.values.type || !form.values.quantity) {
      notify("warning", "Por favor llene todos los campos");
      return;
    }
    try {
      const user = getUserByEmail(data?.user?.email);
      if (!user) {
        alert("No se pudo encontrar el usuario");
        return;
      }
      const result = await fetch(`${api_url}/api/inventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movementType: form.values.type,
          quantity: parseInt(form.values.quantity),
          userId: user.id,
          materialId: selectedMaterial.id,
        }),
      }).then((res) => res.json());
      if (result !== null) {
        notify("success", "Movimiento agregado");
        onClose(selectedValue);
      }
    } catch (error) {
      notify("error", "No se pudo agregar el movimiento");
    }
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    getUsers();
  }, [selectedMaterial]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xl">
      <DialogTitle>Agregar movimiento</DialogTitle>
      <DialogContent className="flex flex-col p-3">
        <div className="flex flex-col p-3 gap-4 items-center">
          <span>Agregar nuevo movimiento a la lista de inventario</span>
          <form className="flex flex-col gap-3">
            <span>
              Material: <b>{selectedMaterial.name}</b>
            </span>
            <label className="flex flex-col gap-1" htmlFor="material-name">
              <span>
                Tipo de movimiento<span className="text-red-500">*</span>
              </span>
              <select
                className="border border-slate-950 rounded-sm p-1"
                value={form.values.type}
                onChange={(e) => form.setFieldValue("type", e.target.value)}
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
                <option value="ENTRADA">Entrada</option>
                <option value="SALIDA">Salida</option>
              </select>
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
                onClick={createMovement}
              />
              <DialogButton text="Cerrar" type="button" onClick={handleClose} />
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { AddMovementDialog };
