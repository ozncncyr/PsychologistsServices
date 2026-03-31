import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "../Modal/Modal";
import styles from "./LogInForm.module.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

export default function LogInForm({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className={styles.wrapper}>
        <button className={styles.close} onClick={onClose} aria-label="close">
          X
        </button>

        <div className={styles.inner}>
          <div className={styles.texts}>
            <h1 className={styles.title}>Log In</h1>
            <p className={styles.subtitle}>
              Welcome back! Please enter your credentials to access your account
              and continue your search for a psychologist.
            </p>
          </div>

          <div className={styles.formBlock}>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                console.log("login", values);
              }}
            >
              {({ errors, touched }) => (
                <Form className={styles.form}>
                  <div className={styles.inputList}>
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
              Log in
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
