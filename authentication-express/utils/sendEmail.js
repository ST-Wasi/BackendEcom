const nodemailer = require("nodemailer");

const sendEmail = async (userEmail, productArray) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_EMAIL,
      pass: process.env.NODE_PASS,
    },
  });

  const productDetails = productArray
    .map((product) => `Name: ${product.name}, Price: ${product.price}`)
    .join("\n");
  const mailOptions = {
    from: process.env.NODE_EMAIL,
    to: userEmail,
    subject: "Product Details",
    text: `Here are the details of the products:\n\n${productDetails}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;

// const sendEmail = require("./utils/sendEmail");

// // Example usage
// const userEmail = 'user@example.com';
// const productArray = [
//   { name: 'Product 1', price: 100 },
//   { name: 'Product 2', price: 200 },
// ];
// const appPassword = 'your-gmail-app-password'; // Replace with your Gmail app password

// sendEmail(userEmail, productArray, appPassword);
