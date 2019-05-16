/* eslint-disable react/prop-types */
import React from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  InputNumber,
  Alert,
  Select,
  DatePicker,
  message,
  Spin,
} from 'antd';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';

import PesanError from '../../PesanError';
import { SEARCH_LIST } from './List';
import { CURRENT_QUERY } from './Profil';
import { jurusans, prodis } from '../../../lib/jurusanProdi';
import PilihKelas from './PilihKelas';
import PilihBankSoal from './PilihBankSoal';
import PilihSoal from './PilihSoal';

import moment from 'moment';
import 'moment/locale/id';

const { Option } = Select;

const CREATE_KELAS_MUTATION = gql`
  mutation CREATE_KELAS_MUTATION(
    $id: ID!
    $nama: String!
    $tanggalPelaksanaan: DateTime!
    $lokasi: String!
    $durasiPengerjaan: Int!
    $prodi: String!
    $bankSoal: ID!
    $kelas: ID!
    $soals: SoalUpdateManyInput
  ) {
    updateUjian(
      where: { id: $id }
      data: {
        nama: $nama
        tanggalPelaksanaan: $tanggalPelaksanaan
        lokasi: $lokasi
        durasiPengerjaan: $durasiPengerjaan
        prodi: { connect: { nama: $prodi } }
        bankSoal: { connect: { id: $bankSoal } }
        kelas: { connect: { id: $kelas } }
        soals: $soals
      }
    ) {
      id
      nama
    }
  }
`;

const CREATE_KELAS_MUTATION2 = gql`
  mutation CREATE_KELAS_MUTATION(
    $nama: String!
    $tanggalPelaksanaan: DateTime!
    $lokasi: String!
    $durasiPengerjaan: Int!
    $prodi: String!
    $bankSoal: ID!
    $kelas: ID!
    $soals: SoalUpdateManyInput
  ) {
    createUjian(
      data: {
        nama: $nama
        tanggalPelaksanaan: $tanggalPelaksanaan
        lokasi: $lokasi
        durasiPengerjaan: $durasiPengerjaan
        status: true
        prodi: { connect: { nama: $prodi } }
        bankSoal: { connect: { id: $bankSoal } }
        kelas: { connect: { id: $kelas } }
        soals: $soals
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
  waktuPelaksanaan: null,
  durasiPengerjaan: undefined,
  lokasi: undefined,

  loading: false,
  soalDipilih: [],
};

class TambahDosen extends React.Component {
  state = {
    ...DEFAULTSTATE,
    posisi: 0,
    soalDipilih: [],
  };

  componentWillMount() {
    const {
      nama,
      prodi,
      kelas,
      tanggalPelaksanaan,
      durasiPengerjaan,
      lokasi,
      bankSoal,
      soals,
      id,
    } = this.props.ujian;

    this.setState({
      id,
      nama,
      waktuPelaksanaan: moment(tanggalPelaksanaan),
      durasiPengerjaan,
      lokasi,
    });

    // kelas required;
    const kelasData = {
      kelas: kelas.id,
      tampilkanNilai: `${kelas.nama} ${kelas.mataKuliah.nama}`,
      mataKuliah: kelas.mataKuliah.id,
    };

    this.handleJurusanChange(prodi.jurusan.nama);
    this.handleProdiChange(prodi.nama);
    this.rubahKelas(kelasData);
    this.rubahBankSoalBaru(bankSoal.id);

    // ubah soals ambil idnya saja
    const idSoals = soals.map(soal => soal.id);
    this.setState({ soalDipilih: idSoals, soalsLama: idSoals });
  }

  pilihSoal = (id) => {
    const { soalDipilih } = this.state;
    const sudahAda = soalDipilih.findIndex(item => item === id) >= 0;
    if (sudahAda) {
      const hapusSalahSatu = soalDipilih.filter(idSoal => idSoal !== id);
      this.setState({ soalDipilih: hapusSalahSatu });
    } else {
      this.setState({ soalDipilih: [...soalDipilih, id] });
    }
  };

  pilihSemuaSoal = (idSoals) => {
    this.setState({ soalDipilih: idSoals });
  };

  hapusSemuaPilihanSoal = () => {
    this.setState({ soalDipilih: [] });
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
      kelas: undefined,
      kelasNama: undefined,
      bankSoal: undefined,
      soalDipilih: [],
    });
  };

  handleProdiChange = (value) => {
    console.log(value, 'prodi');
    this.setState({
      prodi: value,
      kelas: undefined,
      kelasNama: undefined,
      bankSoal: undefined,
      soalDipilih: [],
    });
  };

  rubahKelas = (value) => {
    console.log(value, 'ini');
    this.setState({
      kelas: value.kelas,
      mataKuliah: value.mataKuliah,
      kelasNama: value.tampilkanNilai,
      bankSoal: undefined,

      soalDipilih: [],
    });
  };

  rubahBankSoalBaru = (value) => {
    this.setState({
      bankSoal: value,
    });
  };

  rubahBankSoal = (value) => {
    this.setState({
      bankSoal: value,
      soalDipilih: [],
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
        soals: {
          disconnect: this.state.soalsLama.map(item => ({ id: item })),
          connect: this.state.soalDipilih.map(item => ({ id: item })),
        },
        durasiPengerjaan: this.state.durasiPengerjaan,
        prodi: this.state.prodi,
        bankSoal: this.state.bankSoal,
        kelas: this.state.kelas,
      },
    }).catch(() => message.error('Error, Koneksi Jaringan Internet!'));
    // this.setState({ ...DEFAULTSTATE, kelasNama: undefined });
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
            <Form.Item
              label="Durasi Pengerjaan (menit)"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <InputNumber
                placeholder="Dalam menit"
                size="100"
                value={this.state.durasiPengerjaan}
                onChange={nilai => this.setState({ durasiPengerjaan: nilai })}
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
                      message="Buat  Ujian   berhasil"
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
                    <Button type="dashed" onClick={() => this.setState({ posisi: 0 })}>
                      Kembali
                    </Button>
                    <Button
                      htmlType="submit"
                      type="primary"
                      disabled={this.state.soalDipilih.length <= 0}
                    >
                      Buat Ujian
                    </Button>
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

const FETCH_EDIT = ({ id }) => (
  <Query query={CURRENT_QUERY} variables={{ id }}>
    {({ data, loading, error }) => {
      if (loading) return <p>loading</p>;
      console.log(data, 'data dari bank soal');
      return <TambahDosen ujian={data.ujian} />;
    }}
  </Query>
);
export default FETCH_EDIT;
