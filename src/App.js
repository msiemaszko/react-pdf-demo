import { Document, Page } from 'react-pdf';
import React, { useState } from 'react';

function App() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={"./demo_form.pdf"} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Strona {pageNumber} z {numPages}
      </p>
    </div>
  );
}

export default App;
