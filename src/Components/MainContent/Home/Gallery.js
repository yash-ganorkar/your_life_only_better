// import React, {Component} from 'react'
//
// import {View, CameraRoll, ScrollView, Image, TouchableHighlight} from 'react-native'
//
// export default class Gallery extends Component {
//
//     _handleButtonPress = () => {
//         CameraRoll.getPhotos({
//             first: 20,
//             assetType: 'Photos',
//         })
//             .then(r => {
//                 console.log(r);
//                 this.setState({ photos: r.edges });
//             })
//             .catch((err) => {
//                 //Error Loading Images
//             });
//     };
//
//     _addIndex = (index) => {
//         let idx = this.state.index;
//
//         if(idx.length === 0) {
//             idx.push(index);
//             this.setState({
//                 index: idx
//             })
//         }
//         else if(!idx.includes(index)){
//             idx.push(index);
//             this.setState({
//                 index: idx
//             })
//         }
//
//         console.log("index -> ",this.state.index)
//     };
//
//     constructor(props){
//         super(props)
//
//         this.state = {
//             photos:[],
//             index:[]
//         }
//     }
//
//     componentWillMount(){
//         this._handleButtonPress();
//     }
//     render() {
//         return (
//             <View>
//                 <ScrollView>
//                     {this.state.photos.map((p, i) => {
//                         return (
//                             <TouchableHighlight
//                                 style={{opacity: this.state.selected ? 0.5 : 1}}
//                                 key={i}
//                                 underlayColor='transparent'
//                                 onPress={() => this._addIndex(i)}
//                             >
//                             <Image
//                                 key={i}
//                                 style={{
//                                     width: 300,
//                                     height: 100,
//                                 }}
//                                 source={{ uri: p.node.image.uri }}
//                             />
//                             </TouchableHighlight>
//                         );
//                     })}
//                 </ScrollView>
//             </View>
//         );
//     }
//
// }