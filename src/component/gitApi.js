import React, { Component } from 'react';
import { Input , Button, Card, Col, Row,Tooltip } from 'antd';
import 'antd/dist/antd.css';
import {changeInputAction,getListAction,fetchBtnAction } from '../action/actionCreator'
import store from '../store/store';
import axios from 'axios';
import { connect } from 'react-redux';

class GitApi extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputValue:"Input the full_name to search",
            gitData:[],
            isloading: false,
            subjectName:'',
            owner:'',
            stargazersCount:'',
            watchersCount:'',
            htmlUrl:'',
            language:'',
            description:"",
         }
    }
    
    // Fetch data in the componentDidMount method
    componentDidMount(){
        const url = `https://api.github.com/search/repositories?q=subject`;
        this.props.fetchData(url);
    }
    
    // Use life cycle method to improve project performace
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.subjectName !== this.props.subjectName){
            return true;
        }else{
            return false;
        }
    }
   
    render() { 
        return(
         <div>
            <div style={{margin:'20px'}}>
                <Tooltip title="eg:Binary-Hackers/42_Subjects" placement="left">
                    <Input 
                    placeholder={this.props.inputValue}
                    style={{width:'250px' , marginRight:'10px'}}
                    onChange={this.props.changeInputValue}
                     />
                     </Tooltip>
                     <Button type='primary' 
                      onClick={this.props.fetchBtn}
                     > Search </Button>
            </div>
            <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col span={8}><Card title="Project Name" bordered={false} ><a href={this.props.htmlUrl} rel="noreferrer" target="_blank">{this.props.subjectName}</a></Card>
              </Col>
              <Col span={8}><Card title="Owner" bordered={false}>{this.props.owner}</Card>
              </Col>
              <Col span={8}><Card title="Stargazers Count" bordered={false}>{this.props.stargazersCount}</Card>
              </Col>
              <Col span={8}><Card title="Watchers Count" bordered={false}>{this.props.watchersCount}</Card>
              </Col>
              <Col span={8}><Card title="Language Used" bordered={false}>{this.props.language}</Card>
              </Col>
              <Col span={8}><Card title="Project Description" bordered={false}>{this.props.description}</Card>
              </Col>
              </Row>

              
          </div>
         </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
      inputValue:state.inputValue,
      gitData: state.gitData,
      isloading:state.isloading,
      htmlUrl:state.htmlUrl,
      owner:state.owner,
      stargazersCount:state.stargazersCount,
      watchersCount:state.watchersCount,
      language:state.language,
      description:state.description,
      subjectName:state.subjectName
    }
}

const dispatchToProps= (dispatch) =>{
    return{
        changeInputValue(e){
            const action = changeInputAction(e.target.value)
            store.dispatch(action)
        },
        fetchData(url){
            axios.get(url).then((response) => {
              const data = response.data
              const action = getListAction(data.items)
              store.dispatch(action)
            })
            .catch((error) => console.log(error));
        },
        fetchBtn(){
            const action = fetchBtnAction()
            store.dispatch(action)
        }
    }
}

export default connect(mapStateToProps,dispatchToProps)(GitApi);