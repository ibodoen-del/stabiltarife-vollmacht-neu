import nodemailer from "nodemailer";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Nur POST erlaubt"
    });
  }

  try {

    const data = req.body;

    const transporter = nodemailer.createTransport({

      host: "smtp.ionos.de",

      port: 465,

      secure: true,

      auth: {
        user: "info@stabiltarife.de",
        pass: "22021998Zhn#.,"
      }

    });

    const html = `

    <div style="font-family:Arial;padding:20px;">

    <h1 style="color:green;">
    StabilTarife Einverständniserklärung
    </h1>

    <p><b>Vorname:</b> ${data.vorname}</p>

    <p><b>Nachname:</b> ${data.nachname}</p>

    <p><b>Straße:</b> ${data.strasse}</p>

    <p><b>PLZ:</b> ${data.plz}</p>

    <p><b>Stadt:</b> ${data.stadt}</p>

    <p><b>Geburtsdatum:</b> ${data.geburtsdatum}</p>

    <p><b>E-Mail:</b> ${data.email}</p>

    <hr>

    <p>
    Hiermit berechtige ich StabilTarife bzw.
    Ibrahim Doenmez, in meinem Namen
    Energie- und Versicherungsangebote
    einzuholen, Tarifvergleiche durchzuführen
    und abzuschließen sowie mit
    Energieversorgern und Versicherungen
    zu kommunizieren.
    </p>

    <h2>Unterschrift</h2>

    <img
    src="${data.unterschrift}"
    style="
    max-width:300px;
    border:1px solid #ccc;
    border-radius:10px;
    background:white;
    padding:10px;
    ">

    </div>

    `;

    await transporter.sendMail({

      from: '"StabilTarife" <info@stabiltarife.de>',

      to: [
        "info@stabiltarife.de",
        data.email
      ],

      subject: "StabilTarife Einverständniserklärung",

      html: html

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
