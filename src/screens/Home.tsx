import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph, IconButton } from 'react-native-paper';
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
        GWolf
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
                <Title style={{ color: theme.colors.primary, flex: 1 }}>{i18n.t('game_6point')}</Title>
              </View>
              <Paragraph>{i18n.t('game_6point_description')}</Paragraph>
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

      <TouchableOpacity 
        onPress={() => navigation.navigate('History')}
        activeOpacity={0.7}
        style={{ marginTop: 20 }}
      >
        <Card style={styles.recapCard}>
          <Card.Content>
            <Title>{i18n.t('history')}</Title>
            <Paragraph>{i18n.t('seeHistory')}</Paragraph>
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
});
