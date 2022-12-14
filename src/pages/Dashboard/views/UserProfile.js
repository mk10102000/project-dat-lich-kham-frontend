import React, { useEffect, useState } from 'react';

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { userApi } from '../../../api/userApi';
import { Loading } from '../../../components/Loading';
import { formatDate } from '../../../utils/common';

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await userApi.getAllUser();
      setUsers(res);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) return <Loading />;
  return (
    <>
      <Container fluid>
        <h2 className="text-center">Danh sách người dùng hệ thống</h2>
        <Row>
          <Col xs={12}>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Họ tên</th>
                  <th scope="col">SDT</th>
                  <th scope="col">Email</th>
                  <th scope="col">Giới tính</th>
                  <th scope="col">Ngày sinh</th>
                  <th scope="col">Vai trò</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.users?.map((user, index) => (
                  <tr key={user.maND}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.hoTen}</td>
                    <td>{user.SDT}</td>
                    <td>{user.email}</td>
                    <td>{user.gioiTinh}</td>
                    <td>{formatDate(user.ngaySinh)}</td>
                    <td>{user.tenQuyen}</td>
                    <td>
                      <button className="btn-button bg-danger text-light py-2 px-4 mx-2">
                        Khóa
                      </button>
                      {/* <button className="btn-button bg-danger text-light p-2">Khóa</button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
        <h6>Tổng có: {users.totalData} người dùng</h6>
      </Container>
    </>
  );
}

export default User;
