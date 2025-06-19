// Animation
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  interpolate,
} from "react-native-reanimated";
// Components
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
// Hooks
import { useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";

export const ShimmeringView = ({ style }: { style: any }) => {
  const { theme } = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1200 }), -1, false);
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [-200, 200]);
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View
      style={[style, { backgroundColor: theme.skeleton, overflow: "hidden" }]}
    >
      <Animated.View
        style={[
          { width: "100%", height: "100%", position: "absolute" },
          animatedStyle,
        ]}
      >
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.1)", "transparent"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>
    </View>
  );
};
