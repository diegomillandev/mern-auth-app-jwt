import { transporter } from "../config/nodemailer";

interface sendVerificationTokenProps {
  user: {
    email: string;
    name: string;
    token: string;
  };
}

export class AuthEmail {
  static sendVerificationToken = async ({
    user,
  }: sendVerificationTokenProps) => {
    await transporter.sendMail({
      from: `Overtime Support <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Código de Verificación - OTP",
      text: `Tu código OTP para acceder a la aplicación`,
      html: `
                <p>Hola <strong>${user.name}</strong>,</p>
                <p>Hemos recibido una solicitud para acceder a tu cuenta. Aquí está tu código OTP para completar el inicio de sesión:</p>
                <h3 style="color: #2e86de;">${user.token}</h3>
                <p>Este código es válido por <strong>2 minutos</strong>. Si no realizaste esta solicitud, por favor ignora este correo.</p>
                <p><em>Recuerda que este código es personal y no debes compartirlo con nadie.</em></p>
                <p>Si necesitas asistencia, contacta a nuestro equipo de soporte.</p>
                <br/>
                <p>Saludos,</p>
            `,
    });
  };
}
