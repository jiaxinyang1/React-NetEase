import React, { Component } from 'react';
import { Menu,Input } from 'antd';

import { Avatar } from 'antd';
const Search = Input.Search;

export default class HeaderComponent extends Component{
    render(){
        return(
            <Menu mode="horizontal"  style={{ lineHeight: '64px' ,marginTop:'10px'}} >

            <Menu.Item key="1">
            <Search
          placeholder="input search text"
          enterButton="Search"
          onSearch={value => console.log(value)}
        />
        </Menu.Item>
          
            <Menu.Item key="3"style={{float:'right'}} >

            <Avatar icon="user" />
            </Menu.Item>
            <Menu.Item key="2" style={{float:'right'}}>
                消息
            </Menu.Item>
            </Menu>
        )
 
    }
}