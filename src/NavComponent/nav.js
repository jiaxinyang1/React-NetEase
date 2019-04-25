import React, { Component } from 'react';
import { Layout } from 'antd';
import {HeaderComponent} from '../HeaderComponent';
import { LeftComponent } from '../LeftComponent';
import { SongSheetComponent } from '../SongSheetComponent';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const {
  Header, Content, Footer, Sider,
} = Layout;
export default class NavComponent extends Component{
      render() {
        return (
          <Layout>
        <Sider style={{
          overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
        }}
        >
          <div className="logo" />
          <LeftComponent></LeftComponent>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', padding: 0 }} >
              <HeaderComponent></HeaderComponent>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff' }}>
         
              <Route path='/songsheet/:id' component={SongSheetComponent} exact={true} ></Route>
         

            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    
        );
      }

}