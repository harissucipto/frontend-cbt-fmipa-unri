import React, { Component } from 'react';
import { Card, Select, Form, Button, Input, Alert } from 'antd';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import PesanError from '../../PesanError';
import DetailBankSoal from './DetailBankSoal';
import PIlihTingkatKesulitan from './PIlihTingkatKesulitan';
import Pertanyaan from './Pertanyaan';
import Jawaban from './Jawaban';
import PilihKunciJawaban from './PilihKunciJawaban';

const EDIT_SOAL = gql`
  mutation EDIT_SOAL(
    $pertanyaan: String!
    $kunciJawaban: String!
    $jawaban: [JawabanUpdateWithWhereUniqueNestedInput!]
    $tingkatKesulitan: String!
    $id: ID!
  ) {
    updateSoal(
      data: {
        pertanyaan: $pertanyaan
        kunciJawaban: $kunciJawaban
        tingkatKesulitan: $tingkatKesulitan
        jawaban: { update: $jawaban }
      }
      where: { id: $id }
    ) {
      id
      bankSoal {
        id
      }
    }
  }
`;

const CURRENT_SOAL = gql`
  query CURRENT_SOAL($id: ID!) {
    soal(where: { id: $id }) {
      id
      pertanyaan
      jawaban {
        id
        title
        content
      }
      kunciJawaban
      tingkatKesulitan
      bankSoal {
        id
      }
    }
  }
`;

class FormEdit extends Component {
  constructor(props) {
    super(props);

    const jawaban = this.props.soal.jawaban.map(item => ({
      key: item.title,
      value: item.content,
      id: item.id,
    }));

    console.log(jawaban);

    this.state = {
      id: this.props.soal.id,
      pertanyaan: this.props.soal.pertanyaan,
      kunciJawaban: this.props.soal.kunciJawaban,
      tingkatKesulitan: this.props.soal.tingkatKesulitan,
      jawaban,
    };
  }

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
      id: this.state.id,
      tingkatKesulitan: this.state.tingkatKesulitan,
      jawaban: this.state.jawaban.map(item => ({
        where: {
          id: item.id,
        },
        data: {
          title: item.key,
          content: item.value,
        },
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
        <DetailBankSoal id={this.props.soal.bankSoal.id} />
        <Card title="Edit Soal">
          <Mutation
            mutation={EDIT_SOAL}
            refetchQueries={[
              {
                query: CURRENT_SOAL,
                variables: {
                  id: this.props.soal.id,
                },
              },
            ]}
          >
            {(createSoal, {
 error, data, loading, called,
}) => {
              if (loading) return <p>loading...</p>;

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
                      message="Edit Soal berhasil"
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
                    Simpan Perubahan
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

class EditDosen extends Component {
  render() {
    return (
      <Query query={CURRENT_SOAL} variables={{ id: this.props.id }}>
        {({ data, loading, error }) => (
          <Card style={{ margin: '20px' }} title="Edit Bank Soal" loading={loading}>
            <FormEdit soal={data.soal} id={this.props.id} />
          </Card>
        )}
      </Query>
    );
  }
}

export default EditDosen;
