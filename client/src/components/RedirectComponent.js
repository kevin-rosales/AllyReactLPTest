import React, { Component } from 'react';

class RedirectComponent extends Component {
    componentDidMount = () => {
        this.props.history.push("http://localhost:3001/redirect");
      };

    render() {
        return (
            <div>
                <h1>Redirect Page</h1>
            </div>
        );
    }
}

export default RedirectComponent;