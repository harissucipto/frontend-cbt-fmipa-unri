/* eslint-disable react/prop-types */
import React from 'react';
import Profil from '../../../components/admin/mahasiswa/Profil';

const ProfilPage = props => <Profil id={props.query.id} />;

export default ProfilPage;
