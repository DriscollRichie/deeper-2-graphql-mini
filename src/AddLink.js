import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class AddLink extends Component {
  state = {
    desc: "",
    url: ""
  };

  render() {
    return (
      <div>
        <div>
          <input
            value={this.state.desc}
            onChange={e => this.setState({ desc: e.target.value })}
            placeholder="A description to send to the server"
          />
          <input
            value={this.state.url}
            onChange={e => this.setState({ url: e.target.value })}
            placeholder="A url for our link record"
          />
        </div>
        <button onClick={() => this._addLink()}>Save</button>
      </div>
    );
  }

  _addLink = async () => {
    const { description, url } = this.state;
    //addLink was added to props by our graphql() setup below
    await this.props.addLink({
      //We pass in a variables object containing the data
      variables: {
        description, //matches $description defined in our query
        url //matches $url defined in our description
      } //The type of data we send in must match what's defined in our query
    });
  };
}

// First line is for setup/local use.  We name our mutation and then
//   Describe the variables we will need to make it work
// Second line uses the mutation we defined on the server and passes the
//   Variables along
// Third line and on are asking for data back when the request is complete

const ADD_MUTATION = gql`
  mutation AddMutation($description: String!, $url: String!) {
    addLink(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

// 3
export default graphql(ADD_MUTATION, { name: "addLink" })(AddLink);
