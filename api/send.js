const nodemailer = require("nodemailer");

module.exports = async function (req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Nur POST erlaubt"
    });
  }

  try {

    const {
      vorname,
      nachname,
      strasse,
      plz,
      stadt,
      geburtsdatum,
      email,
      unterschrift
    } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.ionos.de",
      port: 587,
      secure: false,
      auth: {
        user: "info@stabiltarife.de",
        pass: "22021998Zhn#.,"
      }
    });

    const htmlMessage = `
      <h1>Neue StabilTarife Vollmacht</h1>

      <p><strong>Vorname:</strong> ${vorname}</p>
      <p><strong>Nachname:</strong> ${nachname}</p>
      <p><strong>Straße:</strong> ${strasse}</p>
      <p><strong>PLZ:</strong> ${plz}</p>
      <p><strong>Stadt:</strong> ${stadt}</p>
      <p><strong>Geburtsdatum:</strong> ${geburtsdatum}</p>
      <p><strong>E-Mail:</strong> ${email}</p>

      <hr>

      <p>
      Hiermit berechtige ich StabilTarife bzw. Ibrahim Doenmez,
      in meinem Namen Energie- und Versicherungsangebote einzuholen,
      Tarifvergleiche durchzuführen und abzuschließen sowie mit
      Energieversorgern und Versicherungen zu kommunizieren.
      </p>

      <h3>Unterschrift</h3>

      <img 
        src="${unterschrift}" 
        style="max-width:300px;border:1px solid #ccc;border-radius:10px;"
      />
    `;

    await transporter.sendMail({
      from: '"StabilTarife" <info@stabiltarife.de>',
      to: `info@stabiltarife.de, ${email}`,
      subject: "Neue StabilTarife Vollmacht",
      html: htmlMessage
    });

    return res.status(200).json({
      success: true
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message
    });

  }

}
