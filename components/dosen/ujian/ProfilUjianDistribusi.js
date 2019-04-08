import React, { Component } from 'react';
import { List, Avatar } from 'antd';

export default class ProfilUjian extends Component {
  render() {
    const { grid, ujian } = this.props;

    return (
      <List grid={grid}>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="info" />}
            title={<a>Nama Ujian</a>}
            description={ujian.nama}
          />
        </List.Item>

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
            avatar={<Avatar icon="bank" />}
            title={<a>Kelas</a>}
            description={`${ujian.kelas.nama} - ${ujian.kelas.mataKuliah.nama}`}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="file" />}
            title={<a>Bank Soal</a>}
            description={ujian.bankSoal.nama}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="info" />}
            title={<a>Jumlah Soal</a>}
            description={ujian.JumlahSoal}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="setting" />}
            title={<a>Tingkat Kesulitan Soal Susah</a>}
            description={`${ujian.presentasiSusah}% (${Math.round(ujian.presentasiSusah * ujian.JumlahSoal) / 100} soal)`}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="setting" />}
            title={<a>Tingkat Kesulitan Soal Sedang</a>}
            description={`${ujian.presentasiSedang}% (${Math.round(ujian.presentasiSedang * ujian.JumlahSoal) / 100} soal)`}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="setting" />}
            title={<a>Tingkat Kesulitan Soal Mudah</a>}
            description={`${ujian.presentasiMudah}% (${Math.round(ujian.presentasiMudah * ujian.JumlahSoal) / 100} soal)`}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="setting" />}
            title={<a>Tingkat Kesulitan Soal Acak</a>}
            description={`${100 -
              ujian.presentasiMudah -
              ujian.presentasiSedang -
              ujian.presentasiSusah}% (${Math.round((100 - ujian.presentasiMudah - ujian.presentasiSedang - ujian.presentasiSusah) *
                ujian.JumlahSoal) / 100} soal)`}
          />
        </List.Item>
      </List>
    );
  }
}
