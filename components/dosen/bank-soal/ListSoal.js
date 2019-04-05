/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Table, Divider, Button, Input, Select, Form } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ConvertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import HapusSoal from './HapusSoal';

const { Option } = Select;

const ReadOnlyEditor = (props) => {
  const storedState = ConvertFromRaw(JSON.parse(props.storedState));
  return (
    <div className="readonly-editor">
      <Editor editorState={storedState} readOnly />
    </div>
  );
};

class ListKelas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterSoal: '',
    };

    this.columns = [
      {
        title: 'No.',
        key: 'nomor',
        render: (text, record, i) => <p>{i + 1}</p>,
      },
      {
        title: 'Pertanyaan',
        dataIndex: 'pertanyaan',
        key: 'pertanyaan',
        render: (text, record) => (
          <div className="readonly-editor">
            <Editor toolbarHidden readOnly initialContentState={JSON.parse(record.pertanyaan)} />
          </div>
        ),
      },
      {
        title: 'Jawaban',
        dataIndex: 'pilihanJawab',
        key: 'pilihanJawab',
        render: (text, record, i) =>
          record.jawaban.map(item => (
            <div className="readonly-editor" key={item.id}>
              <Editor toolbarHidden readOnly initialContentState={JSON.parse(item.content)} />
            </div>
          )),
      },
      {
        title: 'Kunci Jawaban',
        dataIndex: 'kunciJawaban',
        key: 'kunciJawaban',
      },
      {
        title: 'Tingkat Kesulitan',
        dataIndex: 'tingkatKesulitan',
        key: 'tingkatKesulitan',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button
              onClick={() =>
                Router.replace({ pathname: '/dosen/bank-soal/edit-soal', query: { id: record.id } })
              }
              type="ghost"
            >
              Edit
            </Button>

            <Divider type="vertical" />

            <HapusSoal id={record.id} bankSoal={this.props.bankSoal} />
          </span>
        ),
      },
    ];
  }

  handleTingkatKesulitanSoal = soals =>
    (this.state.filterSoal === ''
      ? soals
      : soals.filter(soal => soal.tingkatKesulitan === this.state.filterSoal));

  render() {
    return (
      <>
        <Form.Item
          label="Filter Tingkat Kesulitan Soal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Select
            placeholder="Pilih Tingkat Kesulitan"
            disabled={!this.props.soals.length}
            value={this.state.filterSoal}
            onChange={value => this.setState({ filterSoal: value })}
          >
            <Option key={1} value="">
              tidak
            </Option>
            <Option key={1} value="MUDAH">
              mudah
            </Option>
            <Option key={1} value="SEDANG">
              sedang
            </Option>
            <Option key={1} value="SUSAH">
              susah
            </Option>
          </Select>
        </Form.Item>
        <Form.Item label="Total Soal" labelCol={{ span: 3 }} wrapperCol={{ span: 16 }}>
          {this.props.soals.length ? this.handleTingkatKesulitanSoal(this.props.soals).length : 0}
        </Form.Item>

        <Table
          columns={this.columns}
          dataSource={
            this.props.soals.length ? this.handleTingkatKesulitanSoal(this.props.soals) : []
          }
          rowKey={record => record.id}
          loading={this.props.loading}
        />
      </>
    );
  }
}

export default ListKelas;
