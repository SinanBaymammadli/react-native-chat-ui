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
    const { style, inputPlaceholder, SendButtonComponent } = this.props;
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
        <TextInput
          style={{
            flex: 1,
            maxHeight: 100,
            minHeight: 40,
            paddingTop: IOS ? 10 : 5,
            paddingBottom: IOS ? 10 : 5,
            paddingHorizontal: 10,
            marginVertical: 5,
            marginLeft: 5,
            backgroundColor: style.inputBackgroundColor,
            color: style.inputTextColor,
            fontSize: style.inputTextSize,
          }}
          value={text}
          placeholder={inputPlaceholder}
          placeholderTextColor={style.inputPlaceholderTextColor}
          multiline
          autoFocus
          onChangeText={newText => this.setState({ text: newText })}
        />
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
};

export default Composer;
