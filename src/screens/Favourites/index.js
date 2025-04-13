import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../../constants/colors";
import FavoriteCard from "../../components/FavoriteCard";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import React from "react";

export default function FavoritesScreen({ route }) {
  const navigation = useNavigation();

  // Sample favorites data
  const sampleFavorites = [
    {
      id: "1",
      name: "Aysha Khatun",
      location: "Liverpool",
      profession: "Lawyer",
    },
    {
      id: "2",
      name: "Miss Fatima",
      location: "Liverpool",
      profession: "Lawyer",
    },
    {
      id: "3",
      name: "Firoza Khan",
      location: "Liverpool",
      profession: "Lawyer",
    },
    {
      id: "4",
      name: "Gulshan",
      location: "Liverpool",
      profession: "Lawyer",
    },
    {
      id: "5",
      name: "Amina Khan",
      location: "Liverpool",
      profession: "Lawyer",
    },
  ];

  // Get favorites data from route params or use sample data
  const initialFavorites = route.params?.favorites || sampleFavorites;
  const [favorites, setFavorites] = React.useState(initialFavorites);

  // State for modal
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const handleRemoveFavorite = (id) => {
    // Instead of removing directly, show confirmation modal
    setSelectedId(id);
    setModalVisible(true);
  };

  const confirmRemove = () => {
    // User confirmed to remove
    setFavorites((currentFavorites) =>
      currentFavorites.filter((favorite) => favorite.id !== selectedId)
    );
    setModalVisible(false);
  };

  const cancelRemove = () => {
    // User cancelled the remove action
    setModalVisible(false);
    setSelectedId(null);
  };

  // Function to get selected person's name (for personalization)
  const getSelectedPersonName = () => {
    if (!selectedId) return "";
    const person = favorites.find((fav) => fav.id === selectedId);
    return person ? person.name : "";
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      {/* Favourites Section */}
      <Text style={styles.sectionTitle}>Favourites</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FavoriteCard
            id={item.id}
            name={item.name}
            location={item.location}
            profession={item.profession}
            onRemove={handleRemoveFavorite}
          />
        )}
        style={styles.favoritesList}
        showsVerticalScrollIndicator={false}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        visible={modalVisible}
        onCancel={cancelRemove}
        onConfirm={confirmRemove}
        personName={getSelectedPersonName()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  favoritesList: {
    paddingHorizontal: 20,
    flex: 1,
  },
});
