import React from "react";
import PropTypes from "prop-types";
import { View, Text, ActivityIndicator } from "react-native";

const MessageStatus = ({ style, sending, error, notSentText, SentComponent }) => {
  if (error) {
    return (
      <View>
        <Text
          style={{
            color: style.errorTextColor,
          }}
        >
          {notSentText}
        </Text>
      </View>
    );
  }

  let RenderSentComponent = () => null;

  if (SentComponent) {
    RenderSentComponent = SentComponent;
  }

  return (
    <View
      style={{
        width: 30,
        alignItems: "center",
      }}
    >
      {sending ? <ActivityIndicator color={style.sendingColor} /> : <RenderSentComponent />}
    </View>
  );
};

MessageStatus.propTypes = {
  sending: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  style: PropTypes.shape({
    sendingColor: PropTypes.string.isRequired,
    errorTextColor: PropTypes.string.isRequired,
    sentColor: PropTypes.string.isRequired,
  }).isRequired,
  notSentText: PropTypes.string.isRequired,
  SentComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
};

export default MessageStatus;
