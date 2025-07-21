# E-readers and .epub files

I have recently purchased an E-reader! I went with the [Kobo Clara Colour HD](https://us.kobobooks.com/products/kobo-clara-colour), because this device actually supports sideloading, allows you to disable telemetry, and supports replacing the stock firmware with something else like [KOReader](https://koreader.rocks/)

I wish more companies would allow this with their devices. So to the engineering team that designed the Kobo E-readers and allowed this, thank you! =D

![Kobo Clara Colour HD](/workflow-for-pdf-to-epub/kobo-clara-colour-hd.webp "width=60%")

# Existing tools for converting PDF to EPUB

[Calibre](https://github.com/kovidgoyal/calibre) is an an amazing FOSS tool for ebook library management that supports cool features like pulling in meta-data for books and auto-uploading to E-readers like the Kobo Clara.

They do have a built in feature for converting PDF's to EPUB's, though often times with older books that are just scanned in images some of the OCR or page/chapter number recognition fails. This is a known limitation and it would be an incredibly difficult to get this feature working 100% of the time for all PDF's because at the end of the day their formats are so different that we just need to rely on OCR for most of this process. We cannot extract meaningful text, chapter, page, and image data from some PDF files so we to scan the text from each PDF page to perform this conversion.

# My workflow

In this example, I am trying to convert the book "Why They Behave Like Russians" by John Fischer (1946) which details an interesting first-hand account of Soviet society post WWII.

The PDF I have of this book is scanned in which isn't ideal but here's how I converted this to an EPUB!

## Step one, PDF to PNG

The first thing we want to do is convert each page in the PDF to an indivudial image so we can perform optical character recognition on each page and convert this to text.

I used `pdftoppm` to extract each page as a png:

`pdftoppm WhyTheyBehaveLikeRussiansJohnFischer1946.pdf page -png`

This left me with a bunch of files from `page-001.png to page-280.png`
