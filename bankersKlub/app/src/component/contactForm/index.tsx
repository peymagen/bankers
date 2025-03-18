import { useState } from "react";
import styles from "./ContactForm.module.css";
import Button from "../animation/Button";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.row}>
        <input
          type="text"
          name="firstName"
          placeholder="First name*"
          className={styles.inputField}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name*"
          className={styles.inputField}
          required
          onChange={handleChange}
        />
      </div>
      <input
        type="email"
        name="email"
        placeholder="Your email*"
        className={styles.inputField}
        required
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phone"
        placeholder="+91  Phone number*"
        className={styles.inputField}
        required
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="How can we help you?"
        className={styles.textArea}
        onChange={handleChange}
      />
      <Button type="submit" className="secondary">
        Submit
      </Button>
    </form>
  );
};

export default ContactForm;
