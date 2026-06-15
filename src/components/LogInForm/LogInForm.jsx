import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "../Modal/Modal";
import styles from "./LogInForm.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/auth/authThunks";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

export default function LogInForm({ onClose }) {
  const dispatch = useDispatch();

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
              onSubmit={async (
                values,
                { setSubmitting, setFieldError, setStatus },
              ) => {
                try {
                  setStatus(null);
                  await dispatch(login(values.email, values.password));
                  setSubmitting(false);
                  onClose?.();
                } catch (e) {
                  setSubmitting(false);
                  const code = e?.code || e?.message || String(e);
                  if (
                    code.includes("invalid-password") ||
                    code.includes("wrong-password")
                  ) {
                    setFieldError("password", "Incorrect password.");
                  } else if (code.includes("user-not-found")) {
                    setFieldError("email", "No user found with this email.");
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
                      Log in
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
