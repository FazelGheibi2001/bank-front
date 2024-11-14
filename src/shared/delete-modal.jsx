import {Box, Button, Modal, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import React from "react";

const DeleteModal = ({open, handleClose, handleConfirmDelete}) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: 500,
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 3,
                }}
            >
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography
                        id="delete-modal-title"
                        variant="h6"
                        sx={{color: 'text.primary', fontSize: '1.5rem', fontWeight: 'bold', mb: 1}}
                    >
                        Delete Confirmation
                    </Typography>
                    <Button onClick={handleClose} className="!text-red-600" style={{minWidth: 0, padding: '0 8px'}}>
                        <CloseIcon/>
                    </Button>
                </div>

                <Divider sx={{my: 2}}/>

                <Typography
                    id="delete-modal-description"
                    sx={{
                        color: '#842029',
                        backgroundColor: '#F8D7DA',
                        padding: '13px 26px',
                        borderRadius: '12px',
                        textAlign: 'left',
                        fontSize: '1rem',
                        fontWeight: '500',
                        mt: 2,
                        mb: 2,
                    }}
                >
                    Are you sure you want to delete this item?
                </Typography>

                <Divider sx={{my: 3}}/>

                <Box sx={{mt: 3, display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            mr: 1.5,
                            color: '#BC2727',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: '#FCEAEA',
                                borderColor: '#BC2727',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        color="primary"
                        variant="contained"
                        sx={{
                            '&:hover': {
                                backgroundColor: '#4b9aed',
                            },
                        }}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default DeleteModal;