import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/authContext';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Form = styled.div`
  margin-top: 100px;
  width: 50%;
`;

const Heading = styled.h1`
  margin-top: 100px;
  font-size: 64px;
  font-weight: 500;
`;

const Subheading = styled.h2`
  font-size: 32px;
`;

const Submit = styled.input`
  width: 250px;
  margin-top: 100px;
`;

const SignInOption = styled.p`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

const MessageContainer = styled.div`
  margin-top: 75px;
`;

const AuthMessaging = props => {
  if (props.signup) {
    return (
      <MessageContainer>
        <SignInOption>
          Already have an account?
          <Link to="/login"> Sign in here.</Link>
        </SignInOption>
      </MessageContainer>
    );
  }
  return <div />;
};

const FirstNameLastName = props => {
  return (
    <div className="field is-grouped is-grouped-centered">
      <div className="field-body">
        <div className="field">
          <label
            className="label is-large"
            htmlFor="firstName"
            name="firstName"
          >
            First Name
          </label>
          <div className="control">
            <input
              id="form-firstName"
              required
              type="text"
              className="input is-large"
              placeholder="John"
              onChange={e => props.setFirstName(e.target.value)}
              value={props.firstName}
            />
          </div>
        </div>
        <div className="field">
          <label className="label is-large" htmlFor="lastName" name="lastName">
            Last Name
          </label>
          <div className="control">
            <input
              id="form-lastName"
              required
              type="text"
              className="input is-large"
              placeholder="Doe"
              onChange={e => props.setLastName(e.target.value)}
              value={props.lastName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SignUp = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authContext = useContext(AuthContext);
  const data = {
    name: `${firstName} ${lastName}`,
    email,
    password
  };

  return (
    <Container>
      <Heading id="form-heading">{props.heading}</Heading>
      <Subheading id="form-subheading">{props.subheading}</Subheading>
      <Form>
        {props.register ? (
          <FirstNameLastName
            lastName={lastName}
            setLastName={setLastName}
            firstName={firstName}
            setFirstName={setFirstName}
          />
        ) : (
          <div />
        )}
        <div className="field">
          <label className="label is-large" htmlFor="email" name="email">
            Email
          </label>
          <div className="control is-expanded">
            <input
              id="form-email"
              className={`input is-large is-fullwidth ${authContext.submitStatus.email.class}`}
              type="email"
              placeholder="johndoe@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            {
              <p className={`help ${authContext.submitStatus.email.class}`}>
                {authContext.submitStatus.email.message}
              </p>
            }
          </div>
        </div>

        <div className="field">
          <label className="label is-large" htmlFor="password" name="password">
            Password
          </label>

          <div className="control is-expanded">
            <input
              id="form-password"
              className={`input is-large is-fullwidth ${authContext.submitStatus.password.class}`}
              type="password"
              minLength="8"
              required
              placeholder="Your password..."
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            {
              <p className={`help ${authContext.submitStatus.password.class}`}>
                {authContext.submitStatus.password.message}
              </p>
            }
          </div>
        </div>
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <Submit
              id="form-submit"
              className="button is-primary is-large"
              type="submit"
              formnovalidate
              onClick={e => props.authHandler(data)}
              value={props.authOption}
            />
          </div>
        </div>
      </Form>
      {AuthMessaging(props)}
    </Container>
  );
};

export default SignUp;
