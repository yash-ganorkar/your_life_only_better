import React, {Component} from 'react'
import {
    Alert,
    Animated,
    Button,
    ImageBackground,
    Keyboard,
    PixelRatio,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native'

import querystring from 'querystring'
import {instance, instance2} from "../../../Services/Services";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-ionicons";
import {connect} from "react-redux";
import Loader from "../../ActivityIndicator/Loader";

class Tweet extends Component {


    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: <Icon name="arrow-round-back" size={30}
                              style={{marginLeft: 10}} color="#fff" onPress={() => navigation.goBack()}/>,
            headerTitle: <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: 'white'}}>{navigation.state.params.title}</Text>
            </View>,
            headerRight: <TouchableHighlight onPress={navigation.state.params.share}
                                             disabled={!navigation.state.params.animated}>
                <Icon name="send" size={30}
                      color="#fff" style={{marginRight: 10}}/>
            </TouchableHighlight>
        }
    };

    keyboardWillShow = (event) => {

        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: event.endCoordinates.height,
            })
        ]).start();

        this.setState({
            keyboardOpen: true
        })
    };
    keyboardWillHide = (event) => {

        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
            })
        ]).start();

        this.setState({
            keyboardOpen: false
        })
    };
    _submit = () => {

        instance2.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.access_token;
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.access_token;

        this.props.navigation.setParams({
            animated: false
        });

        this.setState({
            loading: true
        });

        if (this.state.message === '') {

            Alert.alert("Yolibe", "Cannot share empty feed",
                [{
                    text: 'OK', onPress: () => {
                        this.setState({
                            loading: false
                        });
                    }
                }], {cancelable: false});

            this.props.navigation.setParams({
                animated: true
            })

        }
        else if (this.state.ImageSource.length === 0) {

            let data = {
                media1: {},
                field1: this.state.message
            };

            instance.post('/share/create', data)
                .then(response => {
                    Alert.alert("Yolibe", "Content Shared Successfully",
                        [{
                            text: 'OK', onPress: () => {
                                this.setState({
                                    loading: false
                                });
                                this.props.navigation.goBack()
                            }
                        }], {cancelable: false});
                })
                .catch(error => {
                    Alert.alert("Yolibe", "Something went wrong!",
                        [{
                            text: 'OK', onPress: () => {
                                this.setState({
                                    loading: false
                                });
                                this.props.navigation.goBack()
                            }
                        }], {cancelable: false});
                })
        }
        else {
            let ImageSource = this.state.ImageSource;

            let data = querystring.stringify({
                'base64fileName': ImageSource[0].fileName,
                'base64Data': ImageSource[0].base64
            });

            instance2.post('/upload', data)
                .then(response => {
                    let photoId = response.data.item.id;
                    let path = response.data.item.path;

                    let media1 = {
                        id: photoId,
                        path: path
                    };

                    data = {
                        field1: this.state.message,
                        media1: media1
                    };

                    instance.post('/share/create', data)
                        .then(response => {

                            this.setState({
                                loading: false
                            });

                            Alert.alert("Yolibe", "Content Shared Successfully",
                                [{
                                    text: 'OK', onPress: () => {
                                        this.setState({
                                            loading: false
                                        });
                                        this.props.navigation.goBack()
                                    }
                                }], {cancelable: false});
                        })
                .catch(error => {
                    this.setState({
                        loading: false
                    });
                    Alert.alert("Yolibe", "Something went wrong!",
                        [{
                            text: 'OK', onPress: () => {
                                this.setState({
                                    loading: false
                                });
                                this.props.navigation.goBack()
                            }
                        }], {cancelable: false});
                })
                })
                .catch(error => {
                    this.setState({
                        loading: false
                    });
                    Alert.alert("Yolibe", "Something went wrong!",
                        [{
                            text: 'OK', onPress: () => {
                                this.setState({
                                    loading: false
                                });
                                this.props.navigation.goBack()
                            }
                        }], {cancelable: false});
                })
        }
    };
    removePhoto = (key) => {

        let ImageSource = this.state.ImageSource;
        let newImageSources = [];
        let removedElement = ImageSource[key];

        for (let i = 0; i < ImageSource.length; i++) {
            if (ImageSource[i] === removedElement) {

            }
            else {
                newImageSources.push(ImageSource[i]);
            }
        }
        this.setState({
            ImageSource: newImageSources
        })
    };

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            ImageSource: [],
            keyboardOpen: false,
            loading: false
        };

        this.keyboardHeight = new Animated.Value(0);
    }

    selectPhotoTapped() {
        let options;
        if (Platform.OS === 'ios') {
            options = {
                quality: 1.0,
                maxWidth: 500,
                maxHeight: 500,
                storageOptions: {
                    skipBackup: true
                },
                mediaType: 'mixed',
                videoQuality: 'medium',
                allowsEditing: true
            };

        }
        else {
            options = {
                quality: 1.0,
                maxWidth: 500,
                maxHeight: 500,
                storageOptions: {
                    skipBackup: true
                },
                videoQuality: 'high'
            };
        }

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response.data);

            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else if (response.customButton) {
            }
            else {
                let source = {uri: response.uri, base64: response.data, fileName: response.fileName};

                //You can also display the image using data:
                //let source = { uri: 'data:image/jpeg;base64,' + response.data };
                let imageSource = this.state.ImageSource;

                if (imageSource.length === 0) {
                    imageSource.push(source);
                    this.setState({
                        ImageSource: imageSource
                    });
                }

                else if (imageSource.includes(source)) {
                    //do nothing
                }
                else {
                    imageSource.push(source);
                    this.setState({
                        ImageSource: imageSource
                    });
                }
            }
        });
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
        this.props.navigation.setParams({
            share: this._submit.bind(this)
        })
    }

    render() {
        let view;
        let footerView;


        if (this.state.ImageSource.length === 0) {
            view =
                <View style={styles.container}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.input}
                        value={this.state.message}
                        multiline
                        onChangeText={message => this.setState({message})}
                        ref={ref => {
                            this._emailInput = ref
                        }}
                        placeholder="What's on your mind?"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="send"
                        keyboardType="email-address"
                        onSubmitEditing={this._submit}
                        blurOnSubmit={true}
                    />
                </View>
        }
        else {
            view =
                <View style={styles.container}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={{
                            flex: 0.7,
                            margin: 20,
                            marginBottom: 0,
                            paddingHorizontal: 10,
                            borderRadius: 4,
                            borderColor: '#ccc',
                            fontSize: 16,
                            textAlignVertical: 'top'
                        }}
                        value={this.state.message}
                        multiline
                        onChangeText={message => this.setState({message})}
                        ref={ref => {
                            this._emailInput = ref
                        }}
                        placeholder="What's on your mind?"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="send"
                        keyboardType="email-address"
                        onSubmitEditing={this._submit}
                        blurOnSubmit={true}
                    />
                    <View style={{flex: 0.5}}>
                        <Animated.ScrollView
                            scrollEventThrottle={16}
                            onScroll={Animated.event(
                                [{nativeEvent: {contentOffset: {x: xOffset}}}],
                                {useNativeDriver: true}
                            )}
                            horizontal
                            pagingEnabled
                            style={styles.scrollView}>
                            {

                                this.state.ImageSource.map((url, i) => {
                                    {
                                        const key = parseInt(Math.random() * 10000);
                                        return (

                                            <ImageBackground key={key + 2} style={styles.ImageContainer}
                                                             source={{uri: url.uri}}>
                                                <View style={{
                                                    flex: 1,
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                    backgroundColor: 'rgba(255,255,255,0)'
                                                }} key={key + 3}>
                                                    <TouchableHighlight onPress={this.removePhoto.bind(this, i)}>
                                                        <Icon name="ios-trash-outline" size={40} color="#0f0"/>
                                                    </TouchableHighlight>
                                                </View>
                                            </ImageBackground>
                                        )
                                    }
                                })
                            }
                        </Animated.ScrollView>
                    </View>
                </View>
        }


        if (this.state.keyboardOpen) {
            footerView = <View style={{
                flex: 0.1,
                backgroundColor: 'rgba(255,255,255,1)',
            }}>
                <Button title="Attach Media" onPress={this.selectPhotoTapped.bind(this)}/>
            </View>
        }
        else {
            footerView = <View style={{
                flex: 0.08,
                backgroundColor: 'rgba(255,255,255,1)'
            }}>
                <Button title="Attach Media" onPress={this.selectPhotoTapped.bind(this)}/>
            </View>
        }


        return (
            <Animated.View style={[styles.container, {paddingBottom: this.keyboardHeight}]}>
                {view}
                {footerView}
                <Loader
                    loading={this.state.loading}/>
            </Animated.View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    header: {
        paddingTop: 20 + 20,
        padding: 20,
        backgroundColor: '#336699',
    },
    description: {
        fontSize: 14,
        color: 'white',
    },
    input: {
        flex: 1,
        margin: 20,
        marginBottom: 0,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#ccc',
        fontSize: 16,
        textAlignVertical: 'top'
    },
    legal: {
        margin: 10,
        color: '#333',
        fontSize: 12,
        textAlign: 'center',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
    },
    ImageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        width: 200,
        height: 200,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        backgroundColor: '#CDDC39'
    },
});

const xOffset = new Animated.Value(0);


const mapStateToProps = (state) => {
    return {
        username: state.username,
        access_token: state.access_token
    }
};


export default connect(mapStateToProps)(Tweet)
//export default Tweet