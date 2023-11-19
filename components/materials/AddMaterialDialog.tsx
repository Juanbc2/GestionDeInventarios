import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { Dispatch } from 'react';
import { DialogButton } from '@/components/ui/DialogButton';
import { PrimaryButton } from '../ui/PrimaryButton';

interface AddMaterialDialogProps {
    open: boolean;
    setOpen: Dispatch<React.SetStateAction<boolean>>
}

export default function AddMaterialDialog({ open, setOpen }: AddMaterialDialogProps) {
    return (
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xl">
            <DialogTitle  style={{fontWeight: 400, fontSize: 32}}>Agregar nuevo material a la lista</DialogTitle>
            <DialogContent className="flex flex-col flex-wrap justify-center">
                <div className='flex flex-col p-3 gap-4 items-center'>
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
                        <div className="flex items-center gap-20">
                            <PrimaryButton text='Agregar' onClick={() => {/*TODO*/ }} />
                            <PrimaryButton text='Cerrar' onClick={() => setOpen(false)}/>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export { AddMaterialDialog };