import { StyleSheet } from "react-native";
import { Container } from "@/components/layout/Container";
import { AppText } from "@/components/common/AppText";


export default function Profile() {
  return (
   <Container style={styles.container}>
         <AppText variant="h1" color="primary">Profile Screen</AppText>
       </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
