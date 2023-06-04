import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Layout } from "components/account";
import { userService, alertService } from "services";

export default Login;

function Login() {
  const router = useRouter();
  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ username, password }) {
    alertService.clear();
    return userService
      .login(username, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
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
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">
                        Ingresar usuario y contraseña
                      </p>
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
                        Login
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="mb-0 mx-4">
                      No tienes cuenta Registrate!{" "}
                      <Link
                        href="/account/register"
                        className="text-white-50 fw-bold"
                      >
                        Registrarse
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
