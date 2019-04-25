import React, { Component } from 'react';
import { Menu,Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Encrypt from '../util/encrypt'
const SubMenu = Menu.SubMenu;
export default class LeftComponent extends Component{

    constructor(){
        super();
        this.state ={
            selectListId:'',
            userId:'77113061',
            musicLists:[],
            createList:[],
            collectionList:[],
        }
    }
    componentDidMount(){
        this.getMusicList('77113061');
    }

    //分类歌单，分成我收藏的歌单和我创建的歌单
    splitLists(){
        this.state.musicLists.map( (item)=>{
            if(item['userId']+''===this.state.userId){
                let tempList =this.state.createList;
                tempList.push(item)
                this.setState({createList:tempList})
            }else{
                let tempList =this.state.collectionList;
                tempList.push(item)
                this.setState({collectionList:tempList})
            }

        })

    }
    //获取歌单信息
    getMusicList(id){
        const text ={
            'csrf_token': null,
      'limit': "1001",
      'offset': "0",
      'uid':id
        }
        
        axios.post("http://127.0.0.1:8080/music/allPlayList",{'params':Encrypt.EncryptRequest(JSON.stringify(text))}).then(
            (res)=>{
               
                this.setState({musicLists:res['data']['playlist']})
                this.splitLists();
                console.log(this.state.collectionList);
                console.log(this.state.createList);
            }
        )

    }
          //选择歌单
          selectListClick=(item)=>{
            console.log(item);

        }
    render(){
  
        return (
            <div style={{marginTop:'80px'}}>
                <Menu mode="inline" theme='dark'>
                <Menu.Item>
                <Icon type="pie-chart" />
                <span>我的信息</span>
                </Menu.Item>
                <Menu.Item>
                <Icon type="pie-chart" />
                <span>创建歌单</span>
                </Menu.Item>

                <SubMenu key ="sub2" title={<span><Icon type="user" /><span>我创建的歌单</span></span>}>
               
                    {
                        
                         this.state.createList.map((item,index)=>{


                            return  <Menu.Item key={index}><Link to={`/songsheet/${item.id}`} >{item.name}</Link>  </Menu.Item>
                        } )
                    }
    
                </SubMenu>
                <SubMenu key ="sub1" title={<span><Icon type="user" /><span>我收藏的歌单</span></span>}>
                {
                        
                        this.state.collectionList.map((item,index)=>{


                           return  <Menu.Item key={index+this.state.createList.length}><Link to={`/songsheet/${item.id}`} >{item.name}</Link>  </Menu.Item>
                       } )
                   }
   
                </SubMenu>
                </Menu>
            
            </div>
        )
    }
}