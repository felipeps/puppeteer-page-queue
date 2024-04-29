# Homework task

This is a small node application that generates a PDF file using puppeteer. You can check src/pdf/pdf.controller.ts to see how it generates a very dummy PDF file.

Step 1: install dependencies 
`npm i`

Step 2: run the application: 
`npm run dev`

Step 3: run a performance check: `npm run test:perf`. This will trigger 25 parallel request for PDF generation

# Goal

This is a simple project to demonstrate a queue of reusable Puppeteer Page instances.
Edit the number of requests in the script `npm run test:perf` inside `settings.json`
