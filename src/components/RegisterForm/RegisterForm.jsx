import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "../Modal/Modal";
import styles from "./RegisterForm.module.css";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

export default function RegisterForm({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className={styles.wrapper}>
        <button className={styles.close} onClick={onClose} aria-label="close">
          X
        </button>

        <div className={styles.inner}>
          <div className={styles.texts}>
            <h1 className={styles.title}>Registration</h1>
            <p className={styles.subtitle}>
              Thank you for your interest in our platform! In order to register,
              we need some information. Please provide us with the following
              information.
            </p>
          </div>

          <div className={styles.formBlock}>
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={RegisterSchema}
              onSubmit={(values) => {
                console.log("register", values);
              }}
            >
              {({ errors, touched }) => (
                <Form className={styles.form}>
                  <div className={styles.inputList}>
                    <div>
                      <Field
                        name="name"
                        placeholder="Name"
                        className={`${styles.input} ${errors.name && touched.name ? styles.invalid : ""} ${!errors.name && touched.name ? styles.valid : ""}`}
                      />
                      <ErrorMessage
                        component="div"
                        className={styles.error}
                        name="name"
                      />
                    </div>

                    <div>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email"
                        className={`${styles.input} ${errors.email && touched.email ? styles.invalid : ""} ${!errors.email && touched.email ? styles.valid : ""}`}
                      />
                      <ErrorMessage
                        component="div"
                        className={styles.error}
                        name="email"
                      />
                    </div>

                    <div>
                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        className={`${styles.input} ${errors.password && touched.password ? styles.invalid : ""} ${!errors.password && touched.password ? styles.valid : ""}`}
                      />
                      <ErrorMessage
                        component="div"
                        className={styles.error}
                        name="password"
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className={styles.action}>
            <button
              className={styles.primary}
              onClick={() =>
                document
                  .querySelector("form")
                  ?.dispatchEvent(
                    new Event("submit", { cancelable: true, bubbles: true }),
                  )
              }
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
