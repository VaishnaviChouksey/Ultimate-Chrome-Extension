function generatePDF(selectedText) {
    const fileName = document.getElementById('file').value.trim();
    if (!fileName) {
        alert('Please enter a name for the PDF file.');
        return;
    }

    const doc = new jsPDF();

    const pageWidth = 210; 
    const pageHeight = 297; 
    const margins = { top: 20, bottom: 20, left: 20, right: 20 };
    const lineHeight = 10; 
    const maxWidth = pageWidth - margins.left - margins.right;
    const maxHeight = pageHeight - margins.top - margins.bottom;

    const lines = doc.splitTextToSize(selectedText, maxWidth);

    let cursorY = margins.top;

    lines.forEach((line) => {
        if (cursorY + lineHeight > maxHeight) {
            doc.addPage();
            cursorY = margins.top;
        }
        doc.text(margins.left, cursorY, line);
        cursorY += lineHeight;
    });

    doc.save(`${fileName}.pdf`);
}

// Send message to background.js to request selected text
document.getElementById('generatePDFButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'requestSelectedText' });
});

// Listen for messages from background.js with selected text
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'sendSelectedText') {
        const selectedText = message.text;
        if(!selectedText){
            alert("No text selected.");
            return;
        }
        generatePDF(selectedText);
    }
});

