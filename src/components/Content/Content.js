import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import $ from 'jquery';

import ContentHeader from './ContentHeader';

class Content extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    actionComponent: PropTypes.node,
    children: PropTypes.node.isRequired,
  }

  componentDidMount() {
    //Get window height and the wrapper height
    var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
    var window_height = $(window).height();
    var sidebar_height = $(".sidebar").height();
    //Set the min-height of the content and sidebar based on the
    //the height of the document.
    if ($("body").hasClass("fixed")) {
      $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
    } else {
      var postSetWidth;
      if (window_height >= sidebar_height) {
        $(".content-wrapper, .right-side").css('min-height', window_height - neg);
        postSetWidth = window_height - neg;
      } else {
        $(".content-wrapper, .right-side").css('min-height', sidebar_height);
        postSetWidth = sidebar_height;
      }

      //Fix for the control sidebar height
      var controlSidebar = $('.control-sidebar');
      if (typeof controlSidebar !== "undefined") {
        if (controlSidebar.height() > postSetWidth)
          $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
      }

    }
  }

  render() {
    return (
      <div className="content-wrapper">
        <Helmet
          title={this.props.title}
          meta={[
            {
              name: 'description',
              content: this.props.description,
            }
          ]}
        />
        <ContentHeader title={this.props.title} description={this.props.description} actionComponent={this.props.actionComponent} />
        <section className="content">
          {this.props.children}
        </section>
      </div>
    )
  }
}

export default Content;
