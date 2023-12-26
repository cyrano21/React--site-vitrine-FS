/* eslint-disable no-undef */
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { init } from "@emailjs/browser";
init(import.meta.env.VITE_REACT_APP_ID);

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const formMess = document.querySelector(".formMessage");

    emailjs
      .sendForm(
        "service_snin3kx",
        "template_6bfdbgk",
        form.current,
        import.meta.env.VITE_REACT_APP_ID
      )

      .then(
        (result) => {
          console.log(result.text);
          form.current.reset();
          formMess.innerHTML = "<p className='success'>Message envoyé !</p>";
          setTimeout(() => {
            formMess.innerHTML = "";
          }, 2500);
        },
        (error) => {
          console.log(error.text);
          formMess.innerHTML =
            "<p className='error'>Une erreur s'est produite, veillez réessayer</p>";
          setTimeout(() => {
            formMess.innerHTML = "";
          }, 2500);
        }
      );
  };

  return (
    <div className="form-container">
      <h2>Contactez nous</h2>
      <form ref={form} onSubmit={sendEmail} className="form-content">
        <label htmlFor="name">nom</label>
        <input type="text" name="name" required autoComplete="off" id="name" />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          required
          autoComplete="off"
          id="email"
        />
        <label htmlFor="mess">Message</label>
        <textarea name="message" id="mess" />
        <input type="submit" value="Envoyer" className="hover button" />
      </form>

      <div className="formMessage"></div>
    </div>
  );
};

export default ContactForm;
