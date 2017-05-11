import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class Upload extends Component {
  state = {
    progress: 0,
    url: '',
  }
  render() {
    const { progress, url } = this.state;
    return (<div><button onClick={this.onClickHandle}>上传图片</button>
      <hr />
      <p>上传进度<span>{progress}</span>%</p>
      <p>上传结果图片</p>
      { !!url.length && <img src={url} alt=""/> }
      <div>
      </div></div>)
  }
  onClickHandle = async(event) => {
    const files = await new Promise(resolve => {
      const input = document.createElement('input');
      input.type = 'file';
      input.onchange = e => resolve(input.files);
      input.click();
    });
    const file = files[0];
    const _fetchData = new FormData();
    _fetchData.append('file', file);
    const onUploadProgress = (event) => {
      const { total, loaded } = event;
      const progress = Math.round(loaded * 100 / total);
      this.setState({ progress });
    }    
    const resp = await axios.post('/api/upload', _fetchData, { onUploadProgress });
    const { data: { success, data } } = resp;
    if(success) this.setState({ url: data.pictureUrl });
  }
}

export default Upload;
