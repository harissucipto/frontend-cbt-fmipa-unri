import React from 'react';
import { Input } from 'antd';
// import { Editor, EditorState, RichUtils } from 'draft-js';

// class MyEditor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { editorState: EditorState.createEmpty() };
//     this.onChange = editorState => this.setState({ editorState });
//   }

//   handleKeyCommand = (command) => {
//     const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
//     if (newState) {
//       this.onChange(newState);
//       return 'handled';
//     }
//     return 'not-handled';
//   };

//   render() {
//     return (
//       <Editor
//         handleKeyCommand={this.handleKeyCommand}
//         editorState={this.state.editorState}
//         onChange={this.onChange}
//       />
//     );
//   }
// }

// to do list buat editor keren

const MyEditor = ({ value, onChange, loading }) => (
  <Input
    disabled={loading}
    name="pertanyaan"
    value={value}
    placeholder="Nama Bank Soal"
    type="string"
    required
    onChange={onChange}
  />
);

export default MyEditor;
