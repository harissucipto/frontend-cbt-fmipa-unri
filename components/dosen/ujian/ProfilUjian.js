import React, { Component } from 'react';
import { List, Avatar } from 'antd';

import moment from 'moment';
import 'moment/locale/id';

export default class ProfilUjian extends Component {
  render() {
    const { grid, ujian } = this.props;

    return (
      <List grid={grid}>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="info" style={{ backgroundColor: 'maroon' }} />}
            title={<a>Nama Ujian</a>}
            description={ujian.nama}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="schedule" style={{ backgroundColor: 'brown' }} />}
            title={<a>Tanggal Pelaksanaan</a>}
            description={moment(ujian.tanggalPelaksanaan).format('dddd, Do MMMM  YYYY')}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="schedule" style={{ backgroundColor: 'olive' }} />}
            title={<a>Waktu Pelaksanaan</a>}
            description={moment(ujian.tanggalPelaksanaan).format('hh:mm a')}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="schedule" style={{ backgroundColor: 'teal' }} />}
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
            avatar={<Avatar icon="deployment-unit" style={{ backgroundColor: 'navy' }} />}
            title={<a>Jurusan</a>}
            description={ujian.prodi.jurusan.nama}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="cluster" style={{ backgroundColor: 'black' }} />}
            title={<a>Program Studi</a>}
            description={ujian.prodi.nama}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="user" style={{ backgroundColor: 'lime' }} />}
            title={<a>Dosen</a>}
            description={ujian.dosen ? ujian.dosen.nama : '-'}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="bank" style={{ backgroundColor: 'purple' }} />}
            title={<a>Kelas - Mata Kuliah</a>}
            description={`${ujian.kelas.nama} - ${ujian.kelas.mataKuliah.nama}`}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="file" style={{ backgroundColor: 'goldenrod' }} />}
            title={<a>Bank Soal</a>}
            description={ujian.bankSoal.nama}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="info" style={{ backgroundColor: '#444' }} />}
            title={<a>Jumlah Soal</a>}
            description={ujian.soals.length}
          />
        </List.Item>
      </List>
    );
  }
}
