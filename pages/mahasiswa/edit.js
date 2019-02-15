/* eslint-disable react/prop-types */
import React from 'react';
import EditMahasiswa from '../../components/mahasiswa/EditMahasiswa';

const EditMahasiswaPage = props => <EditMahasiswa id={props.query.id} />;

export default EditMahasiswaPage;
