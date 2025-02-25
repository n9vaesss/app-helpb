import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

const ModalSelecionarCliente = ({ open, setOpen, empresas, onSelectEmpresa }) => {
    const handleClose = () => setOpen(false);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState("");

    return (
        <Dialog open={open} onClose={handleClose} sx={{
            '& .MuiDialog-paper': {
                width: '100%',
                maxWidth: '800px',
            },
        }}>
            <DialogTitle>Selecionar Cliente</DialogTitle>
            <DialogContent>
                <Autocomplete
                    sx={{ margin: "5px" }}
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        if (newValue) {
                            onSelectEmpresa(newValue); 
                        }
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                    options={empresas}
                    getOptionLabel={(option) => option.empresa}
                    renderInput={(params) => <TextField {...params} label="Select or Type" />}
                    freeSolo
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalSelecionarCliente;
