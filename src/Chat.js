import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  KeyboardAvoidingView,
  View,
  FlatList,
  UIManager,
  LayoutAnimation,
  ActivityIndicator,
  Text,
} from "react-native";
import Bubble from "./Bubble";
import Composer from "./Composer";
import { IOS } from "./constants";

class Chat extends PureComponent {
  constructor(props) {
    super(props);

    if (!IOS && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    const {
      messages,
      user,
      chatter,
      onSend,
      loadEarlier,
      onLoadEarlier,
      isLoadingEarlier,
      loading,
      style,
      showChatterAvatar,
      notSentText,
      inputPlaceholder,
      SendButtonComponent,
      SentComponent,
    } = this.props;

    return (
      <KeyboardAvoidingView
        behavior={IOS && "padding"}
        style={{
          flex: 1,
          backgroundColor: style.backgroundColor,
        }}
      >
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={messages}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => (
              <Bubble
                style={style.bubble}
                message={item}
                chatter={chatter}
                user={user}
                last={index === 0}
                nextMessage={messages[index + 1] || {}}
                prevMessage={messages[index - 1] || {}}
                showChatterAvatar={showChatterAvatar}
                notSentText={notSentText}
                SentComponent={SentComponent}
              />
            )}
            ListFooterComponent={
              isLoadingEarlier && (
                <View
                  style={{
                    paddingVertical: 10,
                  }}
                >
                  <ActivityIndicator size="large" />
                </View>
              )
            }
            ListEmptyComponent={
              <View style={{ height: 200, justifyContent: "center", alignItems: "center" }}>
                <Text>No messages</Text>
              </View>
            }
            inverted
            onEndReached={loadEarlier && !isLoadingEarlier && onLoadEarlier}
            onEndReachedThreshold={0.01}
          />
        )}
        <Composer
          onSend={message => {
            LayoutAnimation.configureNext({
              duration: 300,
              create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
              },
              update: { type: LayoutAnimation.Types.easeInEaseOut },
            });
            onSend(message);
          }}
          style={style.composer}
          userId={user.id}
          inputPlaceholder={inputPlaceholder}
          SendButtonComponent={SendButtonComponent}
        />
      </KeyboardAvoidingView>
    );
  }
}

Chat.propTypes = {
  style: PropTypes.shape({}),
  chatter: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      sending: PropTypes.bool,
      error: PropTypes.bool,
    })
  ),
  onSend: PropTypes.func.isRequired,
  loadEarlier: PropTypes.bool,
  onLoadEarlier: PropTypes.func,
  isLoadingEarlier: PropTypes.bool,
  loading: PropTypes.bool,
  showChatterAvatar: PropTypes.bool,
  notSentText: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  SendButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  SentComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

Chat.defaultProps = {
  messages: [
    {
      sending: false,
      error: false,
    },
  ],
  loadEarlier: false,
  loading: false,
  onLoadEarlier: () => null,
  isLoadingEarlier: false,
  style: {
    backgroundColor: "#e5ddd4",
    bubble: {
      seperatorTimeColor: "#262626",
      right: {
        backgroundColor: "#dff8c0",
        textColor: "#262626",
        textSize: 16,
        timeTextSize: 14,
        timeTextColor: "#00000073",
        sendingColor: "#5fc2fc",
        sentColor: "#5fc2fc",
        errorTextColor: "red",
      },
      left: {
        textSize: 16,
        timeTextSize: 14,
        backgroundColor: "#ffffff",
        textColor: "#262626",
        timeTextColor: "#00000073",
      },
    },
    composer: {
      backgroundColor: "#f5f1ee",
      inputBackgroundColor: "#ffffff",
      inputTextColor: "#262626",
      inputPlaceholderTextColor: "#a5a5a5",
      inputTextSize: 16,
      sendIconDisabledColor: "#a2a4a5",
      sendIconActiveColor: "#5fc2fc",
    },
  },
  showChatterAvatar: true,
  notSentText: "Not sent.",
  inputPlaceholder: "Type a message",
  SendButtonComponent: false,
  SentComponent: false,
};

export default Chat;
