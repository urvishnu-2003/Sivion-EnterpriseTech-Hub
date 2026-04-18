import html2pdf from 'html2pdf.js';

/**
 * Download an element or HTML content as a PDF file
 * @param {HTMLElement|string} elementOrHtml - DOM element or HTML string to convert
 * @param {string} fileName - Name of the PDF file (without .pdf extension)
 * @param {Object} options - Optional configuration for pdf generation
 */
export const downloadPDF = async (elementOrHtml, fileName = 'document', options = {}) => {
  try {
    const defaultOptions = {
      margin: 10,
      filename: `${fileName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      pagebreak: { mode: ['css', 'legacy'] },
      ...options
    };

    // If it's a string (HTML), create a temporary div
    if (typeof elementOrHtml === 'string') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = elementOrHtml;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '210mm';
      document.body.appendChild(tempDiv);
      
      await html2pdf().set(defaultOptions).from(tempDiv).save();
      document.body.removeChild(tempDiv);
    } else {
      // If it's a DOM element
      await html2pdf().set(defaultOptions).from(elementOrHtml).save();
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};

/**
 * Download plain text as a text file
 * @param {string} content - Text content to download
 * @param {string} fileName - Name of the text file (without .txt extension)
 */
export const downloadText = (content, fileName = 'document') => {
  try {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${fileName}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  } catch (error) {
    console.error('Error downloading text:', error);
    alert('Error downloading file. Please try again.');
  }
};

/**
 * Download content as formatted HTML
 * @param {string} content - HTML content to download
 * @param {string} fileName - Name of the HTML file (without .html extension)
 */
export const downloadHTML = (content, fileName = 'document') => {
  try {
    const element = document.createElement('a');
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${fileName}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    h2 { margin-top: 30px; color: #00c8ff; }
    h3 { margin-top: 20px; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;
    
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));
    element.setAttribute('download', `${fileName}.html`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  } catch (error) {
    console.error('Error downloading HTML:', error);
    alert('Error downloading file. Please try again.');
  }
};
