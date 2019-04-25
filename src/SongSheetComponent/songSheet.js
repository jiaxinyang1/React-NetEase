import React, { Component } from 'react';
import { Row, Col,Tag, Avatar ,Button,Table} from 'antd';

import axios from 'axios';
import Encrypt from '../util/encrypt'

const { Column } = Table;
export default class SongSheetComponent extends Component{

    constructor(){   
        super();
        this.state={
            listId:'2330265564',
            listDetail:[],
            songs:[],
            creator:[],
            tag:[]
        }
  
    }
    componentDidMount(){
        this.getListDetail(this.state.listId);
    }
   componentWillReceiveProps(newProps){
        if(newProps.match.params.id !=this.state.listId){
            this.setState({listId:newProps.match.params.id})
            this.getListDetail(newProps.match.params.id)
        }
    }
    
    //Unix时间戳转换
    formatTime (time) {
        let unixtime = time/1000
        let unixTimestamp = new Date(unixtime * 1000)
        let Y = unixTimestamp.getFullYear()
        let M = ((unixTimestamp.getMonth() + 1) > 10 ? (unixTimestamp.getMonth() + 1) : '0' + (unixTimestamp.getMonth() + 1))
        let D = (unixTimestamp.getDate() > 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate())
        let toDay = Y + '-' + M + '-' + D
        return toDay
      }
    //获取歌单详细信息
    getListDetail(id){
        
        let text={
            'csrf_token': "2ddf80cd13670b89cb70f7e6c88d16d2",
            'id': id,
            'limit': "1000",
            'n': "1000",
            'offset': "0",
            'total': "true"
          }
        axios.post("http://127.0.0.1:8080/music/playListDetail",{'params':Encrypt.EncryptRequest(JSON.stringify(text))}).then( (res)=>{
          
            this.setState({listDetail:res['data']['playlist'],
                            songs:res['data']['playlist']['tracks'],
                            creator:res['data']['playlist']['creator'],
                            tag:res['data']['playlist']['tags']})
                            console.log(this.state.listDetail);
        })
        
    }
    render(){
        return(
            <div>
                <Row type="flex" justify="start">
                <Col span={5}> <img  src={this.state.listDetail.coverImgUrl} style={{maxWidth: '300px',maxHeight:'300px'}}/> </Col>
                <Col span={18}>
                    <div>
                        <Tag  color='red'>歌单</Tag>
                        <h2 style={{display: 'inline',marginLeft :'5px'}}>{this.state.listDetail.name}</h2>
                        <label style={{float: 'right'}}>歌曲数</label>
                        <label style={{float: 'right',marginLeft: '5px'}}>播放数</label>
                    </div>
                    <div style={{marginTop:'10px'}}>
                    <Avatar src={this.state.creator.avatarUrl} />
                    <label style={{marginLeft:'10px'}}>{this.state.creator.nickname}</label>
                    <label style={{marginLeft:'10px'}}>{this.formatTime(this.state.listDetail.createTime)}</label>
                    </div>
                    <div style={{marginTop:'10px'}}>
                        <Button >播放全部</Button>
                        <Button  style={{marginLeft:'10px'}}>收藏</Button>
                        <Button style={{marginLeft:'10px'}}>分享</Button>
                    </div>
                    <div style={{marginTop:'10px'}}>
                    <label style={{marginRight: '5px'}}>标签:</label>
                    {
                        this.state.tag.map( (tag,index)=>{
                            return <Tag color='red' key={index}>{tag}</Tag>
                        })
                    }
                    </div>
                    <div style={{marginTop:'10px'}}>
                        <label>简介：</label>
                        <p>{this.state.listDetail.description}</p>
                        </div>

                </Col>
                </Row>
                <div style={{marginTop:'10px'}}>
                <Table dataSource={this.state.songs} >
                    <Column width={500} title="音乐标题" dataIndex='name'  render={(name)=>(
                         <span>{ name}</span>
                    )}></Column>
                    <Column width={500} title="歌手" dataIndex='ar' render={(ar)=>(
                         <span>{ ar[0].name}</span>
                    )}></Column>
                    <Column title="专辑" dataIndex='al' render={(al)=>(
                           <span>{ al.name}</span>
                    )}></Column>
                </Table>
                </div>
            </div>
        )
    }
    

}