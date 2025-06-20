// React
import React from "react";
// Components
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Hooks
import { useTheme } from "@/hooks/useTheme";
// Theme
import { ThemeColors, spacing } from "@/constants/theme";

type StepStatus = "completed" | "active" | "upcoming";

interface StepProps {
  index: number;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  status: StepStatus;
}

// A component for a single step in the stepper
const Step = ({ icon, status }: StepProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const isCompleted = status === "completed";
  const isActive = status === "active";

  const iconColor =
    isCompleted || isActive ? theme.primary : theme.textSecondary;
  const iconBackgroundColor = isCompleted ? theme.primary : "transparent";
  const textColor = isActive ? "primary" : "textSecondary";
  const isBold = isCompleted || isActive;

  return (
    <View style={styles.stepContainer}>
      <View
        style={[
          styles.iconWrapper,
          { borderColor: iconColor, backgroundColor: iconBackgroundColor },
        ]}
      >
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={isCompleted ? theme.surface : iconColor}
        />
      </View>
    </View>
  );
};

interface ProgressStepperProps {
  currentStep: number; // 1, 2, or 3
}

// The main stepper component that arranges the steps
export function ProgressStepper({ currentStep }: ProgressStepperProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const steps: Omit<StepProps, "status">[] = [
    { index: 1, icon: "clipboard-text-outline" },
    { index: 2, icon: "format-list-bulleted" },
    { index: 3, icon: "chef-hat" },
  ];

  return (
    <View style={styles.stepperContainer}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        let status: StepStatus = "upcoming";
        if (stepNumber < currentStep) {
          status = "completed";
        } else if (stepNumber === currentStep) {
          status = "active";
        }

        return (
          <React.Fragment key={step.index}>
            <Step icon={step.icon} status={status} index={step.index} />
            {index < steps.length - 1 && <View style={styles.connector} />}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    stepperContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      backgroundColor: theme.background,
    },
    stepContainer: {
      alignItems: "center",
      flex: 1,
    },
    iconWrapper: {
      width: 35,
      height: 35,
      borderRadius: "50%",
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.xs,
    },
    connector: {
      flex: 1,
      height: 2,
      backgroundColor: theme.input.border,
      marginTop: 20, // Align with the center of the icons
    },
  });
