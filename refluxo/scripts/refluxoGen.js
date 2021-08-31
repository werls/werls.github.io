function setText(_name, _text, doc) {
	doc.setFont('NotoSans', 'normal');
	doc.setFontSize(12);

	var pageWidth = doc.internal.pageSize.width;
	var pageHeight = doc.internal.pageSize.height;
	var lineHeight = doc.getLineHeight();

	var margin = 20;

	var text_lines = doc.splitTextToSize(_text, pageWidth - margin * 2);
	var numberOfLines = text_lines.length;
	var textBlockHeight = doc.getFontSize() * numberOfLines;

	var startY = pageHeight - (doc.getFontSize() * numberOfLines) / 2;

	for (i in text_lines) {
		doc.text(text_lines[i],
				 pageWidth / 2, (doc.getFontSize() / 2) * i + doc.getFontSize() + startY / 2,
				 options = { align: 'center' }
		);
	}

	doc.setFontSize(10);
	doc.setFont('NotoSans', 'bold');
	doc.text(_name, pageWidth / 2, pageHeight - 20, options = { align: 'center'});
}

function pdfGen() {
	window.jsPDF = window.jspdf.jsPDF;
	const doc = new jsPDF({unit:'mm'});
	
	doc.addFont('./fonts/NotoSans.ttf', 'NotoSans', 'normal');
	doc.addFont('./fonts/NotoSans-Bold.ttf', 'NotoSans', 'bold');

	var name = $('#nome').val();
	var text = $('#texto').val();

	doc.addPage('a4', 'portrait');
	setText(name, text, doc);

	doc.addPage('a5', 'landscape');
	setText(name, text, doc);

	var filename = 'refluxo-' + name.toLowerCase().split(' ').join('-') + '.pdf';
	doc.deletePage(1);
	doc.save(filename);
}