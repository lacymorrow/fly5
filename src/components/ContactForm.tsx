import { Reducer, useReducer, useState } from 'react';

import {
  FormStyled,
  InputGroup,
  Status,
} from '../styles/components/ContactForm';
import config from '../utils/config';

interface StateType {
  name: string;
  email: string;
  tel: string;
  message: string;
}

const ContactForm = () => {
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState({
    message: '',
    error: false,
  });

  const [state, setState] = useReducer<Reducer<StateType, Partial<StateType>>>(
    (currentState, newState) => ({ ...currentState, ...newState }),
    {
      name: '',
      email: '',
      tel: '',
      message: '',
    },
  );

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setState({ [name]: value });

    // setState((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  const postForm = async (event: any) => {
    event.preventDefault();

    const result = await fetch('/api/send-email', {
      body: JSON.stringify({
        name: state.name,
        email: state.email,
        tel: state.tel,
        message: state.message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => {
        // If success or validation error
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .catch((error) => {
        console.error('[sendmail] Error sending mail: ', error);
        setStatus({
          message: config.errorMessage,
          error: true,
        });
        return null;
      });

    if (!result) return;

    if (result.message) {
      setStatus({
        message: result.message,
        error: false,
      });
    } else if (result.error) {
      setStatus({
        message: result.error,
        error: true,
      });
    }

    setActive(true);

    // Hide status bar after delay
    setTimeout(() => {
      setActive(false);
    }, 5000);
  };
  return (
    <FormStyled onSubmit={(event) => postForm(event)}>
      <Status
        active={active}
        error={status.error}
        className="absolute top-0 left-0 right-0 font-bold text-black bg-white p-4 text-center"
        dangerouslySetInnerHTML={{
          __html: status.message,
        }}
      />
      <InputGroup>
        <label htmlFor="name" className="sr-only">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          autoComplete="name"
          aria-label="Your name"
          onChange={handleChange}
          required
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          autoComplete="email"
          aria-label="Your email address"
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="tel" className="sr-only">Phone</label>
        <input
          id="tel"
          name="tel"
          placeholder="Phone"
          type="tel"
          autoComplete="tel"
          aria-label="Your phone number"
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us what's up"
          rows={4}
          className="w-full"
          aria-label="Your message"
          onChange={handleChange}
        />
      </InputGroup>
      <button
        type="submit"
        className="mt-12 py-6 bg-white text-black font-bold text-xl"
      >
        Send
      </button>
    </FormStyled>
  );
};

export default ContactForm;
