import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  Card,
  Title,
  Text,
  Surface,
  useTheme,
  Searchbar,
  Chip,
} from 'react-native-paper';
import { Package, MapPin, Clock, User, Star } from 'lucide-react-native';
import { useState } from 'react';

export default function PublicFeed() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'electronics', label: 'Électronique' },
    { id: 'furniture', label: 'Mobilier' },
    { id: 'books', label: 'Livres' },
    { id: 'clothes', label: 'Vêtements' },
  ];

  const publicPackages = [
    {
      id: 'PKG001',
      title: 'iPhone 13 Pro Max',
      description: 'Excellent état, avec boîte et accessoires',
      category: 'electronics',
      from: 'Paris',
      to: 'Lyon',
      price: '25€',
      date: '16/01/2025',
      sender: 'Sophie Martin',
      rating: 4.8,
      weight: '0.5kg',
      status: 'Disponible',
    },
    {
      id: 'PKG002',
      title: 'Table basse en bois',
      description: 'Table vintage en excellent état',
      category: 'furniture',
      from: 'Marseille',
      to: 'Nice',
      price: '40€',
      date: '17/01/2025',
      sender: 'Lucas Dubois',
      rating: 4.9,
      weight: '15kg',
      status: 'Réservé',
    },
    {
      id: 'PKG003',
      title: 'Collection de livres',
      description: '20 romans français contemporains',
      category: 'books',
      from: 'Toulouse',
      to: 'Bordeaux',
      price: '15€',
      date: '18/01/2025',
      sender: 'Marie Claire',
      rating: 4.7,
      weight: '3kg',
      status: 'Disponible',
    },
  ];

  const filteredPackages = publicPackages.filter((pkg) => {
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.to.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || pkg.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={[styles.title, { color: theme.colors.primary }]}>
          Colis Disponibles
        </Title>
        <Text style={styles.subtitle}>
          Découvrez tous les colis disponibles
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Rechercher un colis..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <Chip
            key={category.id}
            selected={selectedCategory === category.id}
            onPress={() => setSelectedCategory(category.id)}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && {
                backgroundColor: theme.colors.primary,
              },
            ]}
            textStyle={
              selectedCategory === category.id ? { color: 'white' } : {}
            }
          >
            {category.label}
          </Chip>
        ))}
      </ScrollView>

      <View style={styles.packagesContainer}>
        {filteredPackages.map((pkg) => (
          <Card key={pkg.id} style={styles.packageCard}>
            <Card.Content>
              <View style={styles.packageHeader}>
                <View style={styles.packageInfo}>
                  <Text style={styles.packageTitle}>{pkg.title}</Text>
                  <Text style={styles.packageDescription} numberOfLines={2}>
                    {pkg.description}
                  </Text>
                </View>
                <View style={styles.packagePrice}>
                  <Text style={[styles.price, { color: theme.colors.primary }]}>
                    {pkg.price}
                  </Text>
                  <Chip
                    mode="flat"
                    onPress={() => setSelectedCategory('1')}
                    style={[
                      styles.statusChip,
                      {
                        backgroundColor:
                          pkg.status === 'Disponible' ? '#4CAF50' : '#FF9800',
                      },
                    ]}
                    textStyle={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 12,
                    }}
                  >
                    {pkg.status}
                  </Chip>
                </View>
              </View>

              <View style={styles.routeContainer}>
                <View style={styles.route}>
                  <MapPin size={16} color="#757575" />
                  <Text style={styles.routeText}>
                    {pkg.from} → {pkg.to}
                  </Text>
                </View>
                <View style={styles.packageDetails}>
                  <Text style={styles.weight}>{pkg.weight}</Text>
                  <Clock size={14} color="#757575" />
                  <Text style={styles.date}>{pkg.date}</Text>
                </View>
              </View>

              <View style={styles.senderInfo}>
                <User size={16} color="#757575" />
                <Text style={styles.senderName}>{pkg.sender}</Text>
                <View style={styles.rating}>
                  <Star size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{pkg.rating}</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    elevation: 1,
    borderRadius: 8,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
    backgroundColor: '#F0F0F0',
  },
  packagesContainer: {
    padding: 16,
    paddingTop: 0,
  },
  packageCard: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  packageInfo: {
    flex: 1,
    marginRight: 12,
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  packageDescription: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 18,
  },
  packagePrice: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusChip: {
    height: 34,
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  routeText: {
    fontSize: 14,
    color: '#212121',
    marginLeft: 4,
    fontWeight: '500',
  },
  packageDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  weight: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#757575',
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  senderName: {
    fontSize: 14,
    color: '#212121',
    fontWeight: '500',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    color: '#757575',
    fontWeight: 'bold',
  },
});
