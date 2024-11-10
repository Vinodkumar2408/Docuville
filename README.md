#Docuville

OCR image extraction project for docuville assignment

Technologies & Packages Used

Frontend (React)
React: For building a responsive user interface.

react-dropzone: For handling drag-and-drop file uploads.

Axios: For making HTTP requests to the backend.

CSS: For styling the application to make it visually appealing.

Backend (Node.js & Express)
Node.js: To run the server and handle API requests.

Express.js: For creating API endpoints.

Multer: For handling file uploads (multipart/form-data).

Tesseract.js: For performing Optical Character Recognition (OCR) on uploaded images

#System Flow

Frontend (React):

Users upload an image using a drag-and-drop interface (via react-dropzone).
The uploaded image is sent to the backend using Axios upon clicking the "Upload" button.

Backend (Node.js & Express):

The backend receives the image via an API endpoint using Multer for file handling.
The image is processed using Tesseract.js to extract text.
The extracted text is parsed using regular expressions to capture fields such as:
Name
Father's Name
Date of Birth
Address
DOJ (Date of Joining)
Valid Till
The extracted and formatted data is then sent back to the frontend as a JSON response.

Frontend (Display):

The frontend receives the extracted data from the backend and displays it directly on the webpage.
The extracted data is shown in a user-friendly format with labeled fields (like Name, DOB, etc.).

#installing and run project

Installing dependencies

cd server
npm install

cd client
npm install

Start the Backend Server:

cd server
npm start

Start the Frontend:

cd client
npm start
