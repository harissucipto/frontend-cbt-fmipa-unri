/* eslint-disable react/prop-types */
import React from 'react';
import Profil from '../../../components/dosen/ujian/DetaiHasil';

const ProfilPage = props => <Profil id={props.query.id} mahasiswa={props.query.mahasiswa} />;

export default ProfilPage;
