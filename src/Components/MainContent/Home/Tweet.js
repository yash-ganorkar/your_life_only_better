import React, {Component} from 'react'
import {
    Alert,
    Animated,
    Dimensions,
    Image,
    Keyboard,
    PixelRatio,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import axios from "../../../Services/Services";
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from "react-native-image-picker";


class Tweet extends Component {


    // static navigationOptions = ({navigation}) => {
    //     console.log(navigation);
    //     return {
    //         headerLeft: <View style={{flex: 1, justifyContent: 'center'}}>
    //             <Text style={{color: 'white', paddingLeft: 20, marginTop: 5}} onPress={() => {
    //                 navigation.goBack()
    //             }}>Back</Text>
    //         </View>,
    //         headerTitle: <View style={{flex: 1, justifyContent: 'center'}}>
    //             <Text style={{color: 'white'}}>{navigation.state.params.title}</Text>
    //         </View>
    //     }
    // };
    keyboardWillShow = (event) => {
        console.log("keyboardWillShow");
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: event.endCoordinates.height,
            })
        ]).start();
    };
    keyboardWillHide = (event) => {
        console.log("keyboardWillHide");
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
            })
        ]).start();
    };
    _submit = () => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.access_token;
        console.log(axios.defaults.headers.common['Authorization']);

        let data = {
            media1: {},
            field1: this.state.message
        };
        axios.post('/share/create', data)
            .then(response => {

                Alert.alert("Yolibe", "Tweet Shared Successfully",
                    [{text: 'OK', onPress: () => this.props.navigation.goBack()}], {cancelable: false})
            })
            .catch(error => {
                console.log(error);
                Alert.alert("Yolibe", "Something went wrong!",
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}], {cancelable: false})


            })
    };

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            ImageSource: []
        };

        this.keyboardHeight = new Animated.Value(0);
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

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

                console.log('image -> ', this.state);
            }
        });
    }

    componentWillMount() {
        console.log("Keyboard componentWillMount");
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
        console.log("Keyboard componentWillUnmount");
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    render() {
        let view;

        if (this.state.ImageSource.length === 0) {
            view =
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        value={this.state.message}
                        multiline
                        onChangeText={message => this.setState({message})}
                        ref={ref => {
                            this._emailInput = ref
                        }}
                        placeholder="Type your share"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="send"
                        keyboardType="email-address"
                        onSubmitEditing={this._submit}
                        blurOnSubmit={true}
                    />
                    <View style={{
                        flex: 0.1,
                        backgroundColor: 'black',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                        flexDirection: 'row'
                    }}>
                        <View style={{justifyContent: 'flex-start', marginLeft: 30}}>
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                <Icon name="ios-camera" size={50} color="#4F8EF7"/>
                            </TouchableOpacity>
                        </View>
                        {/*<View style={{justifyContent:'flex-start', marginLeft: 30}}>*/}
                        {/*<TouchableOpacity onPress={this.galleryClicked} style={{paddingBottom:15}}>*/}
                        {/*<FontAwesome name="photo" size={30} color="#4F8EF7"/>*/}
                        {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                    </View>
                </View>
        }
        else {
            view =
                <View style={styles.container}>
                    <TextInput
                        style={{
                            flex: 0.7,
                            margin: 20,
                            marginBottom: 0,
                            paddingHorizontal: 10,
                            borderRadius: 4,
                            borderColor: '#ccc',
                            fontSize: 16,
                        }}
                        value={this.state.message}
                        multiline
                        onChangeText={message => this.setState({message})}
                        ref={ref => {
                            this._emailInput = ref
                        }}
                        placeholder="image selected"
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
                                        return (
                                            <Image key={i} style={styles.ImageContainer} source={{uri: url.uri}}/>
                                        )
                                    }
                                })
                            }
                        </Animated.ScrollView>
                    </View>
                    <View style={{
                        flex: 0.1,
                        backgroundColor: 'black',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                        flexDirection: 'row'
                    }}>
                        <View style={{justifyContent: 'flex-start', marginLeft: 30}}>
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                <Icon name="ios-camera" size={50} color="#4F8EF7"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        }

        return (
            <Animated.View style={[styles.container, {paddingBottom: this.keyboardHeight}]}>
                {view}
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
        margin: 20,
        borderRadius: 10,
        width: 200,
        height: 200,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CDDC39',

    },
});

const xOffset = new Animated.Value(0);
const SCREEN_WIDTH = Dimensions.get("window").width;

const transitionAnimation = index => {
    return {
        transform: [
            {perspective: 800},
            {
                scale: xOffset.interpolate({
                    inputRange: [
                        (index - 1) * SCREEN_WIDTH,
                        index * SCREEN_WIDTH,
                        (index + 1) * SCREEN_WIDTH
                    ],
                    outputRange: [0.25, 1, 0.25]
                })
            },
            {
                rotateX: xOffset.interpolate({
                    inputRange: [
                        (index - 1) * SCREEN_WIDTH,
                        index * SCREEN_WIDTH,
                        (index + 1) * SCREEN_WIDTH
                    ],
                    outputRange: ["45deg", "0deg", "45deg"]
                })
            },
            {
                rotateY: xOffset.interpolate({
                    inputRange: [
                        (index - 1) * SCREEN_WIDTH,
                        index * SCREEN_WIDTH,
                        (index + 1) * SCREEN_WIDTH
                    ],
                    outputRange: ["-45deg", "0deg", "45deg"]
                })
            }
        ]
    };
};

// const mapStateToProps = (state) => {
//     return {
//         username: state.username,
//         access_token: state.access_token
//     }
// };
//
//
// export default connect(mapStateToProps)(Tweet)
export default Tweet