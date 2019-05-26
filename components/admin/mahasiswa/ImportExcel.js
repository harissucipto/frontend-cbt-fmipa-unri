import React from 'react';
import { Layout, Card, Form, Input, Button, Alert, Select, Spin, Table, Row, Col } from 'antd';
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
  mutation CREATE_MAHASISWA_MUTATION($akunMahasiswas: [AkunMahasiswa!]) {
    importAkunMahasiswa(akunMahasiswas: $akunMahasiswas) {
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
      const data = rawData
        .filter(item => item[0])
        .map(item => ({
          nama: item[0],
          nim: item[1],
          email: item[2],
          password: item[3],
          prodi: item[4],
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
        }}
      >
        {(mutasi, {
 data, error, loading, called,
}) => {
          if (loading) return <Spin tip="Loading..." style={{ textAlign: 'center' }} />;
          return (
            <Content>
              <Card title="Import Akun Mahasiswa dari Excel">
                <Row gutter={30}>
                  <Col md={16}>
                    <Card
                      title="Contoh Struktur Data Import yang Valid dari Excel atau worksheet"
                      extra={
                        <Button
                          type="dashed"
                          onClick={() => {
                            const toggle = !this.state.tampilkanContoh;
                            this.setState({ tampilkanContoh: toggle });
                          }}
                        >
                          {this.state.tampilkanContoh ? 'Sembunyikan' : 'Tampilkan'}
                        </Button>
                      }
                    >
                      {this.state.tampilkanContoh && (
                        <Table
                          size="small"
                          bordered
                          pagination={false}
                          rowKey={item => item.id}
                          columns={[
                            {
                              title: 'A',
                              align: 'center',

                              dataIndex: 'nama',
                            },
                            {
                              title: 'B',
                              align: 'center',
                              dataIndex: 'nim',
                            },
                            {
                              title: 'C',
                              align: 'center',
                              dataIndex: 'email',
                            },
                            {
                              title: 'D',
                              align: 'center',
                              dataIndex: 'password',
                            },
                            {
                              title: 'E',
                              align: 'center',
                              dataIndex: 'prodi',
                            },
                          ]}
                          dataSource={[
                            {
                              id: '0',
                              nama: 'NAMA',
                              nim: 'NIM',
                              email: 'EMAIL',
                              password: 'PASSWORD',
                              prodi: 'KODE PRODI',
                            },
                            {
                              id: '1',
                              nama: 'NAMA',
                              nim: 'NIM',
                              email: 'EMAIL',
                              password: 'PASSWORD',
                              prodi: 'KODE PRODI',
                            },
                          ]}
                        />
                      )}
                    </Card>
                  </Col>
                  <Col md={8}>
                    <Card
                      title="Daftar Kode Prodi"
                      onClick={() => {
                        const toggle = !this.state.tampilkanKode;
                        this.setState({ tampilkanKode: toggle });
                      }}
                      extra={
                        <Button type="dashed">
                          {this.state.tampilkanKode ? 'Sembunyikan' : 'Tampilkan'}
                        </Button>
                      }
                    >
                      {this.state.tampilkanKode && (
                        <Table
                          bordered
                          pagination={false}
                          rowKey={item => item.kode}
                          columns={[
                            {
                              title: 'Kode Prodi',
                              dataIndex: 'kode',
                              key: 'kode',
                            },,
                            {
                              title: 'keterangan',
                              dataIndex: 'id',
                              key: 'id',
                              render: text => text.toUpperCase(),
                            },
                          ]}
                          size="small"
                          dataSource={[
                            {
                              kode: '45201',
                              id: 's1 fisika',
                            },
                            {
                              kode: '30101',
                              id: 's2 fisika',
                            },
                            {
                              kode: '49201',
                              id: 's1 statistika',
                            },
                            {
                              kode: '44201',
                              id: 's1 matematika',
                            },
                            {
                              kode: '44101',
                              id: 's2 matematika',
                            },
                            {
                              kode: '56201',
                              id: 's1 sistem informasi',
                            },
                            {
                              kode: '57401',
                              id: 'd3 manajemen informatika',
                            },
                            {
                              kode: '47201',
                              id: 's1 kimia',
                            },
                            {
                              kode: '47101',
                              id: 's2 kimia',
                            },
                            {
                              kode: '47001',
                              id: 's3 kimia',
                            },
                            {
                              kode: '46201',
                              id: 's1 biologi',
                            },
                            {
                              kode: '46101',
                              id: 's2 biologi',
                            },
                          ]}
                        />
                      )}
                    </Card>
                  </Col>
                </Row>

                <div style={{ marginBottom: '30px', marginTop: '40px' }}>
                  <h3>
                    Anda dapat mengimport data akun mahasiswa yang telah dibuat melalui excel dengan
                    menu ini. Kolom tabel terdiri dari Kolom A - E, yaitu yang berisi Nama, NIM,
                    Email, Password dan Kode Prodi (untuk mengetahui lebih lanjut bisa melihat
                    contoh diatas). Silahkan mengimport data Mahasiswa dengan memilih file excel
                    atau worksheet pada form dibawah ini.
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
                      message="Buat akun  mahasiswa  berhasil"
                      type="success"
                      showIcon
                      style={{ margin: '10px 0' }}
                    />
                  )}

                  <Form.Item
                    label="Pilih File Excel Untuk Di import"
                    style={{ fontWeight: 'bolder', fontSize: '16px' }}
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
                          disabled={loading}
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
                        <h2 style={{ textAlign: 'center' }}>{mahasiswas.length} Data Mahasiswa</h2>
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
                        {
                          title: 'Kode Prodi',
                          dataIndex: 'prodi',
                          key: 'prodi',
                        },
                      ]}
                    />
                  )}

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      disabled={mahasiswas.length <= 0}
                    >
                      Buat Akun / Import Data
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
