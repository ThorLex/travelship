import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Card,
  Title,
  Text,
  Searchbar,
  Avatar,
  Surface,
  useTheme,
} from 'react-native-paper';
import { Badge } from 'react-native-paper'; // Corrected import statement
import { Search, ArrowLeft } from 'lucide-react-native';

export default function Messages() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);

  const conversations = [
    {
      id: 1,
      name: 'Sophie Martin',
      role: 'Expéditrice',
      lastMessage:
        'Salut, je suis intéressée par votre annonce. Est-ce que le produit est toujours disponible?',
      time: '14:30',
      unread: 2,
      avatar: 'SM',
      online: true,
    },
    {
      id: 2,
      name: 'Alexandre Dubois',
      role: 'Transporteur',
      lastMessage: "Je suis désolé, l'article a déjà été vendu.",
      time: '12:15',
      unread: 0,
      avatar: 'AD',
      online: false,
    },
    {
      id: 3,
      name: 'Camille Leroy',
      role: 'Support',
      lastMessage:
        'Merci pour votre réponse rapide. Je vais chercher autre chose.',
      time: '11:45',
      unread: 1,
      avatar: 'CL',
      online: true,
    },
    {
      id: 4,
      name: 'Thomas Bernard',
      role: 'Transporteur',
      lastMessage: 'Oui, je peux vous le livrer demain matin.',
      time: '10:20',
      unread: 0,
      avatar: 'TB',
      online: false,
    },
    {
      id: 5,
      name: 'Julie Moreau',
      role: 'Expéditrice',
      lastMessage: "J'ai bien reçu le colis, tout est parfait. Merci !",
      time: '09:30',
      unread: 0,
      avatar: 'JM',
      online: true,
    },
  ];

  const messages = [
    {
      id: 1,
      text: "Salut ! J'ai bien reçu le colis, merci beaucoup pour l'envoi rapide. Tout est parfait !",
      sender: 'other',
      time: '14:30',
    },
    {
      id: 2,
      text: "Super, je suis content que tout soit en ordre. N'hésitez pas si tu as d'autres besoins !",
      sender: 'me',
      time: '14:32',
    },
    {
      id: 3,
      text: 'Je vais te recommander à mes amis, ton service est vraiment top !',
      sender: 'other',
      time: '14:35',
    },
  ];

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedConversation) {
    return (
      <View style={styles.container}>
        <View style={styles.chatHeader}>
          <TouchableOpacity
            onPress={() => setSelectedConversation(null)}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <View style={styles.chatHeaderInfo}>
            <Avatar.Text
              size={40}
              label={selectedConversation.avatar}
              style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
            />
            <View style={styles.chatHeaderText}>
              <Text style={styles.chatHeaderName}>
                {selectedConversation.name}
              </Text>
              <Text style={styles.chatHeaderRole}>
                {selectedConversation.role}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.messagesContainer}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.sender === 'me'
                  ? styles.myMessage
                  : styles.otherMessage,
              ]}
            >
              {message.sender === 'other' && (
                <Avatar.Text
                  size={32}
                  label={selectedConversation.avatar}
                  style={[
                    styles.messageAvatar,
                    { backgroundColor: theme.colors.primary },
                  ]}
                />
              )}
              <Surface
                style={[
                  styles.messageBubble,
                  message.sender === 'me'
                    ? { backgroundColor: theme.colors.primary }
                    : { backgroundColor: '#F0F0F0' },
                ]}
                elevation={1}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.sender === 'me'
                      ? { color: 'white' }
                      : { color: '#212121' },
                  ]}
                >
                  {message.text}
                </Text>
              </Surface>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={[styles.title, { color: theme.colors.primary }]}>
          Messages
        </Title>
        <Text style={styles.subtitle}>Communiquez avec vos partenaires</Text>
      </View>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Rechercher une conversation..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.Searchbar}
          icon={() => <Search size={20} color="#757575" />}
        />
      </View>

      <ScrollView style={styles.conversationsList}>
        {filteredConversations.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            onPress={() => setSelectedConversation(conversation)}
          >
            <Surface style={styles.conversationCard} elevation={1}>
              <View style={styles.conversationContent}>
                <View style={styles.avatarContainer}>
                  <Avatar.Text
                    size={50}
                    label={conversation.avatar}
                    style={[
                      styles.avatar,
                      { backgroundColor: theme.colors.primary },
                    ]}
                  />
                  {conversation.online && (
                    <View style={styles.onlineIndicator} />
                  )}
                </View>

                <View style={styles.conversationInfo}>
                  <View style={styles.conversationHeader}>
                    <Text style={styles.conversationName}>
                      {conversation.name}
                    </Text>
                    <Text style={styles.conversationTime}>
                      {conversation.time}
                    </Text>
                  </View>
                  <Text style={styles.conversationRole}>
                    {conversation.role}
                  </Text>
                  <Text style={styles.lastMessage} numberOfLines={2}>
                    {conversation.lastMessage}
                  </Text>
                </View>

                {conversation.unread > 0 && (
                  <Badge
                    style={[
                      styles.unreadBadge,
                      { backgroundColor: theme.colors.primary },
                    ]}
                  >
                    {conversation.unread}
                  </Badge>
                )}
              </View>
            </Surface>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
  Searchbar: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  conversationsList: {
    flex: 1,
  },
  conversationCard: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  conversationContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    backgroundColor: '#00C896',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  conversationTime: {
    fontSize: 12,
    color: '#757575',
  },
  conversationRole: {
    fontSize: 12,
    color: '#00C896',
    fontWeight: '500',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 18,
  },
  unreadBadge: {
    marginLeft: 8,
  },
  // Chat styles
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 12,
  },
  chatHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chatHeaderText: {
    marginLeft: 12,
  },
  chatHeaderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  chatHeaderRole: {
    fontSize: 14,
    color: '#757575',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  myMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 18,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 18,
  },
});
