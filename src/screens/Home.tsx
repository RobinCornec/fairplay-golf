import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import {Text, Card, Title, Paragraph, IconButton, PaperProvider, Portal, Modal, Button} from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from '../styles';
import { i18n } from '../localization';
import { RootStackParamList } from '../types';
import { theme } from '../theme';
import { RulesModal } from '../components/RulesModal';

type HomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export function Home({ navigation }: HomeProps) {
  const [visible, setVisible] = useState(false);
  const [selectedGameType, setSelectedGameType] = useState<'6point'>('6point');

  const showRules = (gameType: '6point') => {
    setSelectedGameType(gameType);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={[styles.title, { marginTop: 20, marginBottom: 40 }]}>
        FairPlay
      </Text>

      <View style={localStyles.cardContainer}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('GameSetup')}
          activeOpacity={0.7}
          style={{ flex: 1 }}
        >
          <Card style={[styles.recapCard, { borderLeftWidth: 5, borderLeftColor: theme.colors.primary, marginBottom: 0 }]}>
            <Card.Content>
              <View style={localStyles.cardHeader}>
                <Text variant="titleLarge" style={{ color: theme.colors.primary, flex: 1 }}>{i18n.t('game6point')}</Text>
              </View>
              <Text variant="bodyMedium">{i18n.t('game6pointDescription')}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
        <IconButton
          icon="help-circle-outline"
          size={24}
          iconColor={theme.colors.primary}
          onPress={() => showRules('6point')}
          style={localStyles.helpIcon}
        />
      </View>

      <View style={[localStyles.cardContainer, { marginTop: 20 }]}>
        <View style={{ flex: 1 }}>
          <Card style={[styles.recapCard, localStyles.disabledCard]}>
            <Card.Content>
              <Text variant="titleLarge" style={localStyles.disabledText}>{i18n.t('comingSoon')}</Text>
              <Text variant="bodyMedium" style={localStyles.disabledText}>{i18n.t('newGamesSoon')}</Text>
            </Card.Content>
          </Card>
        </View>
      </View>

      <TouchableOpacity 
        onPress={() => navigation.navigate('History')}
        activeOpacity={0.7}
        style={{ marginTop: 20 }}
      >
        <Card style={styles.recapCard}>
          <Card.Content>
            <Text variant="titleLarge" >{i18n.t('history')}</Text>
            <Text variant="bodyMedium">{i18n.t('seeHistory')}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>

      <RulesModal visible={visible} onDismiss={hideModal} gameType={selectedGameType} />
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  helpIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 1,
  },
  disabledCard: {
    backgroundColor: '#f5f5f5',
    borderLeftWidth: 5,
    borderLeftColor: '#bdbdbd',
    elevation: 0,
    shadowOpacity: 0,
    opacity: 0.8,
    marginBottom: 0,
  },
  disabledText: {
    color: '#9e9e9e',
  },
});
