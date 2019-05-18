import React from 'react';
import { Layout, Card, Form, Input, Button, Alert, Select, Spin, Table } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import XLSX from 'xlsx';

import PesanError from '../../PesanError';
import { SEARCH_LIST } from './List';
import { jurusans, prodis } from '../../../lib/jurusanProdi';

const { Content } = Layout;
const { Option } = Select;

const SheetJSFT = ['xlsx', 'xlsb', 'xlsm', 'xls', 'xml', 'csv'].map(x => `.${x}`).join(',');

const CREATE_MAHASISWA_MUTATION = gql`
  mutation CREATE_MAHASISWA_MUTATION($akunMahasiswas: [AkunMahasiswa!], $prodi: String!) {
    importAkunMahasiswa(akunMahasiswas: $akunMahasiswas, prodi: $prodi) {
      message
    }
  }
`;

const DEFAULTSTATE = {
  jurusan: '',
  prodi: '',
  prodies: [],
  loading: false,
  data: [],
};

class TambahDosen extends React.Component {
  state = {
    ...DEFAULTSTATE,
  };

  uploadFile = async (e) => {
    console.log('uploading...');
    this.setState({ loading: true });

    const reader = new FileReader();
    const [file] = e.target.files;
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const rawData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const data = rawData.map(item => ({
        nama: item[0],
        nim: item[1],
        email: item[2],
        password: item[3],
      }));
      /* Update state */
      this.setState({ data, loading: false });
      console.log(data, 'ini data');
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  saveToState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleJurusanChange = (value) => {
    this.setState({
      prodies: prodis[value],
      jurusan: value,
      prodi: prodis[value][0],
    });
  };

  handleProdiChange = async (value) => {
    this.setState({
      prodi: value,
    });
  };

  render() {
    const mahasiswas = this.state.data;
    return (
      <Mutation
        mutation={CREATE_MAHASISWA_MUTATION}
        refetchQueries={[
          {
            query: SEARCH_LIST,
            variables: {
              searchTerm: '',
              jurusan: '',
              prodi: '',
            },
          },
        ]}
        variables={{
          akunMahasiswas: this.state.data,
          prodi: this.state.prodi,
        }}
      >
        {(mutasi, {
 data, error, loading, called,
}) => {
          if (loading) return <Spin tip="Loading..." style={{ textAlign: 'center' }} />;
          return (
            <Content>
              <Card title="Import Akun Mahasiswa dari Excel">
                <div style={{ marginBottom: '30px' }}>
                  <h3>
                    Anda dapat mengimport data akun mahasiswa yang telah dibuat melalui excel dengan
                    menu ini. Kolom Pada Excel terdiri dari Kolom A - D, yaitu Nama, Nim, Email dan
                    Password. akun mahasiswa yang sudah ada tidak akan dibuat baru lagi, hanya yang
                    belum ada yang akan dibuat akunnya.
                  </h3>
                </div>
                <Form
                  method="post"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await mutasi();
                    this.setState({
                      ...DEFAULTSTATE,
                    });

                  }}
                >
                  <PesanError error={error} />
                  {!error && !loading && called && (
                    <Alert
                      message={`Buat akun  mahasiswa  berhasil`}
                      type="success"
                      showIcon
                      style={{ margin: '10px 0' }}
                    />
                  )}

                  <Form.Item
                    label="Jurusan"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18, lg: 10 }}
                  >
                    <Select placeholder="Pilih Jurusan" onChange={this.handleJurusanChange}>
                      {jurusans.map(jurusan => (
                        <Option key={jurusan} value={jurusan}>
                          {jurusan.toUpperCase()}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Program Studi"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18, lg: 10 }}
                  >
                    <Select
                      placeholder="Pilih Prodi"
                      disabled={!this.state.jurusan.length || this.state.jurusan === 'semua'}
                      value={this.state.prodi}
                      onChange={this.handleProdiChange}
                    >
                      {this.state.prodies.map(prodiku => (
                        <Option key={prodiku} value={prodiku}>
                          {prodiku.toUpperCase()}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="File Excel"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18, lg: 10 }}
                  >
                    {this.state.loading ? (
                      <Spin />
                    ) : (
                      <>
                        {this.state.image && (
                          <img src={this.state.image} alt="Upload Preview" width="200" />
                        )}
                        <Input
                          disabled={loading || this.state.jurusan.length <= 0}
                          accept={SheetJSFT}
                          name="image"
                          type="file"
                          onChange={this.uploadFile}
                        />
                      </>
                    )}
                  </Form.Item>
                  {!mahasiswas.length ? (
                    <p />
                  ) : (
                    <Table
                      loading={this.state.loading}
                      style={{ marginBottom: '20px' }}
                      bordered
                      title={() => (
                        <h2 style={{ textAlign: 'center' }}>
                          Data Import {mahasiswas.length} Akun Mahasiswa
                        </h2>
                      )}
                      pagination={false}
                      dataSource={mahasiswas}
                      rowKey={item => item.nama}
                      columns={[
                        {
                          title: 'No',
                          key: 'nomor',
                          render: (text, record, index) => index + 1,
                        },
                        {
                          title: 'Nama',
                          dataIndex: 'nama',
                          key: 'nama',
                        },
                        {
                          title: 'NIM',
                          dataIndex: 'nim',
                          key: 'nim',
                        },
                        {
                          title: 'Email',
                          dataIndex: 'email',
                          key: 'email',
                        },
                        {
                          title: 'Password',
                          dataIndex: 'password',
                          key: 'password',
                        },
                      ]}
                    />
                  )}

                  <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large" disabled={mahasiswas.length <= 0}>
                      Buat Akun
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Content>
          );
        }}
      </Mutation>
    );
  }
}

export default TambahDosen;
