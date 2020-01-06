import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 70vh;
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

const FirstNameLastName = () => {
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
              required
              type="text"
              className="input is-large"
              placeholder="John"
            />
          </div>
        </div>
        <div className="field">
          <label className="label is-large" htmlFor="lastName" name="lastName">
            Last Name
          </label>
          <div className="control">
            <input
              required
              type="text"
              className="input is-large"
              placeholder="Doe"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SignUp = props => {
  return (
    <Container>
      <Heading>{props.heading}</Heading>
      <Subheading>{props.subheading}</Subheading>
      <Form>
        {props.register ? <FirstNameLastName /> : <div />}
        <div className="field">
          <label className="label is-large" htmlFor="email" name="email">
            Email
          </label>
          <div className="control is-expanded">
            <input
              className="input is-large is-fullwidth"
              type="email"
              placeholder="johndoe@example.com"
            />
          </div>
        </div>

        <div className="field">
          <label className="label is-large" htmlFor="password" name="password">
            Password
          </label>

          <div className="control is-expanded">
            <input
              className="input is-large is-fullwidth"
              type="password"
              minLength="8"
              required
              placeholder="Your password..."
            />
          </div>
        </div>
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <Submit
              className="button is-primary is-large"
              onClick={props.authHandler}
              type="submit"
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
