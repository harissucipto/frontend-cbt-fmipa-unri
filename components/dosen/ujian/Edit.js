import React from 'react';
import {
  Layout,
  Card,
  Form,
  Input,
  Button,
  Alert,
  Select,
  DatePicker,
  Slider,
  InputNumber,
  Row,
  Col,
} from 'antd';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import locale from 'antd/lib/locale-provider/zh_CN';

import PesanError from '../../PesanError';
import { SEARCH_LIST } from './List';
import { CURRENT_QUERY } from './Profil';
import { jurusans, prodis } from '../../../lib/jurusanProdi';
import PilihKelas from './PilihKelas';
import PilihBankSoal from './PilihBankSoal';


import moment from 'moment';
import 'moment/locale/id';
import { th } from 'date-fns/esm/locale';

const { Content } = Layout;
const { Option } = Select;

const CREATE_KELAS_MUTATION = gql`
  mutation CREATE_KELAS_MUTATION(
    $id: ID!
    $nama: String!
    $tanggalPelaksanaan: DateTime!
    $lokasi: String!
    $jumlahSoal: Int!
    $presentasiSusah: Float!
    $presentasiSedang: Float!
    $presentasiMudah: Float!
    $durasiPengerjaan: Int!
    $prodi: String!
    $bankSoal: ID!
    $kelas: ID!
  ) {
    updateUjian(
      where: { id: $id }
    data: {
  nama: $nama
  tanggalPelaksanaan: $tanggalPelaksanaan
  lokasi: $lokasi
  JumlahSoal: $jumlahSoal
  presentasiSusah: $presentasiSusah
  presentasiSedang: $presentasiSedang
  presentasiMudah: $presentasiMudah
  durasiPengerjaan: $durasiPengerjaan
  status: true
  prodi: {
    connect: {
      nama: $prodi
    }
  }
       bankSoal: {
        connect: {
          id: $bankSoal
        }
      }

        kelas: {
        connect: {
          id: $kelas
        }
      }



    }
  ) {

    id
    nama
  } }

`;

const DEFAULTSTATE = {
  nama: '',
  jurusan: '',
  prodi: '',
  prodies: [],
  kelas: undefined,
  mataKuliah: '',
  bankSoal: undefined,
  mudah: 0,
  sedang: 0,
  susah: 0,
  errorJumlahSoal: '',
  errorPersentasiSoal: '',

  totalSoalDibutuhkan: 0,
  mudahDibutuhkan: 0,
  susahDibutuhkan: 0,
  sedangDibutuhkan: 0,

  waktuPelaksanaan: null,
  durasiPengerjaan: undefined,
  lokasi: undefined,
};

class TambahDosen extends React.Component {
  state = {
    id: this.props.ujian.id,
    nama: this.props.ujian.nama,
    jurusan: this.props.ujian.prodi.jurusan.nama,
    prodi: this.props.ujian.prodi.nama,
    prodies: [],
    kelas: this.props.ujian.kelas.id,
    kelasNama: `${this.props.ujian.kelas.nama}  ${this.props.ujian.kelas.mataKuliah.nama}` ,
    mataKuliah: '',
    bankSoal: this.props.ujian.bankSoal.id,
    mudah: 0,
    sedang: 0,
    susah: 0,
    errorJumlahSoal: '',
    errorPersentasiSoal: '',

    totalSoalDibutuhkan: this.props.ujian.JumlahSoal,
    mudahDibutuhkan: this.props.ujian.presentasiMudah,
    susahDibutuhkan: this.props.ujian.presentasiSusah,
    sedangDibutuhkan: this.props.ujian.presentasiSedang,

    waktuPelaksanaan: moment(this.props.ujian.waktuPelaksanaan),
    durasiPengerjaan: this.props.ujian.durasiPengerjaan,
    lokasi: this.props.ujian.lokasi,
  };



  saveToState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  setSoal = (soals) => {
    if (!soals.length) return;
    console.log(soals);
    const susah = soals.filter(soal => soal.tingkatKesulitan === 'SUSAH').length;
    const sedang = soals.filter(soal => soal.tingkatKesulitan === 'SEDANG').length;
    const mudah = soals.filter(soal => soal.tingkatKesulitan === 'MUDAH').length;
    this.setState({ susah, sedang, mudah });
  };

  totalSoal = () => {
    const { mudah, sedang, susah } = this.state;
    return mudah + sedang + susah;
  };

  handleJurusanChange = (value) => {
    this.setState({
      prodies: prodis[value],
      jurusan: value,
      prodi: prodis[value][0],
      kelas: undefined,
      kelasNama: undefined,
      bankSoal: undefined,

      errorJumlahSoal: '',
      errorPersentasiSoal: '',

      totalSoalDibutuhkan: 0,
      mudahDibutuhkan: 0,
      susahDibutuhkan: 0,
      sedangDibutuhkan: 0,
    });
  };

  handleProdiChange = (value) => {
    console.log(value, 'prodi');
    this.setState({
      prodi: value,
      kelas: undefined,
      kelasNama: undefined,
      bankSoal: undefined,

      errorJumlahSoal: '',
      errorPersentasiSoal: '',

      totalSoalDibutuhkan: 0,
      mudahDibutuhkan: 0,
      susahDibutuhkan: 0,
      sedangDibutuhkan: 0,
    });
  };

  rubahKelas = (value) => {
    console.log(value, 'ini');
    this.setState({
      kelas: value.kelas,
      mataKuliah: value.mataKuliah,
      kelasNama: value.tampilkanNilai,
      bankSoal: undefined,

      errorJumlahSoal: '',
      errorPersentasiSoal: '',

      totalSoalDibutuhkan: 0,
      mudahDibutuhkan: 0,
      susahDibutuhkan: 0,
      sedangDibutuhkan: 0,
    });
  };

  rubahBankSoal = (value) => {
    this.setState({
      bankSoal: value,

      errorJumlahSoal: '',
      errorPersentasiSoal: '',

      totalSoalDibutuhkan: 0,
      mudahDibutuhkan: 0,
      susahDibutuhkan: 0,
      sedangDibutuhkan: 0,
    });
  };

  rubahJumlahSoal = (value) => {
    const mau = value.target.value;
    this.setState({
      totalSoalDibutuhkan: mau,
      errorJumlahSoal: '',
    });
    if (mau > this.totalSoal()) {
      const errorJumlahSoal = `Error Soal Tidak Mencukupi, dibutuhkan ${Math.abs(this.totalSoal() - mau)} soal lagi`;
      this.setState({ errorJumlahSoal });
    }
  };

  ErrorPersen = (buatSoal, penyimpanan, persen, text) => {
    const dibutuhkan = Math.floor((buatSoal * persen) / 100);
    const sisa = Math.floor(penyimpanan - dibutuhkan);

    console.log(sisa, dibutuhkan, 'hhh');

    if (sisa < 0) {
      console.log('kkk');
      return `${text},  dibutuhkan ${Math.abs(sisa)}  soal lagi dari ${dibutuhkan} soal `;
    } else {
      console.log('tidak');
      return '';
    }
  };

  rubahPersenMudahSoal = (value) => {
    const mau = value;

    this.setState({
      mudahDibutuhkan: mau,
      errorPersentasiSoal: this.ErrorPersen(
        this.state.totalSoalDibutuhkan,
        this.state.mudah,
        Number(mau),
        'Error Memberikan Presntasi tingkat Kesulitan Mudah, Dibutuhkan Beberapa Soal untuk soal tingkat Kesulitan Mudah',
      ),
    });
  };

  rubahPersenSedangSoal = (value) => {
    const mau = value;

    this.setState({
      sedangDibutuhkan: mau,
      errorPersentasiSoal: this.ErrorPersen(
        this.state.totalSoalDibutuhkan,
        this.state.sedang,
        Number(mau),
        'Error Memberikan Presntasi tingkat Kesulitan Sedang, Dibutuhkan Beberapa Soal untuk soal tingkat Kesulitan Sedang',
      ),
    });
  };

  rubahPersenSusahSoal = (value) => {
    const mau = value;

    this.setState({
      susahDibutuhkan: mau,
      errorPersentasiSoal: this.ErrorPersen(
        this.state.totalSoalDibutuhkan,
        this.state.susah,
        Number(mau),
        'Error Memberikan Presntasi tingkat Kesulitan Susah, Dibutuhkan Beberapa Soal untuk soal tingkat Kesulitan Susah',
      ),
    });
  };

  submit = async (mutation) => {
    console.log(this.state);

    console.log(this.state.waktuPelaksanaan.format());

    await mutation({
      variables: {
        id: this.state.id,
        nama: this.state.nama,
        tanggalPelaksanaan: this.state.waktuPelaksanaan.format(),
        lokasi: this.state.lokasi,
        jumlahSoal: this.state.totalSoalDibutuhkan,
        presentasiSusah: this.state.susahDibutuhkan,
        presentasiMudah: this.state.mudahDibutuhkan,
        presentasiSedang: this.state.sedangDibutuhkan,
        durasiPengerjaan: this.state.durasiPengerjaan,
        prodi: this.state.prodi,
        bankSoal:  this.state.bankSoal,
        kelas:  this.state.kelas
      },
    });

  };

  render() {
    return (
      <Mutation
        mutation={CREATE_KELAS_MUTATION}
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
          nama: this.state.nama.toLowerCase(),
          prodi: this.state.prodi,
          dosen: this.state.dosen,
          mataKuliah: this.state.mataKuliah,
        }}
      >
        {(createMataKuliah, {
 data, error, loading, called,
}) => {

          return (
            <Content>
              <Card
                title="Update Informasi Ujian"
                style={{ maxWidth: '800px', margin: '20px auto', paddding: '20px' }}
              >
                <h2>Rubah data Ujian</h2>
                <Form
                  method="post"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await this.submit(createMataKuliah);
                  }}
                >
                  <PesanError error={error} />
                  {!error && !loading && called && (
                    <Alert
                      message={`update  kelas  ${data.updateUjian.nama} berhasil`}
                      type="success"
                      showIcon
                      style={{ margin: '10px 0' }}
                    />
                  )}
                  <Form.Item
                    label="Nama"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      this.submit();
                    }}
                  >
                    <Input
                      disabled={loading}
                      name="nama"
                      value={this.state.nama}
                      placeholder="Nama Kelas"
                      type="string"
                      required
                      onChange={this.saveToState}
                    />
                  </Form.Item>
                  <Form.Item label="Jurusan" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <Select placeholder="Pilih Jurusan" value={this.state.jurusan} onChange={this.handleJurusanChange}>
                      {jurusans.map(jurusan => (
                        <Option key={jurusan} value={jurusan}>
                          {jurusan.toUpperCase()}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Program Studi" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
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
                  {/* <Form.Item label="MataKuliah" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <PilihMataKuliah
                      jurusan={this.state.jurusan}
                      prodi={this.state.prodi}
                      mataKuliahIni={this.state.mataKuliah}
                      rubahState={this.handeMataKuliahChange}
                    />
                  </Form.Item>

                  <Form.Item label="Dosen" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <PIlihDosen dosenIni={this.state.dosen} rubahState={this.handleDosenChange} />
                  </Form.Item> */}
                  <Form.Item label="Kelas" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <PilihKelas
                      value={this.state.kelasNama}
                      onChange={this.rubahKelas}
                      jurusan={this.state.jurusan}
                      prodi={this.state.prodi}
                    />
                  </Form.Item>{' '}
                  <Form.Item
                    label="Waktu Pelaksanaan"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                  >
                    <DatePicker
                      placeholder="Pilih tanggal"
                      showTime
                      value={this.state.waktuPelaksanaan}
                      onChange={value => this.setState({ waktuPelaksanaan: value })}
                    />
                  </Form.Item>{' '}
                  <Form.Item
                    label="Durasi Pengerjaan"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                  >
                    <Input
                      placeholder="Dalam menit"
                      requried
                      value={this.state.durasiPengerjaan}
                      name="durasiPengerjaan"
                      onChange={this.saveToState}
                    />
                  </Form.Item>{' '}
                  <Form.Item label="Lokasi Ujian" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <Input
                      value={this.state.lokasi}
                      name="lokasi"
                      onChange={this.saveToState}
                      required
                      placeholder="tempat dilaksanakan ujian"
                    />
                  </Form.Item>{' '}
                  <Form.Item
                    label="Pilih Bank Soal"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                  >
                    <PilihBankSoal
                      mataKuliah={this.state.mataKuliah}
                      value={this.state.bankSoal}
                      onChange={this.rubahBankSoal}
                      setSoal={this.setSoal}
                    />
                  </Form.Item>{' '}
                  {}
                  <Card>
                    <h4>Detail Ketersedian Soal:</h4>
                    <ul>
                      <li>Total Soal Mudah: {this.state.mudah}</li>
                      <li>Total Soal Sedang: {this.state.sedang}</li>
                      <li>Total Soal Susah: {this.state.susah}</li>
                      <li>
                        <b>Total Soal yang tersedia: {this.totalSoal()}</b>
                      </li>
                    </ul>
                    <br />
                    {this.state.errorJumlahSoal && (
                      <div
                        style={{
                          color: 'red',
                          border: '2px solid pink',
                          margin: '5px',
                          padding: '10px',
                        }}
                      >
                        <i>{this.state.errorJumlahSoal} </i>
                      </div>
                    )}
                    <Form.Item
                      label="Jumlah Soal Ujian:"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                    >
                      <Input
                        placeholder="Banyak Soal yang akan diujiankan"
                        value={this.state.totalSoalDibutuhkan}
                        type="number"
                        onChange={this.rubahJumlahSoal}
                      />
                    </Form.Item>{' '}
                    <h4>Tingkat Kesulitan </h4>
                    {this.state.errorPersentasiSoal && (
                      <div
                        style={{
                          color: 'red',
                          border: '2px solid pink',
                          margin: '5px',
                          padding: '10px',
                        }}
                      >
                        <i>{this.state.errorPersentasiSoal} </i>
                      </div>
                    )}
                    <Form.Item
                      label="Persentasi Mudah %"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                    >
                      <Slider
                        onChange={this.rubahPersenMudahSoal}
                        value={this.state.mudahDibutuhkan}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Persentasi Sedang %"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                    >
                      <Slider
                        value={this.state.sedangDibutuhkan}
                        onChange={this.rubahPersenSedangSoal}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Persentasi Susah %"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                    >
                      <Slider
                        value={this.state.susahDibutuhkan}
                        onChange={this.rubahPersenSusahSoal}
                      />
                    </Form.Item>
                  </Card>
                  <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={this.state.errorJumlahSoal || this.state.errorPersentasiSoal}
                    >
                      Rubah Data
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


const FETCH_EDIT = ({id}) => (
  <Query query={CURRENT_QUERY} variables={{id}}>
    {
      ({data, loading, error}) => {
        if (loading) return <p>loading</p>
        console.log(data)
        return <TambahDosen ujian={data.ujian} />
      }
    }
  </Query>
)
export default FETCH_EDIT;