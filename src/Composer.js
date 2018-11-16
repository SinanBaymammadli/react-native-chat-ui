import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import moment from "moment";
import uuid from "uuid/v1";
import { IOS, TIME_FORMAT } from "./constants";

class Composer extends PureComponent {
  state = {
    text: "",
  };

  onPress = () => {
    const { onSend, userId } = this.props;
    const { text } = this.state;

    if (text) {
      onSend({
        id: uuid(),
        userId,
        text: text.trim(),
        createdAt: moment().format(TIME_FORMAT),
        sending: true,
        error: false,
      });

      this.setState({
        text: "",
      });
    }
  };

  render() {
    const {
      style,
      inputPlaceholder,
      SendButtonComponent,
      allowFiles,
      selectImage,
      selectFile,
    } = this.props;
    const { text } = this.state;
    const disabled = !text.trim();

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          backgroundColor: style.backgroundColor,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            position: "relative",
          }}
        >
          <TextInput
            style={{
              flex: 1,
              maxHeight: 100,
              minHeight: 40,
              paddingTop: IOS ? 10 : 5,
              paddingBottom: IOS ? 10 : 5,
              paddingHorizontal: 10,
              marginVertical: 5,
              marginLeft: 10,
              backgroundColor: style.inputBackgroundColor,
              color: style.inputTextColor,
              fontSize: style.inputTextSize,
            }}
            value={text}
            placeholder={inputPlaceholder}
            placeholderTextColor={style.inputPlaceholderTextColor}
            multiline
            // autoFocus
            onChangeText={newText => this.setState({ text: newText })}
          />
          {allowFiles &&
            !text && (
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  top: 5,
                  bottom: 5,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: 5,
                    justifyContent: "center",
                  }}
                  onPress={selectFile}
                >
                  <Text
                    style={{
                      color: style.sendIconActiveColor,
                    }}
                  >
                    File
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 5,
                    justifyContent: "center",
                  }}
                  onPress={selectImage}
                >
                  <Text
                    style={{
                      color: style.sendIconActiveColor,
                    }}
                  >
                    Img
                  </Text>
                </TouchableOpacity>
              </View>
            )}
        </View>
        <TouchableOpacity
          disabled={disabled}
          onPress={this.onPress}
          style={{
            padding: 10,
          }}
        >
          {SendButtonComponent ? (
            <SendButtonComponent disabled={disabled} />
          ) : (
            <View
              style={{
                height: 30,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: disabled ? style.sendIconDisabledColor : style.sendIconActiveColor,
                }}
              >
                Send
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

Composer.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired])
    .isRequired,
  onSend: PropTypes.func.isRequired,
  style: PropTypes.shape({}).isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  SendButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  allowFiles: PropTypes.bool.isRequired,
  selectImage: PropTypes.func.isRequired,
  selectFile: PropTypes.func.isRequired,
};

export default Composer;
