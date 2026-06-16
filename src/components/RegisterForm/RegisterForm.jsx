import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "../Modal/Modal";
import styles from "./RegisterForm.module.css";
import { useDispatch } from "react-redux";
import { registerAuth } from "../../redux/features/auth/authThunks";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

export default function RegisterForm({ onClose }) {
  const dispatch = useDispatch();

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
              onSubmit={async (
                values,
                { setSubmitting, setFieldError, setStatus },
              ) => {
                try {
                  setStatus(null);
                  await dispatch(
                    registerAuth(values.name, values.email, values.password),
                  );
                  setSubmitting(false);
                  onClose?.();
                } catch (e) {
                  setSubmitting(false);
                  const code = e?.code || e?.message || String(e);
                  if (
                    code.includes("email-already-in-use") ||
                    code.includes("already")
                  ) {
                    setFieldError("email", "This email is already in use.");
                  } else {
                    setStatus(code);
                  }
                }
              }}
            >
              {({ errors, touched, isSubmitting, status }) => (
                <Form className={styles.form}>
                  {status && <div className={styles.error}>{status}</div>}
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

                  <div className={styles.action}>
                    <button
                      type="submit"
                      className={styles.primary}
                      disabled={isSubmitting}
                    >
                      Sign Up
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Modal>
  );
}
