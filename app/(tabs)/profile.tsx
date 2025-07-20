import React from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import {
  Card,
  Title,
  Text,
  List,
  Switch,
  Button,
  Avatar,
  useTheme,
  Divider,
} from 'react-native-paper';
import {
  User,
  Settings,
  Bell,
  Shield,
  CircleHelp as HelpCircle,
  LogOut,
} from 'lucide-react-native';

import { useRouter } from 'expo-router';

export default function Profile() {
  const theme = useTheme();

  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [emailUpdates, setEmailUpdates] = React.useState(false);

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Êtes-vous sûr de vouloir vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Déconnexion',
        style: 'destructive',
        onPress: async () => {
          alert('logout');
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={[styles.title, { color: theme.colors.primary }]}>
          Profil
        </Title>
        <Text style={styles.subtitle}>
          Gérez votre compte et vos préférences
        </Text>
      </View>

      {/* Informations utilisateur */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.userInfo}>
            <Avatar.Text size={64} label={'U'} style={styles.avatar} />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{'Utilisateur'}</Text>
              <Text style={styles.userEmail}>{'email@example.com'}</Text>
              <Text style={styles.userRole}>Expéditeur Utilisateur</Text>
            </View>
          </View>
          <Button mode="outlined" onPress={() => {}} style={styles.editButton}>
            Modifier le profil
          </Button>
        </Card.Content>
      </Card>

      {/* Paramètres du compte */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Paramètres du compte</Text>

          <List.Item
            title="Informations personnelles"
            description="Nom, adresse, téléphone"
            left={(props) => <User {...props} size={24} color="#757575" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
            style={styles.listItem}
          />

          <List.Item
            title="Méthodes de paiement"
            description="Cartes et portefeuilles"
            left={(props) => <Settings {...props} size={24} color="#757575" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
            style={styles.listItem}
          />

          <List.Item
            title="Sécurité"
            description="Mot de passe et confidentialité"
            left={(props) => <Shield {...props} size={24} color="#757575" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
            style={styles.listItem}
          />
        </Card.Content>
      </Card>

      {/* Notifications */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <List.Item
            title="Notifications"
            description="Alertes et messages"
            left={(props) => <Bell {...props} size={24} color="#757575" />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            )}
            style={styles.listItem}
          />

          <List.Item
            title="Emails"
            description="Notifications par email"
            left={(props) => <Bell {...props} size={24} color="#757575" />}
            right={() => (
              <Switch value={emailUpdates} onValueChange={setEmailUpdates} />
            )}
            style={styles.listItem}
          />
        </Card.Content>
      </Card>

      {/* Support */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Support</Text>

          <List.Item
            title="Centre d'aide"
            description="FAQ et guides d'utilisation"
            left={(props) => (
              <HelpCircle {...props} size={24} color="#757575" />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
            style={styles.listItem}
          />

          <List.Item
            title="Contacter le support"
            description="Nous sommes là pour vous aider"
            left={(props) => (
              <HelpCircle {...props} size={24} color="#757575" />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
            style={styles.listItem}
          />
        </Card.Content>
      </Card>

      {/* Statistiques */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Statistiques</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Trajets</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Note moyenne</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>€245</Text>
              <Text style={styles.statLabel}>Économisé</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Déconnexion */}
      <View style={styles.logoutContainer}>
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          textColor="#F44336"
          icon={() => <LogOut size={20} color="#F44336" />}
        >
          Déconnexion
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#00C896',
  },
  userDetails: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  userEmail: {
    fontSize: 14,
    color: '#757575',
    marginTop: 2,
  },
  userRole: {
    fontSize: 12,
    color: '#00C896',
    marginTop: 2,
    fontWeight: 'bold',
  },
  editButton: {
    borderColor: '#00C896',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  listItem: {
    paddingVertical: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00C896',
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  logoutContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  logoutButton: {
    borderColor: '#F44336',
  },
});
