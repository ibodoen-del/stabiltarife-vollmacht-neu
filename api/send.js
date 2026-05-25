import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";

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

    const doc = new PDFDocument({
      margin: 40
    });

    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));

    doc.on("end", async () => {

      const pdfData = Buffer.concat(buffers);

      const transporter = nodemailer.createTransport({
        host: "smtp.ionos.de",
        port: 465,
        secure: true,
        auth: {
          user: "info@stabiltarife.de",
          pass: "22021998Zhn#.,"
        }
      });

      await transporter.sendMail({

        from: "info@stabiltarife.de",

        to: [
          "info@stabiltarife.de",
          email
        ],

        subject: "StabilTarife Einverständniserklärung",

        text: "Im Anhang befindet sich die unterschriebene PDF.",

        attachments: [
          {
            filename: "StabilTarife-Einverstaendnis.pdf",
            content: pdfData,
            contentType: "application/pdf"
          }
        ]

      });

      return res.status(200).json({
        success: true
      });

    });

    doc.fontSize(22).text(
      "StabilTarife Einverständniserklärung"
    );

    doc.moveDown();

    doc.fontSize(14);

    doc.text(`Vorname: ${vorname}`);
    doc.text(`Nachname: ${nachname}`);
    doc.text(`Straße: ${strasse}`);
    doc.text(`PLZ: ${plz}`);
    doc.text(`Stadt: ${stadt}`);
    doc.text(`Geburtsdatum: ${geburtsdatum}`);
    doc.text(`E-Mail: ${email}`);

    doc.moveDown();

    doc.text(
      "Hiermit berechtige ich StabilTarife bzw. Ibrahim Doenmez, in meinem Namen Energie- und Versicherungsangebote einzuholen, Tarifvergleiche durchzuführen und abzuschließen sowie mit Energieversorgern und Versicherungen zu kommunizieren.",
      {
        width: 500,
        align: "left"
      }
    );

    doc.moveDown(2);

    doc.text("Unterschrift:");

    if (unterschrift) {

      const base64Data = unterschrift.replace(
        /^data:image\/png;base64,/,
        ""
      );

      const imageBuffer = Buffer.from(
        base64Data,
        "base64"
      );

      doc.image(imageBuffer, {
        fit: [250, 120]
      });

    }

    doc.end();

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message
    });

  }

}
