import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      name
    }
  }
`

class Signin extends Component {
  state = {
    email: '',
    password: '',
  }

  saveToState = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signUp, { loading, error }) => {
          return (
            <Form
              method='post'
              onSubmit={async e => {
                e.preventDefault()
                const res = await signUp()
                this.setState({ name: '', email: '', password: '' })
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign in here</h2>
                <Error error={error} />
                <label htmlFor='email'>
                  Email
                  <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='email...'
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor='password'>
                  Password
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='password...'
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>

                <button type='submit'>Sign In!</button>
              </fieldset>
            </Form>
          )
        }}
      </Mutation>
    )
  }
}

export default Signin
