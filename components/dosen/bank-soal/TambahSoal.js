import React from 'react';
import { Layout, Card, Form, Input, Button, Alert, Select } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import PesanError from '../../PesanError';
import { CURRENT_QUERY } from './Profil';
import DetailBankSoal from './DetailBankSoal';
import PIlihTingkatKesulitan from './PIlihTingkatKesulitan';
import Pertanyaan from './Pertanyaan';
import Jawaban from './Jawaban';
import PilihKunciJawaban from './PilihKunciJawaban';

const CREATE_SOAL = gql`
  mutation CREATE_SOAL(
    $pertanyaan: String!
    $kunciJawaban: String!
    $jawaban: [JawabanCreateInput!]
    $tingkatKesulitan: String!
    $bankSoal: ID!
  ) {
    createSoal(
      data: {
        pertanyaan: $pertanyaan
        kunciJawaban: $kunciJawaban
        bankSoal: { connect: { id: $bankSoal } }
        tingkatKesulitan: $tingkatKesulitan
        jawaban: { create: $jawaban }
      }
    ) {
      bankSoal {
        nama
      }
    }
  }
`;

class TambahSoal extends React.Component {
  state = {
    pertanyaan: '',
    jawaban: [
      {
        key: 'a',
        value: '',
      },
      {
        key: 'b',
        value: '',
      },
      {
        key: 'c',
        value: '',
      },
      {
        key: 'd',
        value: '',
      },
    ],
    kunciJawaban: undefined,
    tingkatKesulitan: undefined,
  };

  saveToState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  pushJawaban = (e) => {
    const { name, value } = e.target;

    const jawaban = this.state.jawaban.map((jawab) => {
      if (jawab.key === name) {
        return {
          ...jawab,
          value,
        };
      }
      return jawab;
    });

    this.setState({
      jawaban,
    });
  };

  changeTingkatKesulitan = (tingkatKesulitan) => {
    this.setState({ tingkatKesulitan });
  };

  changeKunciJawaban = (kunciJawaban) => {
    this.setState({ kunciJawaban });
  };

  valueJawaban = name => this.state.jawaban.filter(jawab => jawab.key === name)[0].value;

  createSoal = async (mutasi) => {
    console.log('make');

    const soalBaru = {
      pertanyaan: this.state.pertanyaan,
      kunciJawaban: this.state.kunciJawaban,
      bankSoal: this.props.id,
      tingkatKesulitan: this.state.tingkatKesulitan,
      jawaban: this.state.jawaban.map(item => ({
        title: item.key,
        content: item.value,
      })),
    };

    console.log(soalBaru);
    await mutasi({
      variables: soalBaru,
    });
  };

  render() {
    return (
      <>
        <DetailBankSoal id={this.props.id} />
        <Card title="Buat Soal">
          <Mutation
            mutation={CREATE_SOAL}
            refetchQueries={[
              {
                query: CURRENT_QUERY,
                variables: {
                  id: this.props.id,
                },
              },
            ]}
          >
            {(createSoal, {
 error, data, loading, called,
}) => {
              if (loading) return <p>loading...</p>;
              console.log(data);

              return (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.createSoal(createSoal);
                  }}
                >
                  <PesanError error={error} />
                  {!error && !loading && called && (
                    <Alert
                      message="Buat soal berhasil"
                      type="success"
                      showIcon
                      style={{ margin: '10px 0' }}
                    />
                  )}
                  <Form.Item label="Tingkat Kesulitan">
                    <PIlihTingkatKesulitan
                      value={this.state.tingkatKesulitan}
                      onChange={this.changeTingkatKesulitan}
                    />
                  </Form.Item>
                  <Form.Item label="Pertanyaan">
                    <Pertanyaan onChange={this.saveToState} value={this.state.pertanyaan} />
                  </Form.Item>

                  <Form.Item label="Jawaban">
                    <Form.Item label="A">
                      <Jawaban
                        onChange={this.pushJawaban}
                        value={this.valueJawaban('a')}
                        name="a"
                      />
                    </Form.Item>
                    <Form.Item label="B">
                      <Jawaban
                        onChange={this.pushJawaban}
                        value={this.valueJawaban('b')}
                        name="b"
                      />
                    </Form.Item>
                    <Form.Item label="C">
                      <Jawaban
                        onChange={this.pushJawaban}
                        value={this.valueJawaban('c')}
                        name="c"
                      />
                    </Form.Item>
                    <Form.Item label="D">
                      <Jawaban
                        onChange={this.pushJawaban}
                        value={this.valueJawaban('d')}
                        name="d"
                      />
                    </Form.Item>
                  </Form.Item>

                  <Form.Item label="Kunci Jawaban">
                    <PilihKunciJawaban
                      data={this.state.jawaban}
                      value={this.state.kunciJawaban}
                      onChange={this.changeKunciJawaban}
                    />
                  </Form.Item>

                  <Button type="primary" htmlType="submit">
                    Buat Soal
                  </Button>
                </Form>
              );
            }}
          </Mutation>
        </Card>
      </>
    );
  }
}

export default TambahSoal;
