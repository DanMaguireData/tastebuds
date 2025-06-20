// Components
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppText } from "@/components/common/AppText";
import { Spacer } from "@/components/layout/Spacer";
import { FormField } from "@/components/common/FormField";
import { AppButton } from "@/components/common/AppButton";
import { ProgressStepper } from "@/components/recipes/ProgressStepper";
// Hooks
import { useRouter } from "expo-router";
import { useCreateRecipe } from "@/hooks/useCreateRecipe";
import { useTheme } from "@/hooks/useTheme";
// Services
import * as ImagePicker from "expo-image-picker";
// Theme
import { ThemeColors, spacing } from "@/constants/theme";

export default function Step1() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const {
    title,
    setTitle,
    description,
    setDescription,
    image,
    setImage,
    servings,
    setServings,
    prepTime,
    setPrepTime,
    cookTime,
    setCookTime,
  } = useCreateRecipe();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const isFormValid = () => {
    return (
      title.trim() !== "" &&
      servings.trim() !== "" &&
      prepTime.trim() !== "" &&
      cookTime.trim() !== ""
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ProgressStepper currentStep={1} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.image} />
          ) : (
            <>
              <MaterialCommunityIcons
                name="camera-plus-outline"
                size={40}
                color={theme.textSecondary}
              />
              <AppText color="textSecondary">Add a Photo</AppText>
            </>
          )}
        </TouchableOpacity>
        <Spacer size="lg" />
        <FormField
          label="Recipe Name"
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Grandma's Lasagna"
          mandatoryField={true}
        />
        <Spacer size="md" />
        <FormField
          label="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          placeholder="A short story about this recipe."
          inputHeight={100}
        />
        <Spacer size="lg" />
        <View style={styles.statsContainer}>
          <FormField
            containerStyle={{ flex: 1 }}
            label="Servings"
            value={servings}
            onChangeText={setServings}
            keyboardType="numeric"
            placeholder="e.g. 4"
            mandatoryField={true}
          />
          <Spacer horizontal size="md" />
          <FormField
            containerStyle={{ flex: 1 }}
            label="Prep Minutes"
            value={prepTime}
            onChangeText={setPrepTime}
            keyboardType="numeric"
            placeholder="e.g., 15"
            mandatoryField={true}
          />
          <Spacer horizontal size="md" />
          <FormField
            containerStyle={{ flex: 1 }}
            label="Cook Minutes"
            value={cookTime}
            onChangeText={setCookTime}
            keyboardType="numeric"
            mandatoryField={true}
            placeholder="e.g., 45"
          />
        </View>
        <Spacer size="xl" />
        <AppButton
          title="Next: Ingredients"
          onPress={() => router.push("/recipes/create/step2")}
          disabled={!isFormValid()}
        />
      </ScrollView>
    </View>
  );
}

// Add this to the end of app/(create)/step1.tsx

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: spacing.lg,
    },
    imagePicker: {
      height: 200,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.surface,
      borderRadius: spacing.md,
      borderWidth: 2,
      borderColor: theme.input.border,
      borderStyle: "dashed",
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    statsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });
