export const html = `
<!doctype html>
<html>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Account</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      padding-bottom: 20px;
    }

    .button {
      display: inline-block;
      background-color: #bb1e1e;
      color: #ffffff;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: #777;
      margin-top: 20px;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h2>Verify Your Account</h2>
    </div>
    <p>Hello, {{first_name}}</p>
    <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
    <p style="text-align: center">
      <a href="{{verification_link}}" class="button">Verify Account</a>
    </p>
    <p>If you did not request this, please ignore this email.</p>
    <div class="footer">
      <p>&copy; 2025 Acme Company. All rights reserved.</p>
    </div>
  </div>
</body>

</html>
`