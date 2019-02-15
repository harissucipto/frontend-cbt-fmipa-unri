/* eslint-disable react/prop-types */
import React from 'react';
import ProfiMahasiswa from '../../components/mahasiswa/ProfiMahasiswa';

const ProfiMahasiswaPage = props => <ProfiMahasiswa id={props.query.id} />;

export default ProfiMahasiswaPage;
