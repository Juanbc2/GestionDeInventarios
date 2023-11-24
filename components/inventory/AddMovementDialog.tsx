import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect } from "react";
import { DialogButton } from "@/components/ui/Buttons/DialogButton";
import { useSession } from "next-auth/react";
import { useForm } from "@mantine/form";
import { notify } from "@/utils/toast";
import { User } from "@prisma/client";
import axios from "axios";
import { API_SERVICES } from "@/service";
import { MaterialWithCreatedBy } from "@/types";

interface AddMovementDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  selectedMaterial: MaterialWithCreatedBy;
}

export interface UsersQuery {
  users: User[];
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

  const getUserIdByEmail = async (email?: string) => {
    if (!email) {
      return false;
    }
    const result = await axios.request({
      method: "GET",
      url: API_SERVICES.userIdByEmail(email),
    });
    return result.data.id.id;
  };

  const createMovement = async () => {
    if (!form.values.type || !form.values.quantity) {
      notify("warning", "Por favor llene todos los campos");
      return;
    }
    try {
      const userId = await getUserIdByEmail(data?.user.email);
      if (!userId) {
        notify("error", "No se pudo encontrar al usuario");
        return;
      }
      const result = await axios.request({
        method: "POST",
        url: API_SERVICES.inventory,
        data: {
          movementType: form.values.type,
          quantity: parseInt(form.values.quantity),
          userId: userId.toString(),
          materialId: selectedMaterial.id,
        },
      });
      if (result !== null) {
        notify("success", "Movimiento agregado");
      }
    } catch (error) {
      notify("error", "No se pudo agregar el movimiento");
    }
    onClose(selectedValue);
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    //getUsers();
  }, [selectedMaterial]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xl">
      <DialogTitle>Agregar movimiento</DialogTitle>
      <DialogContent className="flex flex-col p-3">
        <div className="flex flex-col p-3 gap-4 items-center">
          <span>Agregar nuevo movimiento a la lista de inventario</span>
          <div className="flex flex-col gap-3">
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
              <DialogButton text="Agregar" onClick={createMovement} />
              <DialogButton text="Cerrar" onClick={handleClose} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { AddMovementDialog };
