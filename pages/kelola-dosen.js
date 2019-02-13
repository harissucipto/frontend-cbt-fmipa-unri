import React from 'react';
import { Layout, Card, Input, Button, Row, Col, Table, Divider, Tag } from 'antd';

const { Content } = Layout;

const { Search } = Input;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const ProfilAdmin = () => (
  <Content>
    <Card style={{ margin: '20px', padding: '24px' }}>
      <Row style={{ marginBottom: '10px' }}>
        <Col span={12}>
          <Button type="primary" icon="plus">
            Tambah Dosen
          </Button>
        </Col>
        <Col span={12}>
          {' '}
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            width={240}
            enterButton
          />
        </Col>
      </Row>

      <Table columns={columns} />
    </Card>
  </Content>
);

export default ProfilAdmin;
