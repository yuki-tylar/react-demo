import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { PropsPostEditorChild } from "./post";
import * as Yup from 'yup';

export function PostStep2(props: PropsPostEditorChild) {
  let timer: any;

  return (
    <div className="mt-50p p-15p">
      <div>
        {
          props.data.media ?
            <img
              className="w-100pc mb-30p"
              style={{ objectFit: 'contain', maxHeight: '300px' }}
              src={props.data.media} alt=""
            /> : null
        }
      </div>
      <Formik
        initialValues={{ body: '' }}
        onSubmit={(values) => {
          props.changeStep(1, { body: values.body });
        }}
        validateOnChange={true}
        validate={values => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            props.changeStep(0, values)
          }, 300)
        }}
      >
        {
          ({ isSubmitting, isValid, dirty }) => (
            <Form>
              <div className="mb-50p">
                <div className="mb-5p">
                  <label htmlFor="body" className="subtitle2">Caption</label>
                </div>
                <Field as="textarea" className="form-item-textarea-6line" name="body"></Field>
              </div>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}