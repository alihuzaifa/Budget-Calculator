import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDF from "./PDF"



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
};

export default function TransitionsModal(props) {
    const { data } = props;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} style={{ color: "black",marginTop:"3px" }} className="openModal">List 🔓</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className="container text-center">
                            <div className="row">
                                <div className="col h6">Item Name</div>
                                <div className="col h6">Item Price</div>
                                <hr />
                            </div>
                            {
                                data?.map((currentEl, index) => {
                                    return (
                                        <div className="row" key={index}>
                                            <div className="col fw-bold">
                                                {currentEl.itemName}
                                            </div>
                                            <div className="col fw-bold" key={index}>
                                                {currentEl.itemPrice}
                                            </div>
                                            <hr />
                                        </div>
                                    )
                                })
                            }

                            <div className="row mt-2">
                                <div className="col">
                                    <div className="btn btn-success">
                                        <PDFDownloadLink document={<PDF data={data} />} fileName="Your Task">
                                            {({ loading }) => (loading ? "Loading Document..." : "Download")}
                                        </PDFDownloadLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
