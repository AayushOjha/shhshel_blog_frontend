import { useRef } from 'react';
import Router from 'next/router';
import { Form, Field } from 'react-final-form';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { Messages } from 'primereact/messages';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import Styles from '@styles/admin.module.scss';
import { FormApi } from 'final-form';

export default function Home() {
  const addposturl = 'https://shhshel.com/api/admin/blogs/new.php';

  const formSubmit = (
    data: Record<string, any>,
    form: FormApi<Record<string, any>, Partial<Record<string, any>>>
  ) => {
    let formdata = new FormData();
    for (const key in data) {
      formdata.append(key, data[key]);
    }

    let reqOptions = {
      url: 'https://shhshel.com/api/admin/blogs/new.php',
      method: 'POST',
      data: formdata,
    };

    axios
      .request(reqOptions)
      .then(() => {
        showMessage('Post Added Suvessfully', 'success');
        Router.push('/admin/blogs');
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        showMessage(JSON.stringify(error), 'error');
      });
  };

  const message = useRef<any>(null);

  const showMessage = (text: string, severity: string) => {
    if (message.current) {
      message.current.show([
        {
          severity: severity,
          detail: text,
          life: 10000,
        },
      ]);
    }
  };

  return (
    <div className="container">
      <div className={`heading_bar`}>
        <p className={`heading__lg primary_colored ${Styles.main_heading}`}>
          All Blogs
        </p>
      </div>
      <Messages ref={message} />
      <Form
        onSubmit={(data, form) => formSubmit(data, form)}
        render={({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit} className="c_form">
            <div className="row half_input">
              <span>
                <label htmlFor="title">title*</label>
                <Field
                  name="title"
                  component="input"
                  placeholder="Enter title here"
                />
              </span>
            </div>
            <div className="row half_input">
              <span>
                <label>Image url*</label>
                <Field
                  name="image_link"
                  component="input"
                  placeholder="Upload image on cloudnery and provide url here"
                />
              </span>
            </div>
            <div className="row">
              <span>
                <label>Content*</label>
                <Field name="content">
                  {({ input: { value, ...input } }) => (
                    <ReactQuill
                      theme="snow"
                      value={value}
                      className="rich_text_editor"
                      onChange={(newValue, delta, source) => {
                        if (source === 'user') {
                          input.onChange(newValue);
                        }
                      }}
                    />
                  )}
                </Field>
              </span>
            </div>
            <div className="row">
              <button
                type="submit"
                className="btn heading"
                disabled={submitting}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      />
    </div>
  );
}
