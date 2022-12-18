import { Form, Field } from 'react-final-form';
import axios from 'axios';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function Home() {
  const addposturl = 'https://shhshel.com/api/admin/blogs/new.php';
  return (
    <main>
      <div className="container">
        <Form
          onSubmit={(value) => {
            let formdata = new FormData();
            for (const key in value) {
              formdata.append(key, value[key]);
            }

            let reqOptions = {
              url: 'https://shhshel.com/api/admin/blogs/new.php',
              method: 'POST',
              data: formdata,
            };

            axios
              .request(reqOptions)
              .then(() => {
                alert('Blog post added successfully');
              })
              .catch((error) => {
                alert('Erroe' + error.message);
              });
          }}
          render={({ handleSubmit, form, submitting }) => (
            <form
              onSubmit={() => {
                handleSubmit();
              }}
            >
              <h2>Add Post</h2>
              <div>
                <label>Title</label>
                <Field
                  name="title"
                  component="input"
                  placeholder="Add title of blog"
                />
              </div>
              <br />
              <div>
                <label>Image url</label>
                <Field
                  name="image_url"
                  component="input"
                  placeholder="Upload image on cloudnery and provide url here"
                />
              </div>
              <br />
              <div>
                <label>Content</label>
                <Field name="content">
                  {({ input: { value, ...input } }) => (
                    <ReactQuill
                      theme="snow"
                      value={value}
                      onChange={(newValue, delta, source) => {
                        if (source === 'user') {
                          input.onChange(newValue);
                        }
                      }}
                    />
                  )}
                </Field>
              </div>
              <br />
              <button type="submit" disabled={submitting}>
                Submit
              </button>
            </form>
          )}
        />
      </div>
    </main>
  );
}
