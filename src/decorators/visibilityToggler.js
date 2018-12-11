import React, {Component as ReactComponent} from 'react';

const visibilityToggler = (OrigionalComponent) => class WrappedComponent extends ReactComponent {
  state = {
    isShow: false
  }

  toggleVisibility = () => {
    this.setState({
      isShow: !this.state.isShow
    });
  }

  render() {
    return <OrigionalComponent {...this.props} {...this.state} toggleVisibility={this.toggleVisibility} />
  }
}

export default visibilityToggler;