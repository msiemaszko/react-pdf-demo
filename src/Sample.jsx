import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './Sample.css';

import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import React, { useState } from 'react';

import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};


export default function Sample() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [file, setFile] = useState('./demo_form.pdf');
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isScrolled, setIsScrolled] = useState(true);

  return (
    <>
      <Button variant='contained' onClick={handleOpen}>Open modal</Button>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            Title
            <IconButton size='small' onClick={handleClose}><CloseIcon /></IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            // ref={descriptionElementRef}
            tabIndex={-1}
            sx={{ overflow: 'hidden' }}
            className="Example__container__document"
          >
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
              {!isScrolled
                ? <Page pageNumber={pageNumber} />
                :
                Array.from(new Array(numPages), (el, index) => (
                  <Page scale={1.5} key={`page_${index + 1}`} pageNumber={index + 1} />
                ))
              }
            </Document>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => setIsScrolled(!isScrolled)}>Toggle Scrolled</Button>
          {!isScrolled &&
            <Box>
              <Button onClick={() => setPageNumber((Math.max(pageNumber - 1, 1)))}>prev</Button>
              Page {pageNumber} of {numPages}
              <Button onClick={() => setPageNumber(Math.min(pageNumber + 1, numPages))}>next</Button>
            </Box>
          }
        </DialogActions>
      </Dialog>
    </>
  );
}
