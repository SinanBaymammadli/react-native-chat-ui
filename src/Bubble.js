import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text, View, Animated, Image } from "react-native";
import moment from "moment";
import { TIME_FORMAT } from "./constants";
import MessageStatus from "./MessageStatus";

const ANIMATION_DURATION = 400;
const BUBBLE_BIG_BORDER_RADIUS = 25;
const BUBBLE_SMALL_BORDER_RADIUS = 10;

class Bubble extends PureComponent {
  constructor(props) {
    super(props);

    this.opacityAnimation = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.opacityAnimation, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      delay: 0,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const {
      message: { text, userId, createdAt, sending, error },
      user,
      chatter,
      nextMessage,
      prevMessage,
      style,
      showChatterAvatar,
      notSentText,
      SentComponent,
    } = this.props;
    const right = userId === user.id;

    const opacityAnimation = [
      {
        opacity: this.opacityAnimation,
      },
    ];

    return (
      <Animated.View style={opacityAnimation}>
        {!moment(createdAt, TIME_FORMAT).isSame(nextMessage.createdAt, "day") && (
          <View
            style={{
              alignItems: "center",
              marginHorizontal: 10,
              color: style.seperatorTimeColor,
            }}
          >
            <Text>{moment(createdAt).format("D MMMM")}</Text>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: right ? "flex-end" : "flex-start",
            alignItems: "flex-end",
          }}
        >
          {!right &&
            showChatterAvatar && (
              <View
                style={{
                  justifyContent: "center",
                  width: 30,
                  height: 30,
                  marginLeft: 10,
                }}
              >
                {userId !== prevMessage.userId && (
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30 / 2,
                      marginBottom: 12,
                    }}
                    source={{ uri: chatter.avatar }}
                  />
                )}
              </View>
            )}
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: right ? style.right.backgroundColor : style.left.backgroundColor,
              marginBottom: userId !== prevMessage.userId ? 10 : 2,
              marginRight: right ? 10 : 100,
              marginLeft: right ? 100 : 10,
              borderTopLeftRadius: right ? BUBBLE_BIG_BORDER_RADIUS : BUBBLE_SMALL_BORDER_RADIUS,
              borderTopRightRadius: right ? BUBBLE_SMALL_BORDER_RADIUS : BUBBLE_BIG_BORDER_RADIUS,
              borderBottomLeftRadius: right ? BUBBLE_BIG_BORDER_RADIUS : BUBBLE_SMALL_BORDER_RADIUS,
              borderBottomRightRadius: right
                ? BUBBLE_SMALL_BORDER_RADIUS
                : BUBBLE_BIG_BORDER_RADIUS,
            }}
          >
            <Text
              style={{
                color: right ? style.right.textColor : style.left.textColor,
                textAlign: right ? "right" : "left",
                fontSize: right ? style.right.textSize : style.left.textSize,
              }}
            >
              {text}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: right ? "flex-end" : "flex-start",
              }}
            >
              {right && (
                <MessageStatus
                  notSentText={notSentText}
                  style={style.right}
                  sending={sending}
                  error={error}
                  SentComponent={SentComponent}
                />
              )}

              {!error && (
                <Text
                  style={{
                    color: right ? style.right.timeTextColor : style.left.timeTextColor,
                    fontSize: right ? style.right.timeTextSize : style.left.timeTextSize,
                    marginTop: 3,
                  }}
                >
                  {moment(createdAt, TIME_FORMAT).format("HH:mm")}
                </Text>
              )}
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }
}

Bubble.propTypes = {
  message: PropTypes.shape({
    userId: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired])
      .isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    sending: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
  }).isRequired,
  chatter: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]).isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]).isRequired,
  }).isRequired,
  showChatterAvatar: PropTypes.bool.isRequired,
  style: PropTypes.shape({}).isRequired,
  nextMessage: PropTypes.shape({}).isRequired,
  prevMessage: PropTypes.shape({}).isRequired,
  notSentText: PropTypes.string.isRequired,
  SentComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
};

export default Bubble;
