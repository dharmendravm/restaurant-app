// D:\Projects\Restaurant-app\server\services\emailtemplates\registerTemplate.js
const registerTemplate = ({
  customerName,
  restaurantName,
  orderLink,
  year = new Date().getFullYear(),
}) => {
  if (!customerName || !restaurantName) {
    throw new Error("customerName and restaurantName are required");
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to ${restaurantName}</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#ff6b35; color:#ffffff; padding:20px; text-align:center;">
              <h1 style="margin:0; font-size:24px;">
                Welcome to ${restaurantName} 🎉
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333333;">
              <p style="font-size:16px; margin:0 0 12px;">
                Hi <strong>${customerName}</strong>,
              </p>

              <p style="font-size:15px; line-height:1.6; margin:0 0 16px;">
                Thank you for signing up with <strong>${restaurantName}</strong>.
                We’re excited to have you on board!
              </p>

              <!-- Offer Box -->
              <div style="
                background:#fff3e8;
                border:1px dashed #ff6b35;
                padding:20px;
                border-radius:6px;
                text-align:center;
                margin:20px 0;
              ">
                <p style="margin:0; font-size:16px;">
                  🎁 <strong>Special Welcome Offer</strong>
                </p>
                <p style="margin:10px 0; font-size:22px; color:#ff6b35;">
                  Use Code: <strong>FIRST30</strong>
                </p>
                <p style="margin:0; font-size:15px;">
                  Get <strong>30% OFF</strong> on your first order
                </p>
              </div>

              <p style="font-size:14px; color:#666666; margin:0 0 20px;">
                ⏳ Offer valid for a limited time.
              </p>

              <!-- CTA -->
              <div style="text-align:center; margin:30px 0;">
                <a
                  href="${orderLink || '#'}"
                  style="
                    background:#ff6b35;
                    color:#ffffff;
                    padding:14px 26px;
                    text-decoration:none;
                    border-radius:5px;
                    font-size:16px;
                    display:inline-block;
                  "
                >
                  Order Now 🍽️
                </a>
              </div>

              <p style="font-size:15px; margin:0;">
                Happy eating! 🍕<br />
                <strong>${restaurantName} Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              background:#f9f9f9;
              padding:15px;
              text-align:center;
              font-size:12px;
              color:#999999;
            ">
              © ${year} ${restaurantName}. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

export default registerTemplate;

const html = registerTemplate({
  customerName: "Dharmendra",
  restaurantName: "TableOrbit",
  orderLink: "https://tableorbit.com/menu"
});
