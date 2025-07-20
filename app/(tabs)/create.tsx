import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import {
  Card,
  Title,
  TextInput,
  Button,
  RadioButton,
  Text,
  Surface,
  useTheme,
  Divider,
} from 'react-native-paper';
import { MapPin, Package, User } from 'lucide-react-native';

export default function CreatePackage() {
  const theme = useTheme();
  const [packageType, setPackageType] = useState('standard');
  const [formData, setFormData] = useState({
    senderName: '',
    senderAddress: '',
    senderCity: '',
    senderPostal: '',
    recipientName: '',
    recipientAddress: '',
    recipientCity: '',
    recipientPostal: '',
    weight: '',
    dimensions: '',
    description: '',
  });

  const handleSubmit = () => {
    if (!formData.senderName || !formData.recipientName) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    Alert.alert(
      'Succès',
      'Votre colis a été créé avec succès !',
      [{ text: 'OK', onPress: () => resetForm() }]
    );
  };

  const resetForm = () => {
    setFormData({
      senderName: '',
      senderAddress: '',
      senderCity: '',
      senderPostal: '',
      recipientName: '',
      recipientAddress: '',
      recipientCity: '',
      recipientPostal: '',
      weight: '',
      dimensions: '',
      description: '',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={[styles.title, { color: theme.colors.primary }]}>
          Annoncer un départ
        </Title>
        <Text style={styles.subtitle}>
          Proposez un trajet et partagez les frais
        </Text>
      </View>

      {/* Expéditeur */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <User size={24} color={theme.colors.primary} />
            <Title style={styles.sectionTitle}>Expéditeur</Title>
          </View>
          
          <TextInput
            label="Ville de départ *"
            value={formData.senderName}
            onChangeText={(text) => setFormData({...formData, senderName: text})}
            mode="outlined"
            style={styles.input}
          />
          
          <TextInput
            label="Ville d'arrivée *"
            value={formData.senderAddress}
            onChangeText={(text) => setFormData({...formData, senderAddress: text})}
            mode="outlined"
            style={styles.input}
          />
          
          <View style={styles.row}>
            <TextInput
              label="Date de départ"
              value={formData.senderCity}
              onChangeText={(text) => setFormData({...formData, senderCity: text})}
              mode="outlined"
              style={[styles.input, styles.halfWidth]}
            />
            <TextInput
              label="Capacité (kg)"
              value={formData.senderPostal}
              onChangeText={(text) => setFormData({...formData, senderPostal: text})}
              mode="outlined"
              keyboardType="numeric"
              style={[styles.input, styles.halfWidth]}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Destinataire */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <MapPin size={24} color={theme.colors.primary} />
            <Title style={styles.sectionTitle}>Informations générales</Title>
          </View>
          
          <TextInput
            label="Type de service"
            value={formData.recipientName}
            onChangeText={(text) => setFormData({...formData, recipientName: text})}
            mode="outlined"
            style={styles.input}
          />
          
          <TextInput
            label="Adresse de départ"
            value={formData.recipientAddress}
            onChangeText={(text) => setFormData({...formData, recipientAddress: text})}
            mode="outlined"
            multiline
            style={styles.input}
          />
          
          <View style={styles.row}>
            <TextInput
              label="Adresse de destination"
              value={formData.recipientCity}
              onChangeText={(text) => setFormData({...formData, recipientCity: text})}
              mode="outlined"
              style={[styles.input, styles.halfWidth]}
            />
            <TextInput
              label="Poids estimé"
              value={formData.recipientPostal}
              onChangeText={(text) => setFormData({...formData, recipientPostal: text})}
              mode="outlined"
              keyboardType="numeric"
              style={[styles.input, styles.halfWidth]}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Détails du colis */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Package size={24} color={theme.colors.primary} />
            <Title style={styles.sectionTitle}>Prix et Contact</Title>
          </View>
          
          <View style={styles.row}>
            <TextInput
              label="Prix (€)"
              value={formData.weight}
              onChangeText={(text) => setFormData({...formData, weight: text})}
              mode="outlined"
              keyboardType="numeric"
              style={[styles.input, styles.halfWidth]}
            />
            <TextInput
              label="Contact"
              value={formData.dimensions}
              onChangeText={(text) => setFormData({...formData, dimensions: text})}
              mode="outlined"
              style={[styles.input, styles.halfWidth]}
            />
          </View>
          
          <Text style={styles.radioTitle}>Modalités</Text>
          <RadioButton.Group
            onValueChange={setPackageType}
            value={packageType}
          >
            <View style={styles.radioOption}>
              <RadioButton value="standard" />
              <Text>Créneau de collecte</Text>
            </View>
          </RadioButton.Group>
          
          <TextInput
            label="Description"
            value={formData.description}
            onChangeText={(text) => setFormData({...formData, description: text})}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
          contentStyle={styles.buttonContent}
        >
          Annoncer
        </Button>
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
  card: {
    margin: 16,
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#212121',
  },
  input: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  radioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#212121',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  submitButton: {
    backgroundColor: '#00C896',
  },
  buttonContent: {
    paddingVertical: 8,
  },
});