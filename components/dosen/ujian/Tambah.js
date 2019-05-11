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
  Spin,
  message,
} from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import locale from 'antd/lib/locale-provider/id_ID';

import PesanError from '../../PesanError';
import { SEARCH_LIST } from './List';
import { jurusans, prodis } from '../../../lib/jurusanProdi';
import PilihKelas from './PilihKelas';
import PilihBankSoal from './PilihBankSoal';
import PilihSoal from './PilihSoal';

import moment from 'moment';
import 'moment/locale/id';

const { Option } = Select;

const CREATE_KELAS_MUTATION = gql`
  mutation CREATE_KELAS_MUTATION(
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
    createUjian(
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
        prodi: { connect: { nama: $prodi } }
        bankSoal: { connect: { id: $bankSoal } }
        kelas: { connect: { id: $kelas } }
      }
    ) {
      id
      nama
    }
  }
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

  // persen
  maxPersen: 100,
  loading: false,
};

class TambahDosen extends React.Component {
  state = {
    ...DEFAULTSTATE,
    posisi: 0,
    soalDipilih: [],
  };

  setSoal = (soals) => {
    if (!soals.length) return;
    console.log(soals);
    const susah = soals.filter(soal => soal.tingkatKesulitan === 'SUSAH').length;
    const sedang = soals.filter(soal => soal.tingkatKesulitan === 'SEDANG').length;
    const mudah = soals.filter(soal => soal.tingkatKesulitan === 'MUDAH').length;
    this.setState({ susah, sedang, mudah });
  };

  pilihSoal = (id) => {
    const { soalDipilih } = this.state;
    const sudahAda = soalDipilih.findIndex(item => item === id) >= 0;
    if (sudahAda) {
      const hapusSalahSatu = soalDipilih.filter(idSoal => idSoal !== id);
      this.setState({ soalDipilih: hapusSalahSatu });
    } else {
      this.setState({ soalDipilih: [...soalDipilih, id] });
    }
  }

  pilihSemuaSoal = (idSoals) => {
    this.setState({ soalDipilih: idSoals });
  }

  hapusSemuaPilihanSoal = () => {
    this.setState({ soalDipilih: [] } );
  }

  saveToState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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

      mudah: 0,
      sedang: 0,
      susah: 0,
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

      mudah: 0,
      sedang: 0,
      susah: 0,
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
    const dibutuhkan = Math.round((buatSoal * persen) / 100);
    const sisa = Math.round(penyimpanan - dibutuhkan);

    console.log(sisa, dibutuhkan, 'hhh');

    if (sisa < 0) {
      console.log('kkk');
      return `${text},  dibutuhkan ${Math.abs(sisa)}  soal lagi dari ${dibutuhkan} soal `;
    } else {
      console.log('tidak');
      return '';
    }
  };

  persenKeSoal = persen => Math.round((Number(this.state.totalSoalDibutuhkan) * persen) / 100);

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
        nama: this.state.nama,
        tanggalPelaksanaan: this.state.waktuPelaksanaan.format(),
        lokasi: this.state.lokasi,
        jumlahSoal: this.state.totalSoalDibutuhkan,
        presentasiSusah: this.state.susahDibutuhkan,
        presentasiMudah: this.state.mudahDibutuhkan,
        presentasiSedang: this.state.sedangDibutuhkan,
        durasiPengerjaan: this.state.durasiPengerjaan,
        prodi: this.state.prodi,
        bankSoal: this.state.bankSoal,
        kelas: this.state.kelas,
      },
    }).catch(() => message.error('Error, Koneksi Jaringan Internet!'));
    this.setState({ ...DEFAULTSTATE, kelasNama: undefined });
  };

  render() {
    const { posisi } = this.state;

    return (
      <Card title="Buat Ujian">
        {posisi === 0 ? (
          <Form
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              this.setState({ posisi: 1 });
            }}
          >
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
                name="nama"
                value={this.state.nama}
                placeholder="Nama Ujian"
                type="string"
                required
                onChange={this.saveToState}
              />
            </Form.Item>
            <Form.Item label="Jurusan" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Select placeholder="Pilih Jurusan" onChange={this.handleJurusanChange}>
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
            <Form.Item label="Kelas" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <PilihKelas
                value={this.state.kelasNama}
                onChange={this.rubahKelas}
                jurusan={this.state.jurusan}
                prodi={this.state.prodi}
              />
            </Form.Item>{' '}
            <Form.Item label="Waktu Pelaksanaan" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <DatePicker
                placeholder="Pilih tanggal"
                showTime
                value={this.state.waktuPelaksanaan}
                onChange={value => this.setState({ waktuPelaksanaan: value })}
              />
            </Form.Item>{' '}
            <Form.Item label="Durasi Pengerjaan" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Input
                placeholder="Dalam menit"
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
                placeholder="tempat dilaksanakan ujian"
              />
            </Form.Item>{' '}
            <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Lanjut Pilih Soal
              </Button>
            </Form.Item>
          </Form>
        ) : (
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
              if (!loading) console.log(data);
              if (loading || this.state.loading) return <Spin tip="Loading..." />;
              return (
                <Form
                  method="post"
                  onSubmit={async (e) => {
                    this.setState({ loading: true });
                    e.preventDefault();
                    await this.submit(createMataKuliah);
                    this.setState({ loading: false });
                  }}
                >
                  <PesanError error={error} />
                  {!error && !loading && called && (
                    <Alert
                      message={`Buat  Ujian  ${data.createUjian.nama} berhasil`}
                      type="success"
                      showIcon
                      style={{ margin: '10px 0' }}
                    />
                  )}
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
                  </Form.Item>
                  <PilihSoal
                    id={this.state.bankSoal}
                    pilihSoal={this.pilihSoal}
                    soalDipilih={this.state.soalDipilih}
                    hapusSemua={this.hapusSemuaPilihanSoal}
                    pilihSemua={this.pilihSemuaSoal}
                  />
                  <div>
                    <Button type="dashed">Kembali</Button>
                    <Button>Buat Ujian</Button>
                  </div>

                </Form>
              );
            }}
          </Mutation>
        )}
      </Card>
    );
  }
}

export default TambahDosen;
