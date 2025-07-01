import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const colors = {
  primary: "#2ECC71",
  primaryBtn: "#009E49",
  primaryDark: "#27AE60",
  primaryLight: "#E8F8EE",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#7F8C8D",
  lightGray: "#BDC3C7",
  background: "#F8F9FA",
  cardBackground: "#FFFFFF",
  borderColor: "#E5E7EB",
  success: "#2ECC71",
  error: "#E74C3C",
  warning: "#F39C12",
};

export const fonts = {
  regular: "System",
  medium: "System",
  bold: "System",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradientContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 24,
    margin: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
    marginLeft: 10,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    marginLeft: 10,
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.primaryBtn,
    borderRadius: 60,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  skipButton: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  skipButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "500",
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginRight: 10,
  },
  documentIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  documentText: {
    fontSize: 16,
    color: colors.black,
    flex: 1,
  },
});
