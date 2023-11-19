import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { Dispatch } from 'react';
import { DialogButton } from '@/components/ui/DialogButton';

interface AddMaterialDialogProps {
    open: boolean;
    setOpen: Dispatch<React.SetStateAction<boolean>>
}

export default function AddMaterialDialog({ open, setOpen }: AddMaterialDialogProps) {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl">
            <DialogTitle>Agregar material</DialogTitle>
            <DialogContent className='flex flex-col p-3'>
                <div className='flex flex-col p-3 gap-4 items-center'>
                    <span>Agregar nuevo material a la lista de materiales</span>
                    <form className='flex flex-col gap-3'>
                        <label className='flex flex-col gap-1' htmlFor='material-name'>
                            <span>
                                Nombre<span className='text-red-500'>*</span>
                            </span>
                            <input
                                type="text"
                                name="material-name"
                                id="name"
                                className='border border-slate-950 rounded-sm p-1' />
                        </label>
                        <label className='flex flex-col gap-1' htmlFor='balance'>
                            <span>
                                Saldo<span className='text-red-500'>*</span>
                            </span>
                            <input
                                type="text"
                                name="balance"
                                id="name"
                                className='border border-slate-950 rounded-sm p-1' />
                        </label>
                        <div className='flex items-center gap-4'>
                            <DialogButton text='Agregar' onClick={() => {/*TODO*/ }} />
                            <DialogButton text='Cerrar' onClick={() => setOpen(false)} type='button' />
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export { AddMaterialDialog };