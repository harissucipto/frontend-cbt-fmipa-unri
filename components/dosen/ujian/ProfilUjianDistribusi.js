import React, { Component } from 'react';
import { List, Avatar } from 'antd';

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
            avatar={<Avatar icon="deployment-unit" style={{ backgroundColor: 'brown' }} />}
            title={<a>Jurusan</a>}
            description={ujian.prodi.jurusan.nama}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="cluster" style={{ backgroundColor: 'olive' }} />}
            title={<a>Program Studi</a>}
            description={ujian.prodi.nama}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="bank" style={{ backgroundColor: 'teal' }} />}
            title={<a>Kelas</a>}
            description={`${ujian.kelas.nama} - ${ujian.kelas.mataKuliah.nama}`}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="file" style={{ backgroundColor: 'navy' }} />}
            title={<a>Bank Soal</a>}
            description={ujian.bankSoal.nama}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="info" style={{ backgroundColor: 'black' }} />}
            title={<a>Jumlah Soal</a>}
            description={ujian.JumlahSoal}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="setting" style={{ backgroundColor: 'red' }} />}
            title={<a>Tingkat Kesulitan Soal Susah</a>}
            description={`${ujian.presentasiSusah}% (${Math.round((ujian.presentasiSusah * ujian.JumlahSoal) / 100)} soal)`}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="setting" style={{ backgroundColor: 'orange' }} />}
            title={<a>Tingkat Kesulitan Soal Sedang</a>}
            description={`${ujian.presentasiSedang}% (${Math.round((ujian.presentasiSedang * ujian.JumlahSoal) / 100)} soal)`}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="setting" style={{ backgroundColor: 'blue' }} />}
            title={<a>Tingkat Kesulitan Soal Mudah </a>}
            description={`${ujian.presentasiMudah}% (${Math.round((ujian.presentasiMudah * ujian.JumlahSoal) / 100)} soal)`}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="setting" />}
            title={<a>Tingkat Kesulitan Soal Acak</a>}
            description={`${ujian.JumlahSoal -
              Math.round((ujian.presentasiMudah * ujian.JumlahSoal) / 100) -
              Math.round((ujian.presentasiSusah * ujian.JumlahSoal) / 100) -
              Math.round((ujian.presentasiSedang * ujian.JumlahSoal) / 100)} soal`}
          />
        </List.Item>
      </List>
    );
  }
}
