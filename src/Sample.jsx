import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './Sample.css';

import { Box, Modal } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import React, { useState } from 'react';

import Button from '@mui/material/Button';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};


export default function Sample() {

  const [file, setFile] = useState('./demo_form.pdf');
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: '90vw',
      md: 800
    },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

    height: isScrolled ? '70%' : '100%',
    overflowY: isScrolled ? 'scroll' : 'hidden'
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle} className="Example__container__document">

          <Button onClick={() => setIsScrolled(!isScrolled)}>Toggle Scrolled</Button>

          {!isScrolled &&
            <Box justifyContent="flex-end">
              <Button onClick={() => setPageNumber((Math.max(pageNumber - 1, 1)))}>prev</Button>
              Page {pageNumber} of {numPages}
              <Button onClick={() => setPageNumber(Math.min(pageNumber + 1, numPages))}>next</Button>
            </Box>
          }

          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {!isScrolled
              ? <Page pageNumber={pageNumber} />
              :
              Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))
            }
          </Document>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
