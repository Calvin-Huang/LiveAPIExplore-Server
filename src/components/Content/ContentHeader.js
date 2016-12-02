import React, { PropTypes } from 'react';

class ContentHeader extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    actionComponent: PropTypes.node,
  }

  render() {
    return (
      <section className="content-header">
        <h1>
          {this.props.title}
          <small>{this.props.description}</small>
          <div className="pull-right">
            {this.props.actionComponent}
          </div>
        </h1>
      </section>
    )
  }
}

export default ContentHeader;
