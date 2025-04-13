"use client"

import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native"
import { useState } from "react"
import Header from "../../components/Header"
import Container from "../../components/Container"
import { Feather } from "@expo/vector-icons"
import images from "../../constants/images"

const JokesAndQuranScreen = () => {
  // Sample data for jokes
  const jokes = [
    {
      id: 1,
      text: "Why don't scientists trust atoms? Because they make up everything!",
    },
    {
      id: 2,
      text: "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!",
    },
    {
      id: 3,
      text: "Why don't we tell secrets on a farm? Because the potatoes have eyes, the corn has ears, and the beans stalk.",
    },
  ]

  // Sample data for Quran verses
  const quranVerses = [
    {
      id: 1,
      surah: "Surah Taha, verse 46",
      arabicText: "قَالَ لَا تَخَافَا ۖ إِنَّنِي مَعَكُمَا أَسْمَعُ وَأَرَىٰ",
      translation:
        "Perhaps you dislike something which is good for you and like something which is bad for you. Allah knows and you do not know.",
    },
    {
      id: 2,
      surah: "Surah Al-Baqarah, verse 286",
      arabicText: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
      translation: "Allah does not burden a soul beyond that it can bear.",
    },
    {
      id: 3,
      surah: "Surah Al-Imran, verse 139",
      arabicText: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ",
      translation: "Do not lose heart nor fall into despair! You shall triumph if you are believers.",
    },
  ]

  // Sample data for Hadiths
  const hadiths = [
    {
      id: 1,
      narrator: "Narrated 'Ubada bin As-Samit (RA)",
      text: "The Prophet (peace be upon him) came out to inform us about the Night of Qadr but two Muslims were arguing with each other. So, the Prophet said, 'I came out to inform you about the Night of Qadr but such-and-such persons were arguing, so the news about it was taken away; yet that might be for your own good. So search for it on the 29th, 27th and 25th (of Ramadan).'",
    },
    {
      id: 2,
      narrator: "Narrated Abu Huraira (RA)",
      text: "The Prophet (peace be upon him) said, 'Whoever believes in Allah and the Last Day should talk what is good or keep quiet, and whoever believes in Allah and the Last Day should not hurt his neighbor, and whoever believes in Allah and the Last Day should entertain his guest generously.'",
    },
    {
      id: 3,
      narrator: "Narrated Anas (RA)",
      text: "The Prophet (peace be upon him) said, 'None of you will have faith till he wishes for his brother what he likes for himself.'",
    },
  ]

  // State to track current indices
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0)
  const [currentQuranIndex, setCurrentQuranIndex] = useState(0)
  const [currentHadithIndex, setCurrentHadithIndex] = useState(0)

  // Navigation functions
  const nextJoke = () => {
    setCurrentJokeIndex((prevIndex) => (prevIndex + 1) % jokes.length)
  }

  const prevJoke = () => {
    setCurrentJokeIndex((prevIndex) => (prevIndex - 1 + jokes.length) % jokes.length)
  }

  const nextQuran = () => {
    setCurrentQuranIndex((prevIndex) => (prevIndex + 1) % quranVerses.length)
  }

  const prevQuran = () => {
    setCurrentQuranIndex((prevIndex) => (prevIndex - 1 + quranVerses.length) % quranVerses.length)
  }

  const nextHadith = () => {
    setCurrentHadithIndex((prevIndex) => (prevIndex + 1) % hadiths.length)
  }

  const prevHadith = () => {
    setCurrentHadithIndex((prevIndex) => (prevIndex - 1 + hadiths.length) % hadiths.length)
  }

  return (
    <Container>
      <Header title="Jokes, Quran & more" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Jokes Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Jokes</Text>
            <View style={styles.navigationButtons}>
              <TouchableOpacity onPress={prevJoke} style={styles.navButton}>
                <Feather name="chevron-left" size={20} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity onPress={nextJoke} style={styles.navButton}>
                <Feather name="chevron-right" size={20} color="#4267B2" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.jokeCard}>
            <Text style={styles.jokeText}>{jokes[currentJokeIndex].text}</Text>
          </View>
        </View>

        {/* Quran Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quran</Text>
            <View style={styles.navigationButtons}>
              <TouchableOpacity onPress={prevQuran} style={styles.navButton}>
                <Feather name="chevron-left" size={20} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity onPress={nextQuran} style={styles.navButton}>
                <Feather name="chevron-right" size={20} color="#4267B2" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.quranCard}>
            <View style={styles.quranContent}>
              <View style={styles.lanternContainer}>
                <Image
                  source={images.lantern}
                  style={styles.lanternImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.quranTextContainer}>
                <Text style={styles.quranTitle}>{quranVerses[currentQuranIndex].surah}</Text>
                <Text style={styles.arabicText}>{quranVerses[currentQuranIndex].arabicText}</Text>
                <Text style={styles.translationText}>{quranVerses[currentQuranIndex].translation}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Hadith Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hadith</Text>
            <View style={styles.navigationButtons}>
              <TouchableOpacity onPress={prevHadith} style={styles.navButton}>
                <Feather name="chevron-left" size={20} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity onPress={nextHadith} style={styles.navButton}>
                <Feather name="chevron-right" size={20} color="#4267B2" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.hadithCard}>
            <Text style={styles.hadithNarrator}>{hadiths[currentHadithIndex].narrator}</Text>
            <Text style={styles.hadithText}>{hadiths[currentHadithIndex].text}</Text>
          </View>
        </View>

        {/* Add some bottom padding */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </Container>
  )
}

export default JokesAndQuranScreen

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FF1493", // Pink color matching the status bar
  },
  navigationButtons: {
    flexDirection: "row",
  },
  navButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#4267B2",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  jokeCard: {
    backgroundColor: "#FFEB3B", // Yellow background
    borderRadius: 12,
    padding: 20,
    minHeight: 100,
    justifyContent: "center",
  },
  jokeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
  },
  quranCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  quranContent: {
    flexDirection: "row",
  },
  lanternContainer: {
    width: 40,
    marginRight: 10,
  },
  lanternImage: {
    width: 40,
    height: 200,
  },
  quranTextContainer: {
    flex: 1,
  },
  quranTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },
  arabicText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "right",
    marginBottom: 20,
    lineHeight: 30,
  },
  translationText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  hadithCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  hadithNarrator: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  hadithText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
})
