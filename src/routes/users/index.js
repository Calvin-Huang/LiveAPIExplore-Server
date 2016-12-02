/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchNews } from '../../actions/news';

import Content from '../../components/Content';

import util from 'util';

function mapStateToProps(state) {
  return {
    news: state.news.news,
  }
}

class Users extends React.Component {
  static propTypes = {
    news: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      contentSnippet: PropTypes.string,
    })).isRequired,
  };

  componentDidMount() {
    this.props.fetchNews();
  }

  deleteItem(id) {
    console.log(`=====> ${id} <=====`);
  }

  render() {
    return (
      <Content title="用戶管理" description="Live Demo App Users" actionComponent={<a className="btn btn-default" href="/admin/users/create">新增</a>}>
        <div className="row">
          <div className="col-sm-12">
            <div className="box bordered-box sea-blue-border" style={{marginBottom: 0}}>
              <div className="box-body">
                <div className="responsive-table">
                  <div className="scrollable-table sortable-container">
                    <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="dataTables_length">
                            <label>每頁顯示&nbsp;
                              <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="form-control input-sm">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                              </select>
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-6 text-right">
                          <div className="dataTables_filter">
                            <label>
                              搜尋:
                              <input type="search" className="form-control input-sm" placeholder="" aria-controls="DataTables_Table_0" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <table className="table table-bordered table-striped data-table dataTable no-footer">
                            <thead>
                            <tr>
                              <th className="sorting_desc" style={{width: '50px'}}>
                                編號
                              </th>
                              <th className="sorting">
                                User Name
                              </th>
                              <th className="no-sort sorting_disabled" style={{width: '60px'}}>

                              </th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.news.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  {index}
                                </td>
                                <td>
                                  {item.title}
                                </td>
                                <td>
                                  <div className="btn-toolbar pull-right">
                                    <button className="btn btn-default"
                                            onClick={this.deleteItem.bind(this, item.link)}>
                                      <i className="fa fa-pencil"></i>
                                    </button>
                                    <Link to={`/users/${item.link}`} className="btn btn-danger">
                                      <i className="fa fa-remove"></i>
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-5">
                          <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">
                            目前顯示的範圍是 1 到 1 ，全部共有 1 筆資料
                          </div>
                        </div>
                        <div className="col-sm-7">
                          <div className="dataTables_paginate paging_simple_numbers">
                            <ul className="pagination">
                              <li className="paginate_button previous disabled">
                                <a href="#">上一頁</a>
                              </li>
                              <li className="paginate_button active">
                                <a href="#">1</a>
                              </li>
                              <li className="paginate_button next disabled" id="DataTables_Table_0_next">
                                <a href="#">下一頁</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    );
  }
}

export default connect(mapStateToProps, { fetchNews })(Users);
