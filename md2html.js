import { readFile, writeFile } from "fs";
import { join } from "path";
import path from "path";
import { fileURLToPath } from "url";
import { marked } from "marked";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// Base URL for the website
const baseUrl = "http://www.example.com";

// Define the input and output file paths
const inputPath = join(__dirname, "README.md");
const outputPath = join(__dirname, "index.html");

// Read the README.md file
readFile(inputPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading README.md:", err);
    return;
  }

  // Convert Markdown to HTML
  const htmlContent = marked(data);

  // Read template file
  const templatePath = join(__dirname, "template.html");
  readFile(templatePath, "utf8", (err, template) => {
    if (err) {
      console.error("Error reading template.html:", err);
      return;
    }

    // Replace the placeholder with the HTML content
    const htmlPage = template.replace("{{content}}", htmlContent);

    // Write the HTML to index.html
    writeFile(outputPath, htmlPage, "utf8", (err) => {
      if (err) {
        console.error("Error writing index.html:", err);
      } else {
        console.log("index.html created successfully.");
      }
    });
  });
});
