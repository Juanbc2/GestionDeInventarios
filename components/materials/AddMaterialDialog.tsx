import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import { DialogButton } from "@/components/ui/Buttons/DialogButton";
import { useSession } from "next-auth/react";
import { useForm } from "@mantine/form";
import { notify } from "@/utils/toast";
import { useGetUsers } from "@/hooks/useGetUsers";
import axios from "axios";
import { API_SERVICES } from "@/service";

interface AddMaterialDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  getMaterials: () => void;
}

const AddMaterialDialog = (props: AddMaterialDialogProps) => {
  const { onClose, selectedValue, open, getMaterials } = props;
  const { data } = useSession();

  const form = useForm({
    initialValues: {
      name: "",
      quantity: "",
    },
  });

  const { users } = useGetUsers();

  const getUserByEmail = (email?: string) => {
    const user = users?.find((user) => user.email === email);
    return user;
  };

  const createMaterial = async () => {
    try {
      const user = getUserByEmail(data?.user?.email);
      if (!user) {
        notify("error", "No se pudo encontrar el usuario");
        return;
      }

      const result = await axios.request({
        method: "POST",
        url: API_SERVICES.materials,
        data: {
          name: form.values.name,
          quantity: parseInt(form.values.quantity),
          userId: user.id,
        },
      });

      if (result !== null) {
        notify("success", "Material agregado");
        getMaterials();
        onClose(selectedValue);
      }
    } catch (error) {
      notify("error", "No se pudo agregar el material");
    }
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xl">
      <DialogTitle>Agregar material</DialogTitle>
      <DialogContent className="flex flex-col p-3">
        <div className="flex flex-col p-3 gap-4 items-center">
          <span>Agregar nuevo material a la lista de materiales</span>
          <div className="flex flex-col gap-3">
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
              <DialogButton text="Agregar" onClick={createMaterial} />
              <DialogButton text="Cerrar" onClick={handleClose} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { AddMaterialDialog };
