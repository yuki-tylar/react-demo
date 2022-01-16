import { ErrorMessage, Field, Form, Formik } from "formik";
import { FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { FormItemDateTime } from "../widgets/form-item-datetime";
import { FormItemEventImage } from "./form-item-event-image";
import * as Yup from 'yup';

type Payload = {
  name: string;
  image: string;
  startAt: Date | null;
  endAt: Date | null;
  description: '';
  tags: string[];
  attendees: [];
}

export function EventEditor() {
  const location = useLocation();
  const navigate = useNavigate();

  const payload: Payload = {
    name: '',
    image: '',
    startAt: null,
    endAt: null,
    description: '',
    tags: [],
    attendees: [],
  }

  const goback = () => {
    const leave = window.confirm('Some data might not be saved. Are you sure to leave?');
    if (leave) {
      if (location.state && (location.state as { background: Location }).background) {
        navigate(-1);
      } else {
        navigate('/', { replace: true });
      }
    }
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return (
    <Formik
      initialValues={payload}
      onSubmit={(values) => {
        console.log(values);
        alert('Uploading feature is not implemented yet.')
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Required').min(2, 'Too short').max(150, 'Too long'),
        startAt: Yup.date().nullable().required('Required').min(new Date(), 'Please select future date & time'),
        endAt: Yup.date().nullable().required('Required').min(Yup.ref('startAt'), 'Please select date & time after start time'),
        description: Yup.string().max(1000, 'Too long'),
      })}
    >
      {
        ({ isSubmitting, isValid, values, status, validateForm, setStatus, setTouched, setValues, submitForm }) => (
          <div className="h-100pc" style={{ overflow: 'auto' }}>
            <Form>
              <div
                className='pos-fixed top-0p w-100pc h-50p d-flex main-axis-between blur'
                style={{ zIndex: 10, background: 'rgba(255,255,255,0.4)' }}
              >
                <button
                  type="button"
                  className="btn-icon-body py-5p"
                  onClick={goback}
                >
                  <FaTimes />
                </button>
                <button
                  type="button"
                  className="btn-text-body"
                  onClick={
                    () => {
                      setStatus('submitted');
                      setTouched(Object.assign({}, ...Object.keys(values).map(k => ({ [k]: true }))));

                      validateForm().then(errors => {
                        if (Object.keys(errors).length === 0) {
                          submitForm();
                        } else {
                        }
                      });
                    }
                  }
                >Post</button>
              </div>

              <div className="mt-50p p-15p">
                <h6 className="mb-30p">Add new event</h6>
                <div className="mb-50p">
                  <FormItemEventImage
                    value={values.image}
                    onImageChanged={(image: string) => {
                      values.image = image;
                      return;
                    }}
                  />
                </div>
                <div className="mb-50p">
                  <div className="mb-5p">
                    <label htmlFor="name" className="subtitle2">Event name</label>
                  </div>
                  <Field className="form-item-textfield" name="name"></Field>
                  {
                    status === 'submitted' && !isValid ?
                      <ErrorMessage className="text-error mt-5p body2" name="name" component="div" /> :
                      null
                  }
                </div>

                <div className="mb-50p">
                  <div className="mb-5p">
                    <label htmlFor="name" className="subtitle2">Start at</label>
                  </div>
                  <div className="mb-50p">
                    <FormItemDateTime
                      minTime={today}
                      initialValue={values.startAt}
                      onChange={(value) => {
                        setValues({ ...values, startAt: value });
                      }}
                    />
                    {
                      status === 'submitted' && !isValid ?
                        <ErrorMessage className="text-error mt-5p body2" name="startAt" component="div" /> :
                        null
                    }
                  </div>
                  <div className="mb-5p">
                    <label htmlFor="name" className="subtitle2">End at</label>
                  </div>
                  <div className="mb-50p">
                    <FormItemDateTime
                      minTime={today}
                      initialValue={values.endAt}
                      onChange={(value) => {
                        setValues({ ...values, endAt: value });
                      }}
                    />
                    {
                      status === 'submitted' && !isValid ?
                        <ErrorMessage className="text-error mt-5p body2" name="endAt" component="div" /> :
                        null
                    }
                  </div>
                </div>

                <div className="mb-50p">
                  <div className="mb-5p">
                    <label htmlFor="description" className="subtitle2">Description</label>
                  </div>
                  <Field as="textarea" className="form-item-textarea-6line" name="description"></Field>
                  {
                    status === 'submitted' && !isValid ?
                      <ErrorMessage className="text-error mt-5p body2" name="description" component="div" /> :
                      null
                  }
                </div>
              </div>
            </Form>
          </div>
        )
      }
    </Formik>
  );

}