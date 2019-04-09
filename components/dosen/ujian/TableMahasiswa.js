import { Table } from 'antd';
import React from 'react';

const TableMahasiswa = (props) => {
  console.log(props, 'ini props');
  return (
    <Table
      columns={[
        {
          title: 'No.',
          key: 'no',
          width: 10,
          render: (text, record, i) => <p>{i + 1}</p>,
        },
        {
          title: 'Nama',
          key: 'nama',
          dataIndex: 'mahasiswa.nama',
        },
        { title: 'NIM', key: 'nim', dataIndex: 'mahasiswa.nim' },
      ]}
      dataSource={props.mahasiswas}
      rowKey={record => record.id}
      bordered
      pagination={false}
    />
  );
};

export default TableMahasiswa;
