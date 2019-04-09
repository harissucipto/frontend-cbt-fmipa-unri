import { Table, Checkbox } from 'antd';
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
        {
          title: 'teralambat',
          key: 'teralambat',
          dataIndex: 'teralambat',
          render: text => <Checkbox checked={text} />,
        },
        {
          title: 'Wajah Tidak Sesuai',
          key: 'wajah',
          dataIndex: 'wajah',
          render: text => <Checkbox checked={text} />,
        },
        {
          title: 'Sakit',
          key: 'sakit',
          dataIndex: 'sakit',
          render: text => <Checkbox checked={text} />,
        },
        {
          title: 'Menggunakan Alat Dilarang',
          key: 'menyontek',
          dataIndex: 'menyontek',
          render: text => <Checkbox checked={text} />,
        },
        {
          title: 'Menyontek',
          key: 'alatDilarang',
          dataIndex: 'alatDilarang',
          render: text => <Checkbox checked={text} />,
        },
      ]}
      dataSource={props.mahasiswas}
      rowKey={record => record.id}
      bordered
      pagination={false}
    />
  );
};

export default TableMahasiswa;
