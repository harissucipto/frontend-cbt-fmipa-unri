import { Container } from 'unstated';

class BuatUjian extends Container {
  state = {
    nama: '',
    tanggalPelaksanaan: '',
    lokasi: '',
    durasiPengerjaan: '',
    prodi: '', // nama
    bankSoal: '', // id
    kelas: '',
  };

  addMetaUjian(data) {
    this.setState({
      ...data,
    });
  }
}

export default BuatUjian;
