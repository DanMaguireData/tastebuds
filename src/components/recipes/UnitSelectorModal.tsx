// React
import React, { useMemo, useState, forwardRef } from "react";
// Components
import { StyleSheet, FlatList } from "react-native";
import { ListItem } from "../common/ListItem";
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
// Hooks
import { useTheme } from "@/hooks/useTheme";
// Constant
import { UNITS, UnitKey, ALL_UNIT_KEYS } from "@/constants/unit";

interface UnitSelectorModalProps {
  onSelectUnit: (unitKey: UnitKey) => void;
}

export const UnitSelectorModal = forwardRef<
  BottomSheet,
  UnitSelectorModalProps
>(({ onSelectUnit }, ref) => {
  const { theme } = useTheme();
  const snapPoints = useMemo(() => ["50%", "85%"], []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUnits = useMemo(() => {
    if (!searchTerm) {
      return ALL_UNIT_KEYS;
    }
    return ALL_UNIT_KEYS.filter(
      (key) =>
        UNITS[key].singular.toLowerCase().includes(searchTerm.toLowerCase()) ||
        UNITS[key].plural.toLowerCase().includes(searchTerm.toLowerCase()) ||
        UNITS[key].abbreviation
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const handleSelect = (unitKey: UnitKey) => {
    onSelectUnit(unitKey);
    if (ref && "current" in ref) {
      ref.current?.close();
    }
  };

  // Define display name for better debugging
  UnitSelectorModal.displayName = "UnitSelectorModal";

  return (
    <BottomSheet
      ref={ref}
      index={-1} // Start closed
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: theme.background }}
      handleIndicatorStyle={{ backgroundColor: theme.textSecondary }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <BottomSheetTextInput
          style={[
            styles.searchInput,
            {
              borderColor: theme.input.border,
              color: theme.textPrimary,
              backgroundColor: theme.background,
            },
          ]}
          placeholder="Search for a unit..."
          placeholderTextColor={theme.input.placeholder}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <FlatList
          data={filteredUnits}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ListItem
              text={`${UNITS[item].singular} (${UNITS[item].abbreviation})`}
              onPress={() => handleSelect(item)}
            />
          )}
        />
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchInput: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },
});
