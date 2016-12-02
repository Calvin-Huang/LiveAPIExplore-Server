/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import Content from '../../components/Content';

import s from './Admin.css';

import { fetchAdmins, addAdmin, deleteAdmin } from '../../actions/admin';
import { CREATE_ERROR } from '../../constants/actions';

function mapStateToProps(state) {
  return {
    admins: state.admin
  };
}

class Admin extends React.Component {
  static propTypes = {
    admins: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    })).isRequired,
  }

  static defaultProps = {
    admins: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      id: null,
      showModal: false,
      username: '',
      password: '',
      inProgress: false,
      message: '',
      deleteConfirm: false,
    }
  }

  confirmDelete(id = null, username = '') {
    this.setState({
      id: id,
      username: username,
      deleteConfirm: true,
    });
  }

  async deleteAdmin() {
    const nextState = await this.props.deleteAdmin(this.state.id);

    if (nextState.type == CREATE_ERROR) {
      window.alert('Delete error!');
    } else {
      this.setState({
        deleteConfirm: false,
      });
    }
  }

  openModal(id = null, username = '') {
    this.setState({
      id: id,
      showModal: true,
      username: username,
      password: '',
    })
  }

  closeModal() {
    this.setState({
      showModal: false,
      message: '',
    })
  }

  handleUpdateForm(field, e) {
    let newState = { };
    newState[field] = e.target.value;

    this.setState(newState);
  }

  async handleSubmitForm() {
    this.setState({
      inProgress: true,
    });

    const nextState = await this.props.addAdmin(this.state.username, this.state.password);

    this.setState({
      inProgress: false,
      message: nextState.payload.message,
    });

    if (nextState.payload.status) {
      this.closeModal();
    }
  }

  componentDidMount() {
    this.props.fetchAdmins();
  }

  render() {
    return (
      <Content title="管理者管理" description="Managers for this CMS." actionComponent={<a className="btn btn-default" onClick={this.openModal.bind(this, null, '')}>新增</a>}>
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
                            {this.props.admins.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  {item.id}
                                </td>
                                <td>
                                  {item.username}
                                </td>
                                <td>
                                  <div className="btn-toolbar pull-right">
                                    <button className="btn btn-default"
                                            onClick={this.openModal.bind(this, item.id, item.username)}>
                                      <i className="fa fa-pencil"></i>
                                    </button>
                                    <button className="btn btn-danger"
                                            onClick={this.confirmDelete.bind(this, item.id, item.username)}>
                                      <i className="fa fa-remove"></i>
                                    </button>
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
        <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{(this.state.id != null) ? '修改' : '新增'}用戶</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form">
              <div className="form-group">
                <label>帳號</label>
                <div className="controls">
                  <input className="form-control" type="email" disabled={this.state.id != null} value={this.state.username} onChange={this.handleUpdateForm.bind(this, 'username')} />
                </div>
              </div>
              <div className="form-group">
                <label>密碼</label>
                <div className="controls">
                  <input className="form-control" type="password" disabled={this.state.id != null} value={this.state.password} onChange={this.handleUpdateForm.bind(this, 'password')} />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal.bind(this)}>取消</Button>
            <Button bsStyle="primary" onClick={this.handleSubmitForm.bind(this)} disabled={(this.state.id != null) || this.state.inProgress}>
              {this.state.inProgress ? <i className="fa fa-circle-o-notch fa-spin fa-fw"></i> : null }
              送出
            </Button>
            <h4 className="text-danger">{this.state.message}</h4>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.deleteConfirm} onHide={(() => { this.setState({ deleteConfirm: false }); })}>
          <Modal.Header closeButton>
            <Modal.Title>確定要刪除嗎？</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              確定要刪除 <strong>{this.state.username}</strong> 嗎？
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(() => { this.setState({ deleteConfirm: false }); })}>取消</Button>
            <Button bsStyle="danger" onClick={this.deleteAdmin.bind(this)}>確定</Button>
          </Modal.Footer>
        </Modal>
      </Content>
    );
  }
}

export default connect(mapStateToProps, { fetchAdmins, addAdmin, deleteAdmin })(Admin);
