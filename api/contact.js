import nodemailer from 'nodemailer';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { nombre, telefono, email, tema, mensaje } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `Nuevo mensaje de contacto: ${tema}`,
      text: `Nombre: ${nombre}\nTeléfono: ${telefono}\nEmail: ${email}\nMensaje: ${mensaje}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Mensaje enviado con éxito' });
    } catch (error) {
      res.status(500).json({ message: 'Error al enviar el mensaje', error });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};
