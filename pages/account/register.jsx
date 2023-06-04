import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Layout } from "components/account";
import { userService, alertService } from "services";

export default Register;

function Register() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(user) {
    return userService
      .register(user)
      .then(() => {
        alertService.success("Registration successful", true);
        router.push("login");
      })
      .catch(alertService.error);
  }

  return (
    <Layout>
      <section className="vh-100">
        <div className="container h-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card bg-dark text-white"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase">Registro</h2>
                      <p className="text-white-50 mb-5">
                        Ingresar usuario y contraseña a crear
                      </p>
                      <div className="mb-4">
                        <input
                          id="typeEmailX"
                          name="firstName"
                          type="text"
                          {...register("firstName")}
                          className={`form-control form-control-lg ${
                            errors.firstName ? "is-invalid" : ""
                          }`}
                        />
                        <label className="form-label">First Name</label>
                      </div>
                      <div className="mb-4">
                        <input
                          id="typeEmailX"
                          name="lastName"
                          type="text"
                          {...register("lastName")}
                          className={`form-control form-control-lg ${
                            errors.lastName ? "is-invalid" : ""
                          }`}
                        />
                        <label className="form-label">Last Name</label>
                      </div>
                      <div className="mb-4">
                        <input
                          id="typeEmailX"
                          name="username"
                          type="text"
                          {...register("username")}
                          className={`form-control form-control-lg ${
                            errors.username ? "is-invalid" : ""
                          }`}
                        />
                        <label className="form-label">Usuario</label>
                      </div>
                      <div className="mb-4">
                        <input
                          id="typePasswordX"
                          name="password"
                          type="password"
                          {...register("password")}
                          className={`form-control form-control-lg${
                            errors.password ? "is-invalid" : ""
                          }`}
                        />
                        <label className="form-label">Password</label>
                      </div>
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Registrar
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="mb-0 mx-4">
                      Ya tienes cuenta!{" "}
                      <Link
                        href="/account/login"
                        className="text-white-50 fw-bold"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
