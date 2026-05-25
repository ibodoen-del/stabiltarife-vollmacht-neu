import nodemailer from "nodemailer";

export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({
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

const html = `
<h1>Neue StabilTarife Vollmacht</h1>

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

<img src="${unterschrift}" style="max-width:300px;border:1px solid #ccc;">
`;

await transporter.sendMail({
from: "info@stabiltarife.de",
to: "info@stabiltarife.de",
subject: "Neue StabilTarife Vollmacht",
html: html
});

return res.status(200).json({
success: true
});

} catch (error) {

console.error(error);

return res.status(500).json({
error: error.message
});

}

}
