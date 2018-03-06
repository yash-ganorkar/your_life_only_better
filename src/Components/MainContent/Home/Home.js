import React, {Component} from 'react'
import {ActivityIndicator, View} from "react-native";
import {connect} from "react-redux";
import TweetDetails from "./TweetDetails";
import Dataset from "impagination";
import {Content} from "native-base/dist/src/basic/Content";

class Home extends Component {

    setCurrentReadOffset = (event) => {
        // Log the current scroll position in the list in pixels
        console.log(event.nativeEvent.contentOffset.y);

        let itemHeight = 402;
        let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
        let currentItemIndex = Math.ceil(currentOffset / itemHeight);

        this.state.dataset.setReadOffset(currentItemIndex);

    };

    // setupImpagination() {
    //     let token = 'Bearer ' + this.props.access_token;
    //         let dataset = new Dataset({
    //
    //             pageSize: 10,
    //
    //             observe: (datasetState) => {
    //                 this.setState({
    //                     datasetState: datasetState});
    //             },
    //
    //         fetch(pageOffset) {
    //                 let url = 'https://api-test.yolobe.com/api1/share/feed?from='+ pageOffset +'&size=10'
    //                 console.log(url)
    //             return fetch(url,{
    //                 method: "GET",
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'content-type': 'application/json',
    //                     'Authorization': token
    //                 },
    //             })
    //                 .then(response => response.data)
    //                 .catch((error) => {
    //                     console.error(error);
    //                 });
    //         }
    //     });
    //
    //     dataset.setReadOffset(0);
    //     this.setState({dataset:dataset});
    //         console.log(this.state)
    // }

    constructor(props) {
        super(props);

        this.state = {
            dataset: null,
            datasetState: null,
        };
    }

    setupImpagination() {
        let token = 'Bearer ' + this.props.access_token;

        let dataset = new Dataset({
            pageSize: 10,

            observe: (datasetState) => {
                this.setState({datasetState});
            },

            // Where to fetch the data from.
            fetch(pageOffset, pageSize, stats) {
                let url = 'https://api-test.yolobe.com/api1/share/feed?from=' + Number(pageOffset) + '&size=10';
                console.log(url);
                return fetch(url, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                        'content-type': 'application/json',
                        'Authorization': token
                    },

                })
                    .then(response => response.json().then(data => data.items.hits))
                    .catch((error) => {
                        console.error(error);
                    });
            }
        });

        dataset.setReadOffset(0);
        this.setState({dataset});
    }

    componentWillMount() {
        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.access_token;
        //
        // axios.get('/share/feed?from=0&size=10')
        //     .then(response => {
        //         this.setState({
        //             tweets: response.data.items.hits
        //         })
        //
        //         console.log(this.state.tweets[0])
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })

        this.setupImpagination();
    }

    // renderTweets() {
    //     return this.state.datasetState.map(record => {
    //         console.log(record)
    //
    //             if (!record.isSettled) {
    //                 return <ActivityIndicator key={Math.random()} size="large" color="#0000ff" style={{opacity: 1.0}}
    //                                           animating={true}/>
    //             }
    //             return <Text>hasvdhsavdasndsa</Text>
    //     }
    //
    //     )
    // }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff', alignItems: 'center'}}>
                <Content scrollEventThrottle={300} onScroll={this.setCurrentReadOffset}>
                    {this.state.datasetState.map(record => {
                        if (!record.isSettled) {
                            return <ActivityIndicator key={Math.random()} size="large" color="#0000ff"
                                                      style={{opacity: 1.0}}
                                                      animating={true}/>
                        }
                        console.log(record);
                        return <TweetDetails key={Math.random()} tweetDetails={record.content}/>

                    })}
                </Content>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        access_token: state.access_token
    }
};


export default connect(mapStateToProps)(Home)