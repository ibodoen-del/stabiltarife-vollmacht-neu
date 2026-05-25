import nodemailer from "nodemailer";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false
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

      <p><b>Vorname:</b> ${vorname}</p>
      <p><b>Nachname:</b> ${nachname}</p>
      <p><b>Straße:</b> ${strasse}</p>
      <p><b>PLZ:</b> ${plz}</p>
      <p><b>Stadt:</b> ${stadt}</p>
      <p><b>Geburtsdatum:</b> ${geburtsdatum}</p>
      <p><b>E-Mail:</b> ${email}</p>

      <hr>

      <p>
      Hiermit berechtige ich StabilTarife bzw. Ibrahim Doenmez,
      in meinem Namen Energie- und Versicherungsangebote einzuholen,
      Tarifvergleiche durchzuführen und abzuschließen sowie mit
      Energieversorgern und Versicherungen zu kommunizieren.
      </p>

      <h2>Unterschrift</h2>

      <img 
      src="${unterschrift}"
      style="
      max-width:300px;
      border:1px solid #ccc;
      border-radius:10px;
      padding:10px;
      background:white;
      ">

      </div>
    `;

    await transporter.sendMail({

      from: "info@stabiltarife.de",

      to: [
        "info@stabiltarife.de",
        email
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
