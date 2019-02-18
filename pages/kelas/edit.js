/* eslint-disable react/prop-types */
import React from 'react';
import EditMataKuliah from '../../components/mataKuliah/EditMataKuliah';

const EditMataKuliahPage = props => <EditMataKuliah id={props.query.id} />;

export default EditMataKuliahPage;
