import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { UserContext } from './userContext';

export const AuthContext = createContext();

export const AuthProvider = props => {
  const userContext = useContext(UserContext);

  const initialStatus = {
    email: {
      class: '',
      message: ''
    },
    password: {
      class: '',
      message: ''
    }
  };

  const [submitStatus, setSubmitStatus] = useState(initialStatus);

  const registerUserLocal = useCallback(
    async data => {
      console.log(data);
      const reqBody = {
        user: {
          local: {
            name: data.name,
            email: data.email,
            password: data.password
          }
        }
      };
      try {
        const req = await axios.post(
          '/api/user/signup/local',
          reqBody
        );
        console.log('', req.data);
      } catch (e) {
        console.log(e.response.data);
        if (e.response.data.email) {
          setSubmitStatus({
            ...submitStatus,
            email: {
              class: 'is-danger',
              message: e.response.data.email
            }
          });
        }

        if (e.response.data.password) {
          setSubmitStatus({
            ...submitStatus,
            password: {
              class: 'is-danger',
              message: e.response.data.password
            }
          });
        }
        setTimeout(() => {
          setSubmitStatus(initialStatus);
        }, 5000);
      }
    },
    [initialStatus, submitStatus]
  );

  const loginUserLocal = useCallback(
    async data => {
      try {
        const reqBody = {
          user: {
            local: {
              email: data.email,
              password: data.password
            }
          }
        };
        console.log('trying to log in');
        const res = await axios.post('/user/login/local', reqBody);
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        userContext.setUser(decoded);
      } catch (e) {
        console.log(e);
      }
    },
    [userContext]
  );

  const logoutUserLocal = () => {
    console.log('The function has been triggered');
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    userContext.setUser(false);
  };

  const authState = {
    submitStatus,
    registerUserLocal,
    loginUserLocal,
    logoutUserLocal
  };

  return (
    <AuthContext.Provider value={authState}>
      {props.children}
    </AuthContext.Provider>
  );
};
