import React, { Component } from 'react';
import { List, Avatar, Row, Col } from 'antd';

import moment from 'moment';
import 'moment/locale/id';

export default class ProfilUjian extends Component {
  render() {
    const { grid, ujian, mahasiswa } = this.props;

    return (
      <Row>
        <Col xs={24} md={5}>
          <List.Item>
            <List.Item.Meta description={<Avatar src={mahasiswa.image} size={200} />} />
          </List.Item>
        </Col>
        <Col xs={24} md={17}>
          <List grid={grid}>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="user" />}
                title={<a>Nama Peserta</a>}
                description={mahasiswa.nama}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="info" />}
                title={<a>NIM</a>}
                description={mahasiswa.nim}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="info" />}
                title={<a>Nama Ujian</a>}
                description={ujian.nama}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="schedule" />}
                title={<a>Tanggal Pelaksanaan</a>}
                description={moment(ujian.tanggalPelaksanaan).format('dddd, Do MMMM  YYYY')}
              />
            </List.Item>

            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="schedule" />}
                title={<a>Waktu Pelaksanaan</a>}
                description={moment(ujian.tanggalPelaksanaan).format('hh:mm a')}
              />
            </List.Item>

            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="schedule" />}
                title={<a>Durasi Ujian</a>}
                description={`${ujian.durasiPengerjaan} menit`}
              />
            </List.Item>
            {/* <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="info" />}
                          title={<a> Mata Kuliah</a>}
                          description={ujian.mataKuliah ? ujian.mataKuliah.nama : '-'}
                        />
                      </List.Item> */}

            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="deployment-unit" />}
                title={<a>Jurusan</a>}
                description={ujian.prodi.jurusan.nama}
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="cluster" />}
                title={<a>Program Studi</a>}
                description={ujian.prodi.nama}
              />
            </List.Item>

            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="user" />}
                title={<a>Dosen</a>}
                description={ujian.dosen ? ujian.dosen.nama : '-'}
              />
            </List.Item>

            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="bank" />}
                title={<a>Kelas</a>}
                description={`${ujian.kelas.nama} - ${ujian.kelas.mataKuliah.nama}`}
              />
            </List.Item>

            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon="info" />}
                title={<a>Jumlah Soal</a>}
                description={ujian.JumlahSoal}
              />
            </List.Item>
          </List>
        </Col>
      </Row>
    );
  }
}
