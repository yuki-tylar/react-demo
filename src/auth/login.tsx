import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { createElement } from "react";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import * as Yup from 'yup';
import { authenticateByEmail } from "../redux/slice-auth";
import { authConnector, PropsWithReduxAuth } from "../redux/store";

export function Login() {
  return createElement(authConnector(_Login));
}

export function _Login(props: PropsWithReduxAuth) {
  const navigate = useNavigate();
  return (
    <div className="p-15p">
      <h2 className="mb-30p">Welocme!</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          password: Yup.string().required('Required').min(2, 'Too short'),
          email: Yup.string().required('Required').email('Invalid format')
        })}
        onSubmit={async (values) => {
          const result = await authenticateByEmail(props.dispatch, values);
          if(result) {
            navigate('/recommend');
          }
        }}
      >
        {
          ({ isSubmitting, isValid, dirty }) => (
            <Form>
              <div className="mb-25p">
                <div className="mb-5p">
                  <label className="subtitle2">Email</label>
                </div>
                <Field
                  className="form-item-text d-block"
                  style={{ boxSizing: 'border-box' }}
                  type="email"
                  name="email"
                />
                {
                  dirty && !isValid ?
                    <ErrorMessage className="text-error mt-5p body2" name="email" component="div" /> :
                    null
                }

              </div>

              <div className="mb-50p">
                <div className="mb-5p">
                  <label className="subtitle2">Password</label>
                </div>
                <Field
                  className="form-item-text d-block"
                  style={{ boxSizing: 'border-box' }}
                  type="text"
                  name="password"
                />
                {
                  dirty && !isValid ?
                    <ErrorMessage className="text-error mt-5p body2" name="password" component="div" /> :
                    null
                }

              </div>

              <button
                type="submit"
                className="btn btn-primary w-100pc pos-relative"
                disabled={!isValid || isSubmitting}
              >
                <span style={{opacity: isSubmitting ? 0 : 1}}>
                  Login
                </span>
                {
                  isSubmitting ? 
                  <div className="pos-absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <ScaleLoader color='white' height={20} />
                  </div> : null
                }
              </button>
            </Form>
          )
        }
      </Formik>
    </div>
  );
}